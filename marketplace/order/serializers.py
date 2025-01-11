from rest_framework import serializers
from .models import Order, PickupPoint, OrderItem


class PickupPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickupPoint
        fields = ['id', 'region', 'city', 'street', 'house']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'status', 'creation_date', 'creation_time',
            'delivery_cost', 'expected_delivery_date', 'pickup_point', 'items'
        ]
        read_only_fields = ['user', 'creation_date', 'creation_time', 'expected_delivery_date']