import jwt
from django.core.cache import cache
from django.core.mail import send_mail
from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics, status
from rest_framework.decorators import authentication_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authentication import get_authorization_header
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from marketplace import settings
from marketplace.settings import DEFAULT_FROM_EMAIL
from marketplace.middleware import JWTAuthFromCookies
from .serializers import (
    UserSerializer,
    ConfirmRegistrationSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    LoginSerializer, ResendConfirmationCodeSerializer, PasswordResetVerifyCodeSerializer,
    TokenValidationSerializer
)
from .models import ConfirmationCode
import random
from marketplace.permissions import IsSuperAdmin

User = get_user_model()

#Аутентификация и регистрация
def generate_confirmation_code():
    """
    Генерирует 6-значный код

    Returns:
        str: Возвращает код в виде строки
    """
    return f"{random.randint(100000, 999999)}"

def send_confirmation_email(email, code, purpose):
    """
    Отправляет код подтверждения на почту

    Args:
        email (str): Почтовый адрес пользователя
        code (str): Код подтверждения
        purpose (str): Причина отправки письма

    Returns:
        None
    """
    subject = "Подтверждение регистрации" if purpose == 'register' else "Восстановление пароля"
    message = f"Ваш код подтверждения: {code}"
    send_mail(subject, message, DEFAULT_FROM_EMAIL, [email])


