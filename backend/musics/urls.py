from django.urls import path
from . import views

urlpatterns = [
    path("<int:music_id>/", views.get_one),
    path('like/',views.get_all),
    path('like/<int:music_id>/',views.favorite_music),
    path('playlist/<int:emotion_id>/',views.emotion_playlist),
]
