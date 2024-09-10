from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .github import Github
from .helper import register_social_user

User = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id','first_name','last_name','username','photo','date_of_birth','email', 'password','bio','district','city','password')

class UserPhotoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['photo']

from rest_framework import serializers

class GithubLoginSerializer(serializers.Serializer):
    code = serializers.CharField()

    def validate_code(self, code):
        print("Received Code: ", code)  # Debugging the received code
        
        access_token = Github.exchange_code_for_token(code)
        
        if not access_token:
            raise serializers.ValidationError("Invalid code or failed to get access token from GitHub.")
        
        print("Access Token: ", access_token)  # Debugging the access token
        
        user_data = Github.get_github_user(access_token)
        
        if not user_data:
            raise serializers.ValidationError("Failed to fetch user data from GitHub.")
        
        # Handle user data (name and email)
        full_name = user_data.get('name', '')
        email = user_data.get('email', '')
        names = full_name.split(" ")
        first_name = names[0] if len(names) > 0 else ''
        last_name = names[1] if len(names) > 1 else ''
        
        provider = 'github'
        
        # Register or get user
        return register_social_user(provider, email, first_name, last_name)
