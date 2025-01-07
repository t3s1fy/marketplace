from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegistrationStep1View, RegistrationStep2View, PasswordResetRequestView, PasswordResetConfirmView, \
    LoginView, ResendConfirmationCodeView, PasswordResetVerifyCodeView, IsValidToken, LogoutView, UserListView, \
    UserUpdateView
urlpatterns = [
    # Регистрация
    path('registration/', RegistrationStep1View.as_view(), name="registration"),
    path('registration-confirm/', RegistrationStep2View.as_view(), name="registration-confirm"),
    #Восстановление пароля
    path('password-reset/', PasswordResetRequestView.as_view(), name="password-reset"),
    path('password-confirm/', PasswordResetConfirmView.as_view(), name="password-confirm"),
    path('password-reset/verify-code/', PasswordResetVerifyCodeView.as_view(), name='password-reset-verify-code'),
    #Повторная отправка кода
    path('resend-confirmation-code/', ResendConfirmationCodeView.as_view(), name='resend-confirmation-code'),
    #Вход в аккаунт
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    #Токены
    path('token/', TokenObtainPairView.as_view(), name="get-token"),
    path('token/refresh', TokenRefreshView.as_view(), name="refresh"),
    path('token/is-valid/', IsValidToken.as_view(), name="is-valid"),
    path('list/', UserListView.as_view(), name='user-list'),
    path('update/<int:user_id>/', UserUpdateView.as_view(), name='user-update'),
]
