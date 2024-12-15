from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegistrationStep1View, RegistrationStep2View, PasswordResetRequestView, PasswordResetConfirmView, \
    LoginView, CartView, AddToCartView, RemoveFromCartView, ResendConfirmationCodeView, PasswordResetVerifyCodeView

urlpatterns = [
    # Пользовательские маршруты
    path('user/registration', RegistrationStep1View.as_view(), name="registration"),
    path('user/registration-confirm', RegistrationStep2View.as_view(), name="registration-confirm"),
    path('user/password-reset/', PasswordResetRequestView.as_view(), name="password-reset"),
    path('user/password-confirm/', PasswordResetConfirmView.as_view(), name="password-confirm"),
    path('user/resend-confirmation-code/', ResendConfirmationCodeView.as_view(), name='resend-confirmation-code'),
    path('user/password-reset/verify-code/', PasswordResetVerifyCodeView.as_view(), name='password-reset-verify-code'),
    path('user/login', LoginView.as_view(), name="login"),
    path('token/', TokenObtainPairView.as_view(), name="get-token"),
    path('token/refresh', TokenRefreshView.as_view(), name="refresh"),

    # Маршруты корзины
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/<int:product_id>/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/<int:item_id>/', RemoveFromCartView.as_view(), name='remove-from-cart'),
]
