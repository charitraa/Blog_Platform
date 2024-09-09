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

class GithubLoginSerializer(serializers.Serializer):
    code = serializers.CharField()

    def validate_code(self, code):   
        access_token = Github.exchange_code_for_token(code)

        if access_token:
            user_data=Github.get_github_user(access_token)

            full_name=user_data['name']
            email=user_data['email']
            names=full_name.split(" ")
            firstName=names[1]
            lastName=names[0]
            provider='github'
            return register_social_user(provider, email, firstName, lastName)