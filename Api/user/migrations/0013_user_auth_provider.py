# Generated by Django 5.1 on 2024-09-09 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0012_remove_user_province'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='auth_provider',
            field=models.CharField(blank=True, default='email', max_length=50),
        ),
    ]