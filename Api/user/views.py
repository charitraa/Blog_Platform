from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import UserPhotoUpdateSerializer , GithubLoginSerializer, UserUpdateSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

class UserPhotoUpdateView(generics.UpdateAPIView):
    serializer_class = UserPhotoUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
User = get_user_model()

class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()  
    serializer_class = UserUpdateSerializer  
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user

class GithubOauthSignInView(GenericAPIView):
    serializer_class = GithubLoginSerializer

    def post(self, request):
        print("Request Data: ", request.data)  # Debugging the request data
        
        if 'code' not in request.data:
            return Response({"error": "Code not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            return Response({"message": "User authenticated successfully", "user_data": data}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
