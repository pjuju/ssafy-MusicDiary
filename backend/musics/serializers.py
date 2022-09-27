from dataclasses import field
from xml.etree.ElementInclude import include
from rest_framework import serializers
from .models import Music
from django.contrib.auth import get_user_model


User = get_user_model()
class MusicSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Music
        fields = ('id', 'artist_name', 'track_name', 'track_id', 'track_popularity', 'artist_id', 'videoid', 'mood', 'like_users')
