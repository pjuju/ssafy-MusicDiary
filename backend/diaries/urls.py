from django.urls import path
from . import views

urlpatterns = [
    path('/', views.create),
    path('/<int:diary_pk>', views.detail),
    # path('/<int:diary_id>/decorate', views.decorate),
    path('/<int:diary_pk>/playlist', views.playlist),
    path('/bookmark', views.bookmark),
    # path('/<int:diary_pk>/sticker', views.monthSticker),
    path('/month/<int:month>/emotion', views.monthEmotion),
    path('/month/<int:month>', views.monthDiary),
]
