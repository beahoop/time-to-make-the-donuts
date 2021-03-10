from django.contrib.auth import get_user_model
from django.test import TestCase

"""THIS DOES NOT AFFECT YOUR CURRENT DATA
THIS A PLAYGROUND
"""
# Create your tests here.

class CustomUserTests(TestCase):

    def test_create_user(self):
        '''tests that a new user can be created'''

        User = get_user_model()
        user = User.objects.create_user(
        # createuser is built in
            username='sarah',
            email ='sarah@example.com',
            password='safepass1',
        )
        self.assertEqual(user.username, 'sarah')
        self.assertEqual(user.email, 'sarah@example.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        '''tests that a new SUPERuser can be created'''

        User = get_user_model()
        user = User.objects.create_superuser(
        # objects this is how you target the the methods
            username='admin',
            email='admin@example.com',
            password='safepass1',
        )
        self.assertEqual(user.username, 'admin')
        self.assertEqual(user.email, 'admin@example.com')
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
