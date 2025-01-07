from django.urls import path

from wishlist.views import FavouriteListView, AddProductToFavouriteView, RemoveProductFromFavouriteView

urlpatterns = [
    path('', FavouriteListView.as_view(), name='wishlist'),
    path('add/', AddProductToFavouriteView.as_view(), name='add-product-to-favourite'),
    path('remove/', RemoveProductFromFavouriteView.as_view(), name='remove-product-from-favourite'),
]