# serializers.py
from rest_framework import serializers
from .models import Post
from user.serializers import UserCreateSerializer  # Adjust the import path as needed

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class UserPostSerializer(serializers.ModelSerializer):
    author = UserCreateSerializer()  # Nest UserSerializer for the 'author' field

    class Meta:
        model = Post
        fields = '__all__'
