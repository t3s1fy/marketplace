from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from backend_api.middleware import JWTAuthFromCookies

swagger_view = get_schema_view(
    openapi.Info(
        title="Marketplace API",
        default_version= 'v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    authentication_classes=[JWTAuthFromCookies],
)
urlpatterns = [
    path('api/', include('backend_api.urls')),
    path('api-auth/', include("rest_framework.urls")),
    path('swagger/', swagger_view.with_ui('swagger')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
