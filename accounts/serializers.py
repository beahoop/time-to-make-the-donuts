from rest_framework import serializers
from rest_auth.models import TokenModel

class TokenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    is_staff = serializers.ReadOnlyField(source='user.is_staff')
#now when you login and reg you can use the username and key
    class Meta:
        model = TokenModel
        fields = ('key', 'username', 'is_staff')
