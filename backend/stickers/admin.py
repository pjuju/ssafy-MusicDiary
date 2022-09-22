from django.contrib import admin
from .models import StickerPack, Sticker, UserSticker

# Register your models here.

admin.site.register(StickerPack)
admin.site.register(Sticker)
admin.site.register(UserSticker)