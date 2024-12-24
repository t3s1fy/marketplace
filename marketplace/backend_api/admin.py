from django.contrib import admin
from .models import Product, Cart, CartItem, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'product_count')
    search_fields = ('name',)
    ordering = ('-id',)

    def product_count(self, obj):
        return obj.products.count()

    product_count.short_description = "Количество продуктов"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'is_available', 'seller', 'photo_preview')
    list_filter = ('is_available',)
    search_fields = ('name', 'seller__email')
    ordering = ('-id',)

    def photo_preview(self, obj):
        if obj.photo:
            return f'<img src="{obj.photo.url}" style="width: 50px; height: 50px;" />'
        return "Нет фото"

    photo_preview.allow_tags = True
    photo_preview.short_description = "Фото"


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at', 'updated_at']


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity']

