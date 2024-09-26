from django.urls import path
from .views import CommentListCreateView, CommentRetrieveUpdateDestroyView

urlpatterns = [
    # List and create comments for a specific post
    path('posts/<uuid:post_id>/comments/', CommentListCreateView.as_view(), name='post-comments'),
    
    # Retrieve, update, or delete a specific comment
    path('comments/<uuid:pk>/', CommentRetrieveUpdateDestroyView.as_view(), name='comment-detail'),
]
