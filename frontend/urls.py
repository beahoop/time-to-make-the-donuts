from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index')
]

# I WROTE THIS CODE
