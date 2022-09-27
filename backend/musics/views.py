from rest_framework import status
from rest_framework.response import Response

from accounts import serializers
from .serializers import MusicSerializer

from musics.models import Music
from accounts.models import User
from django.shortcuts import get_list_or_404 ,get_object_or_404
from rest_framework.decorators import api_view

import random

# Create your views here.


@api_view(['GET'])
def get_one(request,music_id):
    music = get_object_or_404(Music, id=music_id)
    serializer = MusicSerializer(music)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_all(request):
    login = get_object_or_404(User, pk=request.user.pk)
    playlist = login.favorite_musics.filter()
    serializer = MusicSerializer(playlist, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def favorite_music(request, music_id):
    music = get_object_or_404(Music, pk=music_id)
    user = request.user
    
    if music.like_users.filter(pk=user.pk).exists():
        music.like_users.remove(user)
        serializer = MusicSerializer(music)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    else:
        music.like_users.add(user)
        serializer = MusicSerializer(music)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

def convertToMood(mood_id):
    if mood_id == 1:
        return "Sad"
    elif mood_id == 2:
        return "Happy"
    elif mood_id == 3:
        return "Energetic"
    elif mood_id == 4:
        return "Calm"
    else:
        return "ERROR"

@api_view(['GET'])
def emotion_playlist(request, emotion_id):
    # emotion = {1: 기쁨, 2: 불안, 3: 슬픔, 4: 분노, 5: 우울, 6: 평온}
    if request.method =='GET':
        user = request.user

        if emotion_id == 1:
            mood = 'Happy'
        elif emotion_id == 2:
            mood = 'Calm'
        else:
            ## 설문을 참고해야 하는 감정
            mood_id = user.normal
            if emotion_id == 3:
                mood_id = user.sad
            elif emotion_id == 4:
                mood_id = user.angry
            elif emotion_id == 5:
                mood_id = user.depressed
            elif emotion_id == 6:
                mood_id = user.normal
            else:
                return Response({'error':'유효하지 않은 감정 번호입니다'}, status=status.HTTP_400_BAD_REQUEST)

            mood = convertToMood(mood_id)

        playlist = request.user.favorite_musics.filter(mood=mood)
        serializer = MusicSerializer(playlist, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
