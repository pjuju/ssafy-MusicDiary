from email.mime import image
from django.db import models

# Create your models here.

class Diary(models.Model):
    # user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=176)
    content = models.TextField()
    emotion = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Image(models.Model):
    diary = models.ForeignKey("diaries.Diary", on_delete=models.CASCADE)
    # user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    image_url = models.TextField()


class Bookmark(models.Model):
    # user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    diary = models.ForeignKey("diaries.Diary", on_delete=models.CASCADE)
    color = models.CharField(max_length=10)


class DiaryMusic(models.Model):
    diary = models.ForeignKey("diaries.Diary", on_delete=models.CASCADE)
    music = models.ForeignKey("musics.Music", on_delete=models.CASCADE)


class StickerPack(models.Model):
    name = models.CharField(max_length=60)
    price = models.IntegerField()
    # uploader = models.ForeignKey("accounts.User", on_delete=models.CASCADE)


class Sticker(models.Model):
    sticker_pack = models.ForeignKey("diaries.StickerPack", on_delete=models.CASCADE)
    image_url = models.CharField(max_length=176)


class DiarySticker(models.Model):
    diary = models.ForeignKey("diaries.Diary", on_delete=models.CASCADE)
    sticker = models.ForeignKey("diaries.Sticker", on_delete=models.CASCADE)

# 스티커팩 구매이력(Purchase History)
# class StickerPackPH(models.Model):