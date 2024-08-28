from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_at')  # Fields to display in the list view
    list_filter = ('created_at', 'published_at', 'author')  # Filters in the sidebar
    search_fields = ('title', 'content') 
    raw_id_fields = ('author',)  # Display a search widget for the author field
    date_hierarchy = 'published_at'  # Adds a date-based drilldown navigation by published date

admin.site.register(Post, PostAdmin)
