from django.urls import path
from .views import HelloWorldView

urlpatterns = [
    path('main/', HelloWorldView.as_view(), name='main'),
]