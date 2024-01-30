from djoser.serializers import UserCreateSerializer as DjoserSerializer
from django.contrib.auth.models import User
from rest_framework import serializers

class UserCreateSerializer(DjoserSerializer):
    class Meta(DjoserSerializer.Meta):
        model = User
        fields = ('email', 'username')
        extra_kwargs = {
            'password': {'write_only': True},
        }
