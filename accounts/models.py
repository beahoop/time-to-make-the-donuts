from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
                    #if you delete the user the profile will delete
    profile_picture = models.ImageField(upload_to='profiles/', null=True)
    #profiles media dir and within that dir we will see
    #profiles dir to see all the Images that are uploaded here

    def __str__(self):
        return self.user.username
