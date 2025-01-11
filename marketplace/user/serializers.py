from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

#Пользователь
class UserSerializer(serializers.ModelSerializer):
    """Сериалайзер для модели пользователя."""

    class Meta:
        model = User
        fields = ["id", "email", "password", "role"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        """
        Создание пользователя с хэшированным паролем.

        Args:
            validated_data (dict): Данные, валидированные сериалайзером.

        Returns:
            User: Созданный пользователь.
        """
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data, is_active=False)
        user.set_password(password)
        user.save()
        return user


#Регистрация
class ConfirmRegistrationSerializer(serializers.Serializer):
    """Сериалайзер для подтверждения регистрации."""
    email = serializers.EmailField()
    confirmation_code = serializers.CharField(max_length=6)


#Восстановление пароля
class PasswordResetRequestSerializer(serializers.Serializer):
    """Сериалайзер для запроса сброса пароля."""
    email = serializers.EmailField(required=True)


class PasswordResetConfirmSerializer(serializers.Serializer):
    """Сериалайзер для подтверждения сброса пароля."""
    email = serializers.EmailField(required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)


class PasswordResetVerifyCodeSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    code = serializers.CharField(max_length=6)


#Вход
class LoginSerializer(serializers.Serializer):
    """Сериалайзер для входа пользователя."""
    email = serializers.EmailField()
    password = serializers.CharField()


class ResendConfirmationCodeSerializer(serializers.Serializer):
    """Сериалайзер для повторной отправки кода подтверждения."""
    email = serializers.EmailField()
    action_type = serializers.ChoiceField(choices=['register', 'reset_password'])


class TokenValidationSerializer(serializers.Serializer):
    """
    Сериалайзер для проверки валидности токена.
    """
    token = serializers.CharField(write_only=True)
    message = serializers.CharField(read_only=True)
