from django.core.cache import cache
from django.core.mail import send_mail
from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from marketplace.settings import DEFAULT_FROM_EMAIL
from .serializers import (
    UserSerializer,
    ConfirmRegistrationSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    LoginSerializer, CartSerializer, ResendConfirmationCodeSerializer, PasswordResetVerifyCodeSerializer
)
from .models import ConfirmationCode, Product, Cart, CartItem
import random


User = get_user_model()


def generate_confirmation_code():
    """
    Генерирует 6-значный код

    Returns:
        str: Возвращает код в виде строки
    """
    return f"{random.randint(100000, 999999)}"

def send_confirmation_email(email, code, purpose):
    """
    Отправляет код подтверждения на почту

    Args:
        email (str): Почтовый адрес пользователя
        code (str): Код подтверждения
        purpose (str): Причина отправки письма

    Returns:
        None
    """
    subject = "Подтверждение регистрации" if purpose == 'register' else "Восстановление пароля"
    message = f"Ваш код подтверждения: {code}"
    send_mail(subject, message, DEFAULT_FROM_EMAIL, [email])


class RegistrationStep1View(generics.CreateAPIView):
    """
    Первый шаг регистрации пользователя

    Отправляет код на указанную почту после создания неактивного пользователя
    """
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request):
        """
        Процесс 1 этапа регистрации

        Args:
            request: http-запрос с данными пользователя

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        code = generate_confirmation_code()
        ConfirmationCode.objects.update_or_create(user=user, defaults={"code": code})
        send_confirmation_email(user.email, code, 'register')
        return Response({"detail": "Код подтверждения отправлен на почту."}, status=status.HTTP_201_CREATED)


class RegistrationStep2View(generics.CreateAPIView):
    """
    2 шаг регистрации пользователя

    Подтверждает адрес электронной почты, используя предоставленный код
    """
    permission_classes = [AllowAny]
    serializer_class = ConfirmRegistrationSerializer

    def post(self, request):
        """
        Процесс 2 этапа регистрации

        Args:
            request: http-запрос с почтой и кодом подтверждения пользователя.

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        code = serializer.validated_data['confirmation_code']

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)

        confirmation = ConfirmationCode.objects.filter(user=user).first()
        if not confirmation or confirmation.code != code:
            return Response({"detail": "Неверный код подтверждения."}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.save()
        confirmation.delete()
        return Response({"detail": "Регистрация успешно подтверждена."}, status=status.HTTP_200_OK)


class ResendConfirmationCodeView(generics.GenericAPIView):
    """
    Переотправка кода подтверждения

    Устанавливает период отправки кода и различает регистрацию и восстановление пароля
    """
    permission_classes = [AllowAny]
    serializer_class = ResendConfirmationCodeSerializer

    def post(self, request):
        """
        Процесс отправки кода

        Args:
            request: http-запрос с почтой пользователя и типом операции (регистрация или восстановление пароля)

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        action_type = serializer.validated_data['action_type']

        if action_type not in ['register', 'reset_password']:
            return Response({"detail": "Неверный тип действия."}, status=status.HTTP_400_BAD_REQUEST)

        if cache.get(f"resend_{email}"):
            return Response({"detail": "Запросить новый код можно через 3 минуты."},
                            status=status.HTTP_429_TOO_MANY_REQUESTS)

        user = User.objects.filter(email=email,
                                   is_active=False).first() if action_type == 'register' else User.objects.filter(
            email=email).first()

        if not user:
            return Response({"detail": "Пользователь не найден или уже активирован."},
                            status=status.HTTP_400_BAD_REQUEST)

        code = generate_confirmation_code()
        ConfirmationCode.objects.update_or_create(user=user, defaults={"code": code})

        if action_type == 'register':
            send_confirmation_email(user.email, code, 'register')
        elif action_type == 'reset_password':
            send_confirmation_email(user.email, code, 'reset_password')

        cache.set(f"resend_{email}", True, timeout=180)
        return Response({"detail": "Новый код подтверждения отправлен."}, status=status.HTTP_200_OK)


class LoginView(generics.CreateAPIView):
    """
    Авторизация пользователя

    Проверяет подлинность пользователя, при успешном входе возвращает JWT токены
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        """
        Процесс авторизации

        Args:
            request: http-запрос с почтой и паролем

        Returns:
            Response: ответ с токенами JWT или сообщением об ошибке
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = authenticate(email=email, password=password)
        if not user:
            return Response({"detail": "Неверные учетные данные."}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)


class PasswordResetRequestView(generics.CreateAPIView):
    """
    Инициация сброса пароля

    Отправляет код подтверждения на почту пользователя
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        """
        Процесс сброса пароля

        Args:
            request: http-запрос с почтой

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        if cache.get(email):
            return Response({"detail": "Вы сможете запросить новый код через 3 минуты."}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)

        code = generate_confirmation_code()
        ConfirmationCode.objects.update_or_create(user=user, defaults={"code": code})
        send_confirmation_email(email, code, 'reset')
        cache.set(email, True, timeout=180)
        return Response({"detail": "Код для сброса пароля отправлен."}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(generics.CreateAPIView):
    """
    Смена пароля пользователем

    Меняет пароль пользователя, после подтверждения почты
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request):
        """
        Процесс смены пароля

        Args:
            request: http-запрос с почтой и новым паролем

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        new_password = serializer.validated_data['new_password']

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Пароль успешно изменен."}, status=status.HTTP_200_OK)


class PasswordResetVerifyCodeView(generics.CreateAPIView):
    """
    Проверка кода подтверждения для сброса пароля.

    Принимает код подтверждения и продолжает процесс сброса пароля.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetVerifyCodeSerializer

    def post(self, request):
        """
        Процесс проверки кода подтверждения.

        Args:
            request: http-запрос с кодом подтверждения

        Returns:
            Response: результат операции
        """
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            code = serializer.validated_data['code']

            confirmation_code = ConfirmationCode.objects.filter(code=code).first()
            if not confirmation_code:
                return Response({"detail": "Неверный код подтверждения."}, status=status.HTTP_400_BAD_REQUEST)

            user = confirmation_code.user
            return Response({
                "detail": "Код подтверждения верный. Пожалуйста, введите новый пароль.",
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteProductView(generics.CreateAPIView):
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


class CartView(generics.CreateAPIView):
    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class AddToCartView(generics.CreateAPIView):
    def post(self, request, product_id):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity += 1
        cart_item.save()
        return Response({'message': 'Product added to cart'}, status=status.HTTP_200_OK)


class RemoveFromCartView(generics.CreateAPIView):
    def delete(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        cart_item.delete()
        return Response({'message': 'Product removed from cart'}, status=status.HTTP_200_OK)