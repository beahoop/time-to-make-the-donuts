# Generated by Django 3.1.7 on 2021-03-08 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_auto_20210308_2006'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipes',
            name='directions',
            field=models.TextField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='recipes',
            name='notes',
            field=models.TextField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='recipes',
            name='degree',
            field=models.CharField(choices=[('Fahrenheit', 'Fahrenheit'), ('Celsius', 'Celsius')], default='Fahrenheit', max_length=15),
        ),
    ]