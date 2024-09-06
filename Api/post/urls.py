from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.post_list, name='post_list'),  # List all posts or create a new post
    path('posts/<str:id>/', views.post_detail, name='post_detail'),  # Retrieve, update, or delete a post by ID
    path('posts/user/<int:user_id>/', views.posts_by_user, name='posts_by_user'),
    path('posts/count/<int:user_id>/', views.counts_post_by_user, name='posts_by_user'),
]
