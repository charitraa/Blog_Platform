# Generated by Django 5.1 on 2024-09-06 11:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_user_city_user_country_user_district_user_province'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='country',
        ),
    ]
