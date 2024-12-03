from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics, status
from .serializers import UserSerializer, NoteSerializer, CartSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Product, Cart, CartItem
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response


User = get_user_model()
# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': user.role
            })
        return Response({'error': 'Неверные учетные данные'}, status=400)

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

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