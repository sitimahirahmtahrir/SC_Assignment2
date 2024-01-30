from . import views
from django.urls import path

urlpatterns = [
    path('lc/', views.EquipmentLC.as_view()),           #for get all and create new
    path('rud/<int:pk>/', views.EquipmentRUD.as_view()) #for get one, update and delete
]