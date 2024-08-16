from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'published_at')  # Fields to display in the list view
    list_filter = ('status', 'created_at', 'published_at', 'author')  # Filters in the sidebar
    search_fields = ('title', 'content')  # Searchable fields
    prepopulated_fields = {'slug': ('title',)}  # Automatically populate the slug field from the title
    raw_id_fields = ('author',)  # Display a search widget for the author field
    date_hierarchy = 'published_at'  # Adds a date-based drilldown navigation by published date
    ordering = ('status', 'published_at')  # Default ordering of the posts in the admin

admin.site.register(Post, PostAdmin)
