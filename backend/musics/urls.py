from django.urls import path
from . import views

urlpatterns = [
    path('music/',views.get_all),
    path("music/<int:music_id>/", views.get_one),
    path('music/like/<int:music_id>/',views.favorite_music),
    path('playlist/<str:emotion>/',views.emotion_playlist),
]
