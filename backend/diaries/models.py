from email.mime import image
from django.db import models

# Create your models here.

class Diary(models.Model):
    user = models.ForeignKey("accounts.User", null=False, on_delete=models.CASCADE)
    title = models.CharField(null=False, max_length=176)
    content = models.TextField()
    emotion = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Image(models.Model):
    diary = models.ForeignKey("diaries.Diary", null=False, on_delete=models.CASCADE)
    image_url = models.TextField(null=False)


class Bookmark(models.Model):
    user = models.ForeignKey("accounts.User", null=False, on_delete=models.CASCADE)
    diary = models.ForeignKey("diaries.Diary", null=False, on_delete=models.CASCADE)
    color = models.CharField(max_length=10)


class StickerPack(models.Model):
    name = models.CharField(null=False, max_length=60)
    price = models.IntegerField()
    user = models.ForeignKey("accounts.User", null=False, on_delete=models.CASCADE)


class Sticker(models.Model):
    sticker_pack = models.ForeignKey("diaries.StickerPack", null=False, on_delete=models.CASCADE)
    image_url = models.CharField(null=False, max_length=176)


class DiarySticker(models.Model):
    diary = models.ForeignKey("diaries.Diary", null=False, on_delete=models.CASCADE)
    sticker = models.ForeignKey("diaries.Sticker", null=False, on_delete=models.CASCADE)
    

class DiaryMusic(models.Model):
    diary = models.ForeignKey("diaries.Diary", null=False, on_delete=models.CASCADE)
    music = models.ForeignKey("musics.Music", null=False, on_delete=models.CASCADE)

# 스티커팩 구매이력(Purchase History)
# class StickerPackPH(models.Model):