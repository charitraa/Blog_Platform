from django.urls import path, include
from .views import UserPhotoUpdateView
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('photo/', UserPhotoUpdateView.as_view(), name='user-photo-update'),  # if using JWT

]
