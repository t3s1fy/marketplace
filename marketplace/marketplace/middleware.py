import logging
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

# Настраиваем логгер
logger = logging.getLogger(__name__)

User = get_user_model()

class JWTAuthFromCookies(BaseAuthentication):
    def authenticate(self, request):
        # Извлечение токена из cookies
        access_token = request.COOKIES.get('access')
        if not access_token:
            logger.info("No access token found in cookies")
            return None

        try:
            # Проверка валидности токена
            validated_token = AccessToken(access_token)
        except Exception as e:
            logger.warning(f"Invalid token: {str(e)}")
            raise AuthenticationFailed("Invalid or expired token")

        # Проверяем наличие user_id в payload токена
        user_id = validated_token.payload.get("user_id")
        if not user_id:
            logger.error("User ID not found in token payload")
            raise AuthenticationFailed("Invalid token payload: user_id is missing")

        try:
            # Извлечение пользователя из базы данных
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            logger.error(f"User with ID {user_id} not found in database")
            raise AuthenticationFailed("User not found in the database")

        # Проверяем, активен ли пользователь
        if not user.is_active:
            logger.warning(f"User {user.email} is deactivated")
            raise AuthenticationFailed("User account is deactivated")

        # Возвращаем пользователя и токен
        return user, validated_token
