# Generated by Django 5.1 on 2024-08-23 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='photo',
            field=models.ImageField(blank=True, default='user_post/default.jpg', upload_to='user_post/'),
        ),
    ]