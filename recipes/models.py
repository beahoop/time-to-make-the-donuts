from django.db import models
from django.conf import settings

# Create your models here.

class Recipe(models.Model):
    Draft = 'Draft'
    Public = 'Public'
    Private = 'Private'
    Popular = 'Popular'

    PHASES = [
        (Draft, 'Draft'),
        (Public, 'Public'),
        (Private, 'Private'),
        (Popular, 'Popular'),
    ]

    Breakfast = 'Breakfast'
    Lunch = 'Lunch'
    Dinner = 'Dinner'
    Dessert = 'Dessert'

    MEAL_TYPES = [
        (Breakfast, 'Breakfast'),
        (Lunch, 'Lunch'),
        (Dinner, 'Dinner'),
        (Dessert, 'Dessert'),
    ]
    F = 'Fahrenheit'
    C = 'Celsius'


    DEGREE = [
        (F, 'Fahrenheit'),
        (C, 'Celsius'),

    ]
    image = models.ImageField(upload_to='recipes/', null=True)
    title = models.CharField(max_length=150, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    published =  models.CharField(
        max_length=15,
        choices=PHASES,
        default= Draft,
    )
    type_meal= models.CharField(
        max_length=15,
        choices=MEAL_TYPES,
        default= Breakfast,
    )
    prep_time = models.FloatField(null=True)
    cook_time = models.FloatField(null=True)
    degree = models.CharField(
        max_length=15,
        choices=DEGREE,
        default= F,
    )
    cook_temp = models.FloatField(null=True)
    yields = models.FloatField(null=True)
    foodtype = models.CharField(max_length=150, null=True)
    ingredients = models.JSONField(encoder=None, decoder=None, null=True)
    directions = models.TextField(max_length=500, null=True)
    notes = models.TextField(max_length=500, null=True)
   	 #character field can only be 255 long

    def __str__(self):
        return self.title[:50]
