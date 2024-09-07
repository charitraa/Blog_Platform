from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import UserPhotoUpdateSerializer

class UserPhotoUpdateView(generics.UpdateAPIView):
    serializer_class = UserPhotoUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
