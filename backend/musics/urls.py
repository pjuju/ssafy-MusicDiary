from django.urls import path
from . import views

urlpatterns = [
    path('',views.get_all),
    path("<int:music_id>/", views.get_one),
    path('like/<int:music_id>/',views.favorite_music),
    # path('unlike/<int:music_id>/',views.unlike),
]
