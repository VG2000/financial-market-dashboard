from django.urls import path
from . import views

urlpatterns = [
    path("", views.react_home, name="react-home"),
    path("refresh-bonds/", views.refresh_bond_data_view, name="refresh-bonds"),
    path("bonds/", views.get_bonds, name="get-bonds"),
]
