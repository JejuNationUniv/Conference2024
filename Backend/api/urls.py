from django.urls import path
from . import views

urlpatterns = [
    path('main/', views.main_view, name='main'),
    path('get_sentence/', views.get_sentence, name='get_sentence'),
    path('analyze_pronunciation/', views.analyze_pronunciation, name='analyze_pronunciation'),
]