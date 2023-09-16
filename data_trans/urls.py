from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_data_from_web),
    path('data/', views.update_data),
]
