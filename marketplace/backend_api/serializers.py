from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Product, CartItem, Cart, ConfirmationCode

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password", "role"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data, is_active=False)
        user.set_password(password)
        user.save()
        return user


class ConfirmRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    confirmation_code = serializers.CharField(max_length=6)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    code = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'is_available', 'photo', 'seller']

    def create(self, validated_data):
        user = self.context['request'].user
        if user.role not in ['admin', 'seller']:
            raise serializers.ValidationError("Недостаточно прав для создания товара.")
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if not instance.can_be_edited_by(user):
            raise serializers.ValidationError("Недостаточно прав для редактирования товара.")
        return super().update(instance, validated_data)


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'quantity', 'total_price']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price']