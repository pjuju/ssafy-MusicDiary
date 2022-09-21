from django.urls import path
from . import views

urlpatterns = [
    # path('', views.diary),
    path('', views.DiaryList.as_view()),
    path('<int:diary_pk>/', views.DiaryDetail.as_view()),
    path('<int:diary_pk>/playlist/', views.DiaryMusicDetail),
    # path('<int:diary_pk>/image/', views.ImageView.as_view()),
    path('bookmark/', views.bookmark),
    path('bookmark/<int:bookmark_pk>/', views.bookmark_detail),
    path('month/<int:month>/emotion/', views.monthEmotion),
    path('month/<int:month>/', views.monthDiary),
    # path('<int:diary_id>/decorate/', views.decorate),
    # path('<int:diary_pk>/sticker/', views.monthSticker),
]
