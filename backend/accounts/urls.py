from django.urls import path
from accounts import views

urlpatterns = [
    path('kakao/login/', views.kakao_login, name='kakao_login'),
    path('kakao/callback2/', views.kakao_callback, name='kakao_callback'),
    path('kakao/login/finish/', views.KakaoLogin.as_view(),
         name='kakao_login_todjango'),

    path('google/login/', views.google_login, name='google_login'),
    path('google/callback/', views.google_callback, name='google_callback'),
    path('google/login/finish/', views.GoogleLogin.as_view(),
         name='google_login_todjango'),
    path('signup/', views.SignupView.as_view()),   
    path('login/',views.SigninView.as_view()),
    path('<int:pk>/',views.UserView),
#     path('checkEmail/email', views.EmailUniqueCheck.as_view(), name='uniquecheck_email'),

]
