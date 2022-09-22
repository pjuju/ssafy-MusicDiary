# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.conf import settings

class Music(models.Model):
    id = models.IntegerField(null=False, primary_key=True)
    artist_name = models.TextField(blank=True, null=True)
    track_name = models.TextField(blank=True, null=True)
    track_id = models.TextField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    market = models.TextField(blank=True, null=True)
    track_popularity = models.IntegerField(blank=True, null=True)
    artist_id = models.TextField(blank=True, null=True)
    videoid = models.TextField(db_column='videoId', blank=True, null=True)  # Field name made lowercase.
    danceability = models.FloatField(blank=True, null=True)
    energy = models.FloatField(blank=True, null=True)
    valence = models.FloatField(blank=True, null=True)
    loudness = models.FloatField(blank=True, null=True)
    speechiness = models.FloatField(blank=True, null=True)
    tempo = models.FloatField(blank=True, null=True)
    key = models.IntegerField(blank=True, null=True)
    time_signature = models.IntegerField(blank=True, null=True)
    instrumentalness = models.FloatField(blank=True, null=True)
    acousticness = models.FloatField(blank=True, null=True)
    liveness = models.FloatField(blank=True, null=True)
    mood = models.TextField(blank=True, null=True)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='favorite_musics')

    class Meta:
        db_table = 'music'

