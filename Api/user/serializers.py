from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id','first_name','last_name','username','photo','date_of_birth','email', 'password','bio','district','city','password')

class UserPhotoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['photo']