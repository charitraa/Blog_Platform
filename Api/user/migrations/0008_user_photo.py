# Generated by Django 5.1 on 2024-08-23 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_alter_user_date_of_birth'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='photo',
            field=models.ImageField(blank=True, default='user_photos/default.jpg', upload_to='user_photos/'),
        ),
    ]
