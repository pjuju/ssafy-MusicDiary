from django.db import models

# Create your models here.

class Diary(models.Model):
    # user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    context = models.TextField
    emotion = models.IntegerField
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title


class Image(models.Model):
    diary = models.ForeignKey("diaries.Diary", on_delete=models.CASCADE)
    # user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    image_url = models.TextField


class Sentence(models.Model):
    sentence = models.CharField(max_length=30)
    emotion = models.IntegerField


class Diary_Sentence(models.Model):
    diary = models.ForeignKey("diaries.Diary", on_delete=models.CASCADE)
    sentence = models.ForeignKey("diaries.Sentence", on_delete=models.CASCADE)