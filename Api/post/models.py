from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    title = models.CharField(max_length=200)  # Title of the blog post
    slug = models.SlugField(max_length=200, unique=True)  # URL-friendly version of the title
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='author_post')  # Author of the post
    content = models.TextField()  # Main content of the post
    created_at = models.DateTimeField(auto_now_add=True)  # Date and time when the post was created
    updated_at = models.DateTimeField(auto_now=True)  # Date and time when the post was last updated
    published_at = models.DateTimeField(default=timezone.now)  # Date and time when the post was published
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')  # Status of the post

    class Meta:
        ordering = ['-published_at']  # Orders posts by the most recent published date first

    def __str__(self):
        return self.title  # Returns the title as the string representation of the post

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('post_detail', args=[self.slug])  # Returns the URL for a specific post
