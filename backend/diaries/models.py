from django.db import models

# Create your models here.

class Diary(models.Model):
    user = models.ForeignKey("accounts.User", null=False, on_delete=models.CASCADE)
    title = models.CharField(null=False, max_length=176)
    content = models.TextField()
    emotion = models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)


class Bookmark(models.Model):
    user = models.ForeignKey("accounts.User", null=False, on_delete=models.CASCADE)
    diary = models.ForeignKey("diaries.Diary", null=False, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'diary'], name='unique_bookmark'),
        ]


class DiaryMusic(models.Model):
    diary = models.ForeignKey("diaries.Diary", null=False, on_delete=models.CASCADE)
    music = models.ForeignKey("musics.Music", null=False, on_delete=models.CASCADE)


class DiarySticker(models.Model):
    diary = models.ForeignKey("diaries.Diary", null=False, on_delete=models.CASCADE)
    sticker = models.ForeignKey("stickers.Sticker", null=False, on_delete=models.CASCADE)
    sticker_x = models.FloatField(null=False)
    sticker_y = models.FloatField(null=False)
    

class DiaryImage(models.Model):
    diary = models.ForeignKey("diaries.Diary", null=False, on_delete=models.CASCADE)
    image_id = models.CharField(max_length=50)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['image_id', 'diary'], name='unique_image'),
        ]


class Image(models.Model):
    image = models.FileField(blank=True, default='')
    image_id = models.CharField(max_length=50)