class RegistrationStep1View(generics.CreateAPIView):
    """
    Первый шаг регистрации пользователя

    Отправляет код на указанную почту после создания неактивного пользователя
    """
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request):
        """
        Процесс 1 этапа регистрации

        Args:
            request: http-запрос с данными пользователя

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        code = generate_confirmation_code()
        ConfirmationCode.objects.update_or_create(user=user, defaults={"code": code})
        send_confirmation_email(user.email, code, 'register')
        return Response({"detail": "Код подтверждения отправлен на почту."}, status=status.HTTP_201_CREATED)


class RegistrationStep2View(generics.CreateAPIView):
    """
    2 шаг регистрации пользователя

    Подтверждает адрес электронной почты, используя предоставленный код
    """
    permission_classes = [AllowAny]
    serializer_class = ConfirmRegistrationSerializer

    def post(self, request):
        """
        Процесс 2 этапа регистрации

        Args:
            request: http-запрос с почтой и кодом подтверждения пользователя.

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        code = serializer.validated_data['confirmation_code']

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)

        confirmation = ConfirmationCode.objects.filter(user=user).first()
        if not confirmation or confirmation.code != code:
            return Response({"detail": "Неверный код подтверждения."}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.save()
        confirmation.delete()
        return Response({"detail": "Регистрация успешно подтверждена."}, status=status.HTTP_200_OK)


class ResendConfirmationCodeView(generics.GenericAPIView):
    """
    Переотправка кода подтверждения

    Устанавливает период отправки кода и различает регистрацию и восстановление пароля
    """
    permission_classes = [AllowAny]
    serializer_class = ResendConfirmationCodeSerializer

    def post(self, request):
        """
        Процесс отправки кода

        Args:
            request: http-запрос с почтой пользователя и типом операции (регистрация или восстановление пароля)

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        action_type = serializer.validated_data['action_type']

        if action_type not in ['register', 'reset_password']:
            return Response({"detail": "Неверный тип действия."}, status=status.HTTP_400_BAD_REQUEST)

        if cache.get(f"resend_{email}"):
            return Response({"detail": "Запросить новый код можно через 3 минуты."},
                            status=status.HTTP_429_TOO_MANY_REQUESTS)

        user = User.objects.filter(email=email,
                                   is_active=False).first() if action_type == 'register' else User.objects.filter(
            email=email).first()

        if not user:
            return Response({"detail": "Пользователь не найден или уже активирован."},
                            status=status.HTTP_400_BAD_REQUEST)

        code = generate_confirmation_code()
        ConfirmationCode.objects.update_or_create(user=user, defaults={"code": code})

        if action_type == 'register':
            send_confirmation_email(user.email, code, 'register')
        elif action_type == 'reset_password':
            send_confirmation_email(user.email, code, 'reset_password')

        cache.set(f"resend_{email}", True, timeout=180)
        return Response({"detail": "Новый код подтверждения отправлен."}, status=status.HTTP_200_OK)


class LoginView(generics.GenericAPIView):
    """
    Авторизация пользователя. Устанавливает токены в cookies.
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        # Аутентификация
        user = authenticate(email=email, password=password)
        if not user:
            return Response({"detail": "Неверные учетные данные."}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({"detail": "Учетная запись деактивирована."}, status=status.HTTP_403_FORBIDDEN)

        # Создание токенов
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Формирование ответа
        response = Response({"message": "Вы успешно авторизованы."}, status=status.HTTP_200_OK)

        # Устанавливаем токены в cookies
        response.set_cookie(
            key="access",
            value=access_token,
            httponly=True,
            samesite="Lax",
        )
        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            samesite="Lax",
        )

        return response


class LogoutView(APIView):
    """
    Выход из профиля. Удаляет токены из cookies.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Формируем ответ
        response = Response({"message": "Вы успешно вышли из профиля."}, status=status.HTTP_200_OK)

        # Удаляем токены из cookies
        response.delete_cookie("access", path="/")
        response.delete_cookie("refresh", path="/")

        return response


class PasswordResetRequestView(generics.CreateAPIView):
    """
    Инициация сброса пароля

    Отправляет код подтверждения на почту пользователя
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        """
        Процесс сброса пароля

        Args:
            request: http-запрос с почтой

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        if cache.get(email):
            return Response({"detail": "Вы сможете запросить новый код через 3 минуты."}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)

        code = generate_confirmation_code()
        ConfirmationCode.objects.update_or_create(user=user, defaults={"code": code})
        send_confirmation_email(email, code, 'reset')
        cache.set(email, True, timeout=180)
        return Response({"detail": "Код для сброса пароля отправлен."}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(generics.CreateAPIView):
    """
    Смена пароля пользователем

    Меняет пароль пользователя, после подтверждения почты
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request):
        """
        Процесс смены пароля

        Args:
            request: http-запрос с почтой и новым паролем

        Returns:
            Response: результат операции
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        new_password = serializer.validated_data['new_password']

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Пароль успешно изменен."}, status=status.HTTP_200_OK)


class PasswordResetVerifyCodeView(generics.CreateAPIView):
    """
    Проверка кода подтверждения для сброса пароля.

    Принимает email и код подтверждения, затем продолжает процесс сброса пароля.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetVerifyCodeSerializer

    def post(self, request):
        """
        Процесс проверки кода подтверждения.

        Args:
            request: http-запрос с email и кодом подтверждения

        Returns:
            Response: результат операции
        """
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            code = serializer.validated_data['code']

            user = User.objects.filter(email=email).first()
            if not user:
                return Response({"detail": "Пользователь с таким email не найден."}, status=status.HTTP_400_BAD_REQUEST)

            confirmation_code = ConfirmationCode.objects.filter(code=code, user=user).first()
            if not confirmation_code:
                return Response({"detail": "Неверный код подтверждения."}, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "detail": "Код подтверждения верный. Пожалуйста, введите новый пароль.",
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Токен
class IsValidToken(generics.GenericAPIView):
    """
    Проверяет валидность JWT-токена.
    """
    serializer_class = TokenValidationSerializer

    def get(self, request, *args, **kwargs):
        auth_header = get_authorization_header(request).split()
        if len(auth_header) != 2:
            raise AuthenticationFailed('Authorization header is expected to be "Bearer <token>"')

        token = auth_header[1].decode('utf-8')

        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')

        # Формируем ответ с использованием сериалайзера
        serializer = self.get_serializer(data={"token": token, "message": "Token is valid"})
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


#Пользователь
@authentication_classes([JWTAuthFromCookies])
class UserListView(generics.ListAPIView):
    permission_classes = [IsSuperAdmin]
    queryset = User.objects.all()
    serializer_class = UserSerializer


@authentication_classes([JWTAuthFromCookies])
class UserUpdateView(generics.UpdateAPIView):
    permission_classes = [IsSuperAdmin]
    queryset = User.objects.all()
    serializer_class = UserSerializer
