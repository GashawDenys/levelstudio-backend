from django.urls import path


from app.views import *

urlpatterns = [path("users/", UsersListApiView.as_view())]
