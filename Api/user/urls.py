from django.urls import path, include

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),  # if using JWT
    path('accounts/', include('allauth.urls')),

]
