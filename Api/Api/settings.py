"""
Django settings for api project.

Generated by 'django-admin startproject' using Django 5.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from datetime import timedelta
from pathlib import Path
import os
import pymysql

# Install pymysql as MySQLdb, enabling Django to use pymysql as a MySQL database connector.
pymysql.install_as_MySQLdb()

# Define the base directory of the project, which is useful for building paths within the project.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-$qo6673z)llx!16*q6fbvynw3!f^_z)edv(*#8p6^qe=tj5c=@'

# DEBUG mode should be set to False in production to avoid exposing sensitive information.
DEBUG = True

# ALLOWED_HOSTS defines a whitelist of hostnames that the Django site can serve.
ALLOWED_HOSTS = ['127.0.0.1']

# Application definition
# INSTALLED_APPS lists all the Django and third-party apps that are enabled in the project.
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'user',
    'post',
    'rest_framework',
    'djoser',
    'allauth',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.github',
    'allauth.socialaccount.providers.facebook',   
    'corsheaders',
]

# MIDDLEWARE is a list of middleware components that are executed in order during request and response processing.
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware'
]

# ROOT_URLCONF specifies the Python module where the root URL patterns are defined.
ROOT_URLCONF = 'api.urls'

# WSGI_APPLICATION is the WSGI application callable for the project, used for serving the Django application.
WSGI_APPLICATION = 'api.wsgi.application'

# TEMPLATES is a list of template engines to use, along with their configurations.
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.request'
            ],
        },
    },
]

# Database configuration using MySQL.
# DATABASES defines the settings for database connections.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'blog',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# AUTH_USER_MODEL specifies a custom user model for authentication.
AUTH_USER_MODEL = 'user.User'

# Password validation settings to enforce security standards for user passwords.
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    { 
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# REST framework settings, including JWT authentication.
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# Simple JWT settings for customizing JWT authentication.
SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT',),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "UPDATE_LAST_LOGIN": False,
}   

# Djoser settings for handling user authentication and account management via REST API.
DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': False,
    'USER_EMAIL_FIELD': 'email',
    'ACTIVATION_URL': 'auth/activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION':True,
    'PASSWORD_RESET_CONFIRM_URL': 'auth/reset/confirm/{uid}/{token}',
    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': True,
    'TOKEN_MODEL': None,
    'SERIALIZERS': {
        'user_create': 'user.serializers.UserCreateSerializer',
        'user': 'user.serializers.UserCreateSerializer',
        'current_user': 'user.serializers.UserCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
    },
}

# Internationalization settings for language and time zone.
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Configuration for static files (e.g., CSS, JavaScript, images).
STATIC_URL = '/static/'

# Configuration for media files (e.g., user uploads).
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type for models.
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Email backend configuration for sending emails via SMTP.
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'charitra.shrestha@patancollege.edu.np'
EMAIL_HOST_PASSWORD = 'iucfhsoqoaztwwiu'
DEFAULT_FROM_EMAIL = 'charitra.shrestha@patancollege.edu.np'


# SITE_ID is required for the sites framework, which supports associating content with a particular site.
SITE_ID = 1


# Authentication backends for user authentication, including social authentication via GitHub and Facebook.
AUTHENTICATION_BACKENDS = (
    'social_core.backends.github.GithubOAuth2',  # GitHub OAuth2 authentication
    'social_core.backends.facebook.FacebookOAuth2',  # Facebook OAuth2 authentication
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

# Configuration for social account providers like GitHub and Facebook.
SOCIAL_ACCOUNT_PROVIDERS = {
    'github': {
        'SCOPE': [
            'user',
            'repo',
            'read:org',
        ],
    },
    'facebook': {
        'METHOD': 'oauth2', 
        'SCOPE': ['email', 'public_profile'],
        'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
        'INIT_PARAMS': {'cookie': True},
        'FIELDS': [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'name',
            'name_format',
            'picture',
            'short_name'
        ],
        'EXCHANGE_TOKEN': True,
        'VERIFIED_EMAIL': False,
        'VERSION': 'v13.0',
    }
}

# OAuth2 credentials for GitHub authentication.
SOCIAL_AUTH_GITHUB_KEY = 'Ov23li25dFk4MVOWg3e6'
SOCIAL_AUTH_GITHUB_SECRET = '2f1513e17d26cdb28c18c273c54778e46e171e03'

# LOGIN_REDIRECT_URL specifies the URL to redirect to after a successful login.
LOGIN_REDIRECT_URL = 'http://localhost:5173/home'

# CORS settings to allow all origins, enabling cross-origin requests.
CORS_ALLOW_ALL_ORIGINS = True
