from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Post
from django.contrib.auth import get_user_model
from .serializers import PostSerializer, UserPostSerializer

# GET all posts and POST a new post
@api_view(['GET', 'POST'])
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = UserPostSerializer(posts, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# GET, PUT, DELETE a specific post by ID
@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET']) # Ensure the user is authenticated
def posts_by_user(request, user_id):
    try:
        # Get the user by their ID
        user = get_user_model().objects.get(id=user_id)
    except get_user_model().DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Get all posts by the user
    posts = Post.objects.filter(author=user)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def counts_post_by_user(request, user_id):
    try:
        # Get the user by their ID
        user = get_user_model().objects.get(id=user_id)
    except get_user_model().DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Get the count of posts by the user
    post_count = Post.objects.filter(author=user).count()

    return Response({'post_count': post_count}, status=status.HTTP_200_OK)