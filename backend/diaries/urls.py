from django.urls import path
from . import views

urlpatterns = [
    path('', views.diary),
    # path('', views.DiaryView.as_view()),
    path('<int:diary_pk>/', views.diary_detail),
    # path('<int:diary_id>/decorate/', views.decorate),
    # path('<int:diary_pk>/playlist/', views.playlist),
    path('bookmark/', views.bookmark),
    path('bookmark/<int:bookmark_pk>/', views.bookmark_detail),
    # path('<int:diary_pk>/sticker/', views.monthSticker),
    path('month/<int:month>/emotion/', views.monthEmotion),
    path('month/<int:month>/', views.monthDiary),
]
