from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()  # Commenter's name or email
    post_author_id = serializers.SerializerMethodField()  # User ID of the post author
    
    class Meta:
        model = Comment
        fields = ['id', 'post', 'post_author_id', 'author', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'author', 'post_author_id']
    
    # Get the user ID of the post author
    def get_post_author_id(self, obj):
        return obj.post.author.id  # Access the post's author ID
