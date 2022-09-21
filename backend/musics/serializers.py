from rest_framework import serializers
from .models import Music
from django.contrib.auth import get_user_model


User = get_user_model()
class MusicSerialiezer(serializers.ModelSerializer):
    
    class Meta:
        model = Music
        fields = '__all__'
