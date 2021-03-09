from django.shortcuts import render
from rest_framework import generics
from .serializers import RecipeSerialier
from . import models


class RecipesListView(generics.ListCreateAPIView):
    queryset = models.Recipe.objects.all()
    serializer_class = RecipeSerialier

    # def get_queryset(self):
    #     # import pbd; pbd.set_trace()
    #     #will let you stop your code here and debug
    #     user = self.request.user
    #     return  models.Recipe.objects.filter(author=user)

class RecipesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Recipe.objects.all()
    serializer_class = RecipeSerialier

    # def get_queryset(self):
    #     user = self.request.user
    #     return  models.Recipe.objects.filter(author=user)
