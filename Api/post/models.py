from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import uuid

class Post(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=200)  # Title of the blog post
    photo = models.ImageField(upload_to='user_post/', default='user_post/default.png', blank=True)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='author_post')
    content = models.TextField()  # Main content of the post
    created_at = models.DateTimeField(auto_now_add=True)  # Date and time when the post was created
    updated_at = models.DateTimeField(auto_now=True)  # Date and time when the post was last updated
    published_at = models.DateTimeField(default=timezone.now)  # Date and time when the post was published

    class Meta:
        ordering = ['-published_at']  # Orders posts by the most recent published date first

    def __str__(self):
        return self.title  # Returns the title as the string representation of the post

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('post_detail', args=[self.slug])  # Returns the URL for a specific post
