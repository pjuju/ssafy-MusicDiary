from django.urls import path
from . import views

urlpatterns = [
    path('html/', views.article_html),
]
