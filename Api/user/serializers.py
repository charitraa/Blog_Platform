from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .github import Github
from .helper import register_social_user

User = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'photo', 'date_of_birth', 'email', 'password', 'bio', 'district', 'city')
    
class UserPhotoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['photo']

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'username', 'date_of_birth', 'bio', 'district', 'city']
    def update(self, instance, validated_data):
        # Prevent email from being updated to something already in use
        if 'email' in validated_data and User.objects.filter(email=validated_data['email']).exclude(id=instance.id).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})   
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.district = validated_data.get('district', instance.district)
        instance.city = validated_data.get('city', instance.city)
        
        instance.save()
        return instance

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
