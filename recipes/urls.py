from django.urls import path
from . import views

app_name = 'recipes'
urlpatterns = [
    path('', views.RecipesListView.as_view()),
    path('edit/<int:pk>', views.RecipesDetailView.as_view()),
]
