from django.db import models


class User(models.Model):
    name = models.CharField(max_length=300)
    surname = models.CharField(max_length=300)
    username = models.CharField(max_length=300)
    email = models.CharField(max_length=300)
    password = models.CharField(max_length=300)
    img = models.CharField(max_length=300)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return f"{self.id}, {self.name}"

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
            "email": self.email,
            "password": self.password,
            "img": self.img,
        }
