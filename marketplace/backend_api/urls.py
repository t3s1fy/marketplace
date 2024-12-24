from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegistrationStep1View, RegistrationStep2View, PasswordResetRequestView, PasswordResetConfirmView, \
    LoginView, CartView, AddToCartView, RemoveFromCartView, ResendConfirmationCodeView, PasswordResetVerifyCodeView, \
    CreateProductView, UpdateProductView, DeleteProductView, IsValidToken, LogoutView

urlpatterns = [
    # Регистрация
    path('user/registration', RegistrationStep1View.as_view(), name="registration"),
    path('user/registration-confirm', RegistrationStep2View.as_view(), name="registration-confirm"),
    #Восстановление пароля
    path('user/password-reset/', PasswordResetRequestView.as_view(), name="password-reset"),
    path('user/password-confirm/', PasswordResetConfirmView.as_view(), name="password-confirm"),
    path('user/password-reset/verify-code/', PasswordResetVerifyCodeView.as_view(), name='password-reset-verify-code'),
    #Повторная отправка кода
    path('user/resend-confirmation-code/', ResendConfirmationCodeView.as_view(), name='resend-confirmation-code'),
    #Вход в аккаунт
    path('user/login', LoginView.as_view(), name="login"),
    path('user/logout', LogoutView.as_view(), name="logout"),
    #Токены
    path('token/', TokenObtainPairView.as_view(), name="get-token"),
    path('token/refresh', TokenRefreshView.as_view(), name="refresh"),
    path('token/is-valid/', IsValidToken.as_view(), name="is-valid"),

    # Корзина
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/<int:product_id>/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/<int:item_id>/', RemoveFromCartView.as_view(), name='remove-from-cart'),

    #Админ панель
    #Товар
    path('admin/products/create/', CreateProductView.as_view(), name='create-product'),
    path('admin/products/edit/', UpdateProductView.as_view(), name='update-product'),
    path('admin/products/delete/', DeleteProductView.as_view(), name='delete-product'),
]
