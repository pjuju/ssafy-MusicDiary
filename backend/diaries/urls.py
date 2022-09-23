from django.urls import path
from . import views

urlpatterns = [
    # path('', views.diary),
    path('', views.DiaryList.as_view()),
    path('<int:diary_pk>/', views.DiaryDetail.as_view()),
    path('<int:diary_pk>/playlist/', views.DiaryMusicDetail),
    path('bookmark/', views.BookmarkList.as_view()),
    path('<int:diary_pk>/bookmark/', views.BookmarkDetail.as_view()),
    path('month/<int:month>/emotion/', views.monthEmotion),
    path('month/<int:month>/', views.monthDiary),
    path('image/', views.ImageDetail.as_view()),
]
