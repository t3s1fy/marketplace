from rest_framework import serializers

from product.models import Category, Product, SubCategory


class CategorySerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Category.
    """
    class Meta:
        model = Category
        fields = ['id', 'name']


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'category', 'name']


class ProductSerializer(serializers.ModelSerializer):
    """Сериалайзер для модели товара."""

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'quantity', 'discount',
            'width', 'height', 'weight', 'characteristic', 'brand',
            'country_of_origin', 'photo', 'seller', 'subcategory',
        ]
        read_only_fields = ['id', 'seller']

    def create(self, validated_data):
        """
        Создание нового товара.

        Args:
            validated_data (dict): Данные, валидированные сериалайзером.

        Returns:
            Product: Созданный товар.
        """
        user = self.context['request'].user
        if user.role != 'seller' and not user.is_superuser:
            raise serializers.ValidationError("Недостаточно прав для создания товара.")
        validated_data['seller'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Обновление товара.

        Args:
            instance (Product): Существующий товар.
            validated_data (dict): Новые данные.

        Returns:
            Product: Обновленный товар.
        """
        user = self.context['request'].user
        if not instance.can_be_edited_by(user):
            raise serializers.ValidationError("Недостаточно прав для редактирования товара.")
        return super().update(instance, validated_data)
