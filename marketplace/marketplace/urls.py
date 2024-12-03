from django.contrib import admin
from django.urls import path, include
from backend_api.views import CreateUserView, CartView, AddToCartView, RemoveFromCartView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from backend_api.views import LoginView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/registration', CreateUserView.as_view(), name="registration"),
    path('api/user/login', LoginView.as_view(), name="login"),
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="refresh"),
    path('api-auth/', include("rest_framework.urls")),
    path('api/', include('backend_api.urls')),
    path('api/cart/', CartView.as_view(), name='cart'),
    path('api/cart/add/<int:product_id>/', AddToCartView.as_view(), name='add_to_cart'),
    path('api/cart/remove/<int:item_id>/', RemoveFromCartView.as_view(), name='remove_from_cart'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
