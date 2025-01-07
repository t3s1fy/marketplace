from django.urls import path

from cart.views import AddToCartView, UpdateCartItemQuantityView, RemoveFromCartView

urlpatterns = [
    path('add/', AddToCartView.as_view(), name='add-to-cart' ),
    path('item/<int:pk>/update/', UpdateCartItemQuantityView.as_view(), name='update-cart-item-quantity'),
    path('item/<int:pk>/remove/', RemoveFromCartView.as_view(), name='remove-from-cart'),
]