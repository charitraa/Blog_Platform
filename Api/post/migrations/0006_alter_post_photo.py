# Generated by Django 5.1 on 2024-09-08 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0005_remove_post_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='photo',
            field=models.ImageField(blank=True, default='user_post/default.png', upload_to='user_post/'),
        ),
    ]