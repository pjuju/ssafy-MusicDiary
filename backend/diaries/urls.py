from django.urls import path
from . import views

urlpatterns = [
    path('', views.DiaryList.as_view()),
    path('<int:diary_pk>/', views.DiaryDetail.as_view()),
    path('<int:diary_pk>/playlist/', views.DiaryMusicDetail.as_view()),
    path('bookmark/', views.BookmarkList.as_view()),
    path('<int:diary_pk>/bookmark/', views.BookmarkDetail.as_view()),
    path('month/<int:year>/<int:month>/emotion/', views.MonthEmotion.as_view()),
    path('month/<int:year>/<int:month>/', views.MonthDiary.as_view()),
    path('image/', views.ImageDetail.as_view()),
]
