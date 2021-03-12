# Generated by Django 3.1.7 on 2021-03-11 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0011_auto_20210311_0052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='published',
            field=models.CharField(choices=[('Draft', 'Draft'), ('Public', 'Public'), ('Private', 'Private'), ('Popular', 'Popular')], default='Draft', max_length=15),
        ),
    ]
