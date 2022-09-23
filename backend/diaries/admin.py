from django.contrib import admin
from .models import Bookmark, Diary, DiaryMusic, DiarySticker, Image

# Register your models here.

admin.site.register(Diary)
admin.site.register(Bookmark)
admin.site.register(Image)
admin.site.register(DiaryMusic)
admin.site.register(DiarySticker)