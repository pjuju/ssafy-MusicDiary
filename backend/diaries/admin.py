from django.contrib import admin
from .models import Bookmark, Diary

# Register your models here.

admin.site.register(Diary)
admin.site.register(Bookmark)