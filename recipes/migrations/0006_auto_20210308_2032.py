# Generated by Django 3.1.7 on 2021-03-08 20:32

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipes', '0005_auto_20210308_2022'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Recipes',
            new_name='Recipe',
        ),
    ]
