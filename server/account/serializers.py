from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ("id", "email", "password", "first_name", "last_name")
        extra_kwargs = {"password": {"write_only": True}}

    def validate_password(self, password):
        if len(password) < 6:
            raise serializers.ValidationError("The password is too small")
        return password

    def create(self, validated_data):
        password = self.validate_password(validated_data["password"])
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            password=password,
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
