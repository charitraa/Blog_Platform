# Generated by Django 5.1 on 2024-08-28 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_remove_post_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='slug',
        ),
    ]
