import random
from django.core.cache import cache
from django.shortcuts import render, get_object_or_404
from django.core.mail import send_mail
from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics, status
from marketplace.settings import EMAIL_HOST, DEFAULT_FROM_EMAIL
from .serializers import UserSerializer, CartSerializer, ConfirmRegistrationSerializer, PasswordResetConfirmSerializer, \
    PasswordResetRequestSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product, Cart, CartItem, ConfirmationCode
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response


User = get_user_model()


def generate_confirmation_code():
    return f"{random.randint(100000, 999999)}"


def send_confirmation_email(user, purpose):
    code = generate_confirmation_code()
    if not code:
        raise ValueError("Generated code is empty")
    code_obj, created = ConfirmationCode.objects.get_or_create(user=user)
    code_obj.code = code
    code_obj.save()
    subject = "Подтверждение регистрации" if purpose == 'register' else "Восстановление пароля"
    message = f"Ваш код подтверждения: {code_obj.code}"
    send_mail(subject, message, DEFAULT_FROM_EMAIL, [user.email])


class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        send_confirmation_email(user, 'register')
        return Response({"detail": "Пользователь зарегистрирован. Код подтверждения отправлен."}, status=status.HTTP_201_CREATED)


class ConfirmRegistrationView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ConfirmRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        code = serializer.validated_data['confirmation_code']
        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)
        confirmation_code = ConfirmationCode.objects.filter(user=user).first()
        if not confirmation_code or confirmation_code.code != code:
            return Response({"detail": "Неверный код подтверждения."}, status=status.HTTP_400_BAD_REQUEST)
        if not confirmation_code.is_valid():
            return Response({"detail": "Код подтверждения устарел."}, status=status.HTTP_400_BAD_REQUEST)
        user.is_active = True
        user.save()
        confirmation_code.delete()
        return Response({"detail": "Регистрация успешно подтверждена!"}, status=status.HTTP_200_OK)


class PasswordResetRequestView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        if cache.get(email):
            return Response({"error": "Вы сможете запросить код через 5 минут"}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        try:
            user = User.objects.get(email=email)
            code = generate_confirmation_code()
            ConfirmationCode.objects.update_or_create(user=user, defaults={"code": code})
            send_mail(
                "Сброс пароля",
                f"Ваш код подтверждения: {code}",
                DEFAULT_FROM_EMAIL,
                [email],
            )
            cache.set(email, True, timeout=300)
            return Response({"message": "Код подтверждения отправлен на почту"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Пользователь с таким email не существует"}, status=status.HTTP_404_NOT_FOUND)


class PasswordResetConfirmView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        code = serializer.validated_data['code']
        new_password = serializer.validated_data['new_password']

        try:
            user = User.objects.get(email=email)
            confirmation_code = user.confirmation_code
            if confirmation_code.code == code and confirmation_code.is_valid():
                user.set_password(new_password)
                user.save()
                confirmation_code.delete()
                return Response({"message": "Пароль успешно изменен."}, status=200)
            return Response({"error": "Код недействителен или устарел."}, status=400)
        except User.DoesNotExist:
            return Response({"error": "Пользователь не найден."}, status=404)


class LoginView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': user.role
            })
        return Response({'error': 'Неверные учетные данные'}, status=400)


class DeleteProductView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            if not product.can_be_deleted_by(request.user):
                return Response({"error": "Недостаточно прав для удаления товара."}, status=403)
            product.delete()
            return Response({"success": "Товар успешно удален."})
        except Product.DoesNotExist:
            return Response({"error": "Товар не найден."}, status=404)


class CartView(APIView):
    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class AddToCartView(APIView):
    def post(self, request, product_id):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity += 1
        cart_item.save()
        return Response({'message': 'Product added to cart'}, status=status.HTTP_200_OK)


class RemoveFromCartView(APIView):
    def delete(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        cart_item.delete()
        return Response({'message': 'Product removed from cart'}, status=status.HTTP_200_OK)