from django.urls import path
from . import views

urlpatterns = [
    path('pack/', views.StickerPackList.as_view()),
    path('pack/<int:stickerpack_id>/', views.StickerPackDetail.as_view()),
    path('<int:sticker_id>/', views.StickerDetail.as_view()),
    path('user/<int:user_id>/', views.UserStickerDetail.as_view()),
    path('kakaopay/<int:user_id>/', views.KakaoPay),

]
