from django.contrib import admin
from .models import Product

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

