from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse

from .models import Recipe
from .serializers import RecipeSerialier

# User = get_user_model()

class RecipeTests(TestCase):
    def setUp(self):
        user = get_user_model().objects.create(
            username = "sarah",
            email = "sarah@example.com",
            password = "safepass1"
        )

        # self.recipe = Recipe.objects.create(
        # whatever is in your model needs to be here
            # image =
            # title = "A brand new recipe"
            # author = user,
            # published = "DFT",
            # type_meal= "LNH",
            # prep_time = 30,
            # cook_time = 45,
            # degree =  F,
            # cook_temp = 350,
            # yields = 12
            # foodtype = "Bread",
            # ingredients = [{"qty:4"}]
            # directions = "DO DIRECTIONS"
            # notes = "this are notes"

        # )

    # def test_recipe_content(self):
    #     recipe = Recipe.objects.get(id=1)
    #     #here you only need what you want to test
    #     self.assertEqual(f"{recipe.title}", "A brand new recipe")
    #
    # def test_recipe_list_view(self):
    #     response = self.client.get(reverse"path thru all your namespaces ")
    #     self.assertEqual(response.status_code, 200)
    #     #this only bring back the published ones, we
    #     #send up a draft
    #     self.assertNotContains(response, 'A brand new article')
    #     #wants to make sure the draft isn't publishing

    # you can do a no_response
