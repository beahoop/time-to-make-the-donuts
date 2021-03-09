from rest_framework import serializers
from .models import Recipe

class RecipeSerialier(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Recipe
        fields = '__all__'
