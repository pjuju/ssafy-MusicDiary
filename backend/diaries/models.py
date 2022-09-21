from tkinter import CASCADE
from django.db import models

# Create your models here.

class Diary(models.Model):
    # user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
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
    color = models.CharField(max_length=20)


# class StickerPack(models.Model):
#     name = models.CharField(max_length=50)
#     price = models.IntegerField()
#     # uploader = models.ForeignKey("accounts.User", on_delete=models.CASCADE)

# class Sticker(models.Model):
#     diary = models.ForeignKey("diaries.Diary", on_delete=models.CASCADE)
#     sticker_pack = models.ForeignKey("diaries.StickerPack", on_delete=CASCADE)


# class StickerPack
# class Sticker
# class MyStickerPack
# class DiarySticker
# class DiaryPlaylist