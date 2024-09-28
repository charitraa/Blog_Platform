from django.urls import path, include
from .views import UserPhotoUpdateView, GithubOauthSignInView , UserUpdateView
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('photo/', UserPhotoUpdateView.as_view(), name='user-photo-update'),
    path('profile/update/', UserUpdateView.as_view(), name='user-update'),
    path('github/', GithubOauthSignInView.as_view(), name='github')  # if using JWT

]
