from rest_framework import serializers
from .models import FavouriteItem


class FavouriteItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteItem
        fields = ['id', 'favourite', 'product']
        read_only_fields = ['id']
