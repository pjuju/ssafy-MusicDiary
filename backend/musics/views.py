from rest_framework import status
from rest_framework.response import Response

from accounts import serializers
from .serializers import MusicSerializer

from musics.models import Music
from accounts.models import User
from django.shortcuts import get_list_or_404 ,get_object_or_404
from rest_framework.decorators import api_view
from musics.models import Music
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import numpy as np

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


@api_view(['GET'])
def emotion_recommend(request, emotion_id):
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


    # 음악 리스트 생성
    # 1. 감정별로 내가 좋아한 음악들 리스트
        liked_musics = user.favorite_musics.filter(mood=mood).values()    
        liked_musics_df = pd.DataFrame(list(liked_musics), columns=['id','year', 'track_popularity', 'danceability',
            'acousticness', 'energy', 'liveness', 'valence', 'loudness', 'speechiness', 'tempo'])    
        liked_musics_df.set_index('id', inplace=True)

        # id리스트에 담기    
        liked_ids = []    
        for l_m in liked_musics:
            liked_ids.append(l_m['id'])

        # 2. 전체 음악에서 감정으로 거른 음악들 (좋아한 음악들 제외)
        all_musics = Music.objects.filter(mood=mood).exclude(id__in=liked_ids).values()   
        all_musics_df = pd.DataFrame(list(all_musics), columns=['id','year', 'track_popularity', 'danceability',
            'acousticness', 'energy', 'liveness', 'valence', 'loudness', 'speechiness', 'tempo'])   

        all_musics_df.set_index('id', inplace=True)

        # 그 감정에서 좋아한 노래가 아직 없으면 전체 음악에서 인기도 순으로 N개 자르고, 10개 랜덤 츄츌
        if len(liked_ids) == 0:
            if mood == "Calm": # 500개 
                reco_musics_df = all_musics_df.sort_values(by="track_popularity", ascending=False).head(200).sample(10)

            elif mood == "Energetic": # 700개 
                reco_musics_df = all_musics_df.sort_values(by="track_popularity", ascending=False).head(700).sample(10)

            elif mood == "Happy": # 1000개 
                reco_musics_df = all_musics_df.sort_values(by="track_popularity", ascending=False).head(1000).sample(10)

            elif mood == "Sad":  # 1000개 
                reco_musics_df = all_musics_df.sort_values(by="track_popularity", ascending=False).head(1000).sample(10)

            reco_musics_df = all_musics_df.sort_values(by="track_popularity", ascending=False).head(500).sample(10)    

        else:
            # 정규화 작업
            scaler = MinMaxScaler()
            # print(all_musics_df)
            scaler.fit(all_musics_df)
            all_musics_df = pd.DataFrame(scaler.transform(all_musics_df), index=all_musics_df.index, columns=all_musics_df.columns)
            liked_musics_df = pd.DataFrame(scaler.transform(liked_musics_df), index=liked_musics_df.index, columns=liked_musics_df.columns)

            # 중앙값    
            median_music_df = liked_musics_df.median()  
            
            # 평균값   
            # mean_music_df = liked_musics_df.mean()

            # 음악 유사도 측정 (유클리디안 거리)           
            all_musics_df['similarity'] = ( (all_musics_df['track_popularity'] - median_music_df['track_popularity']) ** 2 + (all_musics_df['year'] - median_music_df['year']) ** 2 + (all_musics_df['danceability'] - median_music_df['danceability']) ** 2 + (all_musics_df['acousticness'] - median_music_df['acousticness']) ** 2 + (all_musics_df['energy'] - median_music_df['energy']) ** 2 + (all_musics_df['liveness'] - median_music_df['liveness']) ** 2 + (all_musics_df['valence'] - median_music_df['valence']) ** 2 + (all_musics_df['loudness'] - median_music_df['loudness']) ** 2 + (all_musics_df['speechiness'] - median_music_df['speechiness']) ** 2 + (all_musics_df['tempo'] - median_music_df['tempo']) ** 2 ) ** 0.5


            # 가장 유사한 음악 N개 추출 + 유사한 음악들에서 인기도 순 상위 N개에서 10개 추출
            if mood == "Calm": # 500개 / 200개
                similar_musics_df = all_musics_df.sort_values(by="similarity", ascending=False).head(300)
                reco_musics_df = similar_musics_df.sort_values(by="track_popularity", ascending=False).head(100).sample(10)    

            elif mood == "Energetic": # 700개 / 200개
                similar_musics_df = all_musics_df.sort_values(by="similarity", ascending=False).head(700)
                reco_musics_df = similar_musics_df.sort_values(by="track_popularity", ascending=False).head(100).sample(10) 

            elif mood == "Happy": # 1000개 / 300개
                similar_musics_df = all_musics_df.sort_values(by="similarity", ascending=False).head(1000)
                reco_musics_df = similar_musics_df.sort_values(by="track_popularity", ascending=False).head(100).sample(10) 

            elif mood == "Sad":  # 1000개 / 300개
                similar_musics_df = all_musics_df.sort_values(by="similarity", ascending=False).head(1000)
                reco_musics_df = similar_musics_df.sort_values(by="track_popularity", ascending=False).head(100).sample(10) 

        reco_musics_list = list(reco_musics_df.index)
        playlist = Music.objects.filter(id__in=reco_musics_list)
        serializer = MusicSerializer(playlist, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

