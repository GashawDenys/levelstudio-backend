# from rest_framework import serializers
# from app.models import *


# class UserSerializer(serializers.Serializer):
#     name = serializers.CharField(read_only=True)
#     surname = serializers.CharField(read_only=True)
#     username = serializers.CharField(read_only=True)
#     email = serializers.CharField(read_only=True)
#     password = serializers.CharField(read_only=True)
#     img = serializers.CharField(read_only=True)

#     def update(self, instance, validated_data):
#         instance.status = validated_data["name"]
#         instance.save()
#         return instance
