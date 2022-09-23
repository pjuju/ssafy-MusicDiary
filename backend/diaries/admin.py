from django.contrib import admin
from .models import Bookmark, Diary, DiaryMusic, DiarySticker, DiaryImage

# Register your models here.

admin.site.register(Diary)
admin.site.register(Bookmark)
admin.site.register(DiaryImage)
admin.site.register(DiaryMusic)
admin.site.register(DiarySticker)