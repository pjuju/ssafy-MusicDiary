from django.shortcuts import get_object_or_404, get_list_or_404

from .serializers import DiaryMusicSerializer, DiarySerializer, BookmarkSerializer, DiaryStickerSerializer, DiaryImageSerializer, ImageSerializer
from .models import Bookmark, Diary, DiaryMusic, DiaryImage, DiarySticker

from rest_framework import parsers, renderers, status
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

import base64
from Crypto import Random
from Crypto.Cipher import AES
import hashlib

from django.conf import settings
from accounts.models import User
from musics.models import Music
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import numpy as np
from manage import BERTDataset
import torch
import gluonnlp as nlp

from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model
from server.settings import loaded_data
from .storages import FileUpload, s3_client
from drf_yasg.utils import swagger_auto_schema


class AESCipher:
    def __init__(self):
        self.key = bytes(hashlib.sha256(settings.SECRET_KEY.encode('utf-8')).digest())
        self.BS = 16
        self.pad = lambda s: s + (self.BS - len(s.encode('utf-8')) % self.BS) * chr(self.BS - len(s.encode('utf-8')) % self.BS)
        self.unpad = lambda s : s[:-ord(s[len(s)-1:])]

    def encrypt(self, raw):
        # raw 데이터 패딩
        raw = self.pad(raw).encode('utf-8')
        # print(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self.unpad(cipher.decrypt(enc[16:]))

    def encrypt_str(self, raw):
        return self.encrypt(raw).decode('utf-8')

    def decrypt_str(self, enc):
        if type(enc)==str:
            enc = str.encode(enc)
        return self.decrypt(enc).decode('utf-8')

# AES Encrypt
ciper = AESCipher()
device = torch.device("cpu")
bertmodel, vocab = get_pytorch_kobert_model()

# Setting parameters
max_len = 64
batch_size = 32
warmup_ratio = 0.1
num_epochs = 20
max_grad_norm = 1
log_interval = 100
learning_rate =  5e-5

#토큰화
tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

def predict(predict_sentence):
    print("predict>>>>>>>", "감정분석 시작")
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)
    
    loaded_data.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader): 
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = loaded_data(token_ids, valid_length, segment_ids)
        
        test_eval=[]
        for i in out:
            logits=i
            logits = logits.detach().cpu().numpy()

            if np.argmax(logits) == 0:
                test_eval.append("기쁨")
            elif np.argmax(logits) == 1:
                test_eval.append("불안")
            elif np.argmax(logits) == 2:
                test_eval.append("슬픔")
            elif np.argmax(logits) == 3:
                test_eval.append("분노")
            elif np.argmax(logits) == 4:
                test_eval.append("평온")
            elif np.argmax(logits) == 5:
                test_eval.append("우울")
                
    return test_eval[0]

# Get: 일기 전체 리스트 보기
# Post: 일기 작성
class DiaryList(GenericAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def get(self, request, format=None):
        try:
            diaries = get_list_or_404(Diary, user=request.user.pk)
        except:
            return Response([], status=status.HTTP_404_NOT_FOUND)
        # 복호화
        for diary in diaries:
            diary.title = ciper.decrypt_str(diary.title)
            diary.content = ciper.decrypt_str(diary.content)
            diary.emotion = ciper.decrypt_str(diary.emotion)

        serializer = DiarySerializer(diaries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        data = request.data
        newPost = dict()
        newPost['title'] = ciper.encrypt_str(data['title'])
        newPost['content'] = ciper.encrypt_str(data['content'])
        newPost['created_date'] = data['created_date']

        # 유저 정보
        if 'user' in data:
            newPost['user'] = data['user']
        else:
            newPost['user'] = request.user.pk

        # 감정 정보
        if ('emotion' in data) and (data['emotion'] != ''):
            # 명시된 감정이 있을 경우
            emotion = data['emotion']
        else:   
            # 명시된 감정이 없을 경우 텍스트 분석으로 감정 도출
            emotion = predict(data['content'])

        newPost['emotion'] = ciper.encrypt_str(emotion)
        diarySerializer = DiarySerializer(data=newPost)

        if diarySerializer.is_valid(raise_exception=True):
            diarySerializer.save()

            # 방금 등록된 일기의 id 값
            diary_pk = diarySerializer.data['id']

            # 일기에 첨부된 이미지가 있을 경우
            if 'images' in data:
                # 이미지 리스트
                images = data['images']
                image = {'diary': diary_pk, 'image_url': ''}

                # 각각의 이미지를 image 테이블에 넣어줌
                for img in images:
                    image['image_url'] = img['image_url']
                    diaryImageSerializer = DiaryImageSerializer(data=image)
                    if diaryImageSerializer.is_valid(raise_exception=True):
                        diaryImageSerializer.save()

            # 일기에 첨부된 스티커가 있을 경우
            if 'stickers' in data:
                # 스티커 리스트
                stickers = data['stickers']
                sticker = {'diary': diary_pk}

                # 각각의 스티커를 sticker 테이블에 넣어줌
                for stckr in stickers:
                    sticker['sticker'] = stckr['sticker_id']
                    sticker['sticker_x'] = stckr['sticker_x']
                    sticker['sticker_y'] = stckr['sticker_y']
                    diarystickerSerializer = DiaryStickerSerializer(data=sticker)
                    if diarystickerSerializer.is_valid(raise_exception=True):
                        diarystickerSerializer.save()

            # return Response(diarySerializer.data, status=status.HTTP_201_CREATED)
            return DiaryMusicDetail().post(request=request, diary_pk=diary_pk)


class ImageDetail(GenericAPIView):
    serializer_class = ImageSerializer
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.FileUploadParser)
    renderer_classes = (renderers.JSONRenderer,)

    def post(self, request, format=None):
        file = request.FILES['image']
        profile_image_url = FileUpload(s3_client).upload(file)
        if profile_image_url != None:
            return Response(profile_image_url, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @swagger_auto_schema(request_body=ImageSerializer)
    def delete(self, request, format=None):
        image_url = request.data['image_url']
        image_id = image_url.split('com/')[1]
        ret = FileUpload(s3_client).delete(image_id)
        if ret=="SUCCESS":
            return Response({'result': ret}, status=status.HTTP_204_NO_CONTENT)
        return Response({'result': ret}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get: 일기 상세보기
# Put, Patch: 일기 수정
# Delete: 일기 삭제
class DiaryDetail(GenericAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def get(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        diary.title = ciper.decrypt_str(diary.title)
        diary.content = ciper.decrypt_str(diary.content)
        diary.emotion = ciper.decrypt_str(diary.emotion)
        serializer = DiarySerializer(diary)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        data = request.data
        ctnt = ciper.decrypt_str(diary.content)
        
        newPost = dict()
        if 'title' in data:
            newPost['title'] = ciper.encrypt_str(data.get('title'))
        if 'content' in data:
            ctnt = data.get('content')
            newPost['content'] = ciper.encrypt_str(data.get('content'))
        if ('emotion' in data) and (data['emotion'] != ''):
            newPost['emotion'] = ciper.encrypt_str(data.get('emotion'))
        else:
            newPost['emotion'] = ciper.encrypt_str(predict(ctnt))
        newPost['created_date'] = data.get('created_date', diary.created_date)

        diarySerializer = DiarySerializer(diary, data=newPost, partial=True)
        if diarySerializer.is_valid(raise_exception=True):
            diarySerializer.save()

            # 이미지 수정
            if 'images' in data:
                # 기존 이미지들 삭제
                try:
                    oldImages = get_list_or_404(DiaryImage, diary=diary_pk)
                    for i in range(len(oldImages)):
                        oldImages[i].delete()
                except:
                    pass

                newImages = data['images']
                image = {'diary': diary_pk}

                # 각각의 이미지를 image 테이블에 넣어줌
                try:
                    for img in newImages:
                        image['image_url'] = img['image_url']
                        diaryImageSerializer = DiaryImageSerializer(data=image)
                        if diaryImageSerializer.is_valid(raise_exception=True):
                            diaryImageSerializer.save()
                except:
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # 스티커 수정
            if 'stickers' in data:
                # 기존 스티커들 삭제
                try:
                    oldStickers = get_list_or_404(DiarySticker, diary=diary_pk)
                    for i in range(len(oldStickers)):
                        oldStickers[i].delete()
                except:
                    pass

                newStickers = data['stickers']
                sticker = {'diary': diary_pk}

                # 각각의 스티커를 sticker 테이블에 넣어줌
                try:
                    for stckr in newStickers:
                        sticker['sticker'] = stckr['sticker_id']
                        sticker['sticker_x'] = stckr['sticker_x']
                        sticker['sticker_y'] = stckr['sticker_y']
                        diarystickerSerializer = DiaryStickerSerializer(data=sticker)
                        if diarystickerSerializer.is_valid(raise_exception=True):
                            diarystickerSerializer.save()
                except:
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return DiaryDetail.get(self=DiaryDetail, request=request, diary_pk=diary_pk)


    def delete(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        diary.delete()
        data = {'delete': f'데이터 {diary_pk}번이 삭제되었습니다.'}
        return Response(data, status=status.HTTP_204_NO_CONTENT)


# Get: 일기별 플레이리스트 조회
# Post: 일기별 플레이리스트 생성
class DiaryMusicDetail(GenericAPIView):
    queryset = DiaryMusic.objects.all()
    serializer_class = DiaryMusicSerializer

    def get(self, request, diary_pk, format=None):
        try:
            playlist = get_list_or_404(DiaryMusic, diary=diary_pk)
        except:
            return Response([], status=status.HTTP_404_NOT_FOUND)
        # 플레이리스트 속 곡들의 좋군요 정보 업데이트
        for i in range(len(playlist)):
            msc = get_object_or_404(Music, pk=playlist[i].music.id)
            if msc.like_users.filter(pk=request.user.pk).exists():
                playlist[i].like = True
            else:
                playlist[i].like = False
            print("updated", msc.track_name, playlist[i].like)
            playlist[i].save()
        serializer = DiaryMusicSerializer(playlist, many=True)
        return Response(serializer.data)

    def post(self, request, diary_pk, format=None):
        oldPlaylist = None
        try:
            # 기존 플레이리스트 존재하면 삭제
            oldPlaylist = get_list_or_404(DiaryMusic, diary=diary_pk)
            for i in range(len(oldPlaylist)):
                oldPlaylist[i].delete()
        except:
            pass

        # 대상 일기
        diary = get_object_or_404(Diary, pk=diary_pk)
        # 일기의 감정
        emotion = ciper.decrypt_str(diary.emotion)
        # 작성 유저
        user = get_object_or_404(User, pk=request.user.pk)

        # 6가지 감정을 4가지로 분류, mood 도출
        ## 기본 감정
        print(emotion)
        if emotion == '기쁨':
            mood = 'Happy'
        elif emotion == '불안':
            mood = 'Calm'
        else:
            ## 설문을 참고해야 하는 감정
            mood_id = user.normal
            if emotion == '슬픔':
                mood_id = user.sad
            elif emotion == '분노':
                mood_id = user.angry
            elif emotion == '우울':
                mood_id = user.depressed
            elif emotion == '평온':
                mood_id = user.normal
            print(mood_id)

            # 설문을 통해 mood 도출
            mood = convertToMood(mood_id)
            if mood == 'ERROR':
                return Response({'error': '유효하지 않은 음악 선호도 값'}, status=status.HTTP_400_BAD_REQUEST)

        print(mood)
        # [1, 4, 5, 16, 23]
        playlist = makePlaylist(mood, request.user)

        # 생성된 플레이리스트 테이블에 저장
        data={'diary': diary_pk}
        for music in playlist:
            data['music'] = music
            serializer = DiaryMusicSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
        
        return Response(status=status.HTTP_201_CREATED)
        # return self.get(request=request, diary_pk=diary_pk)

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


# mood : 일기의 emotion -> user의 취향 ( emotion 별 노래 mood)
# user : requesqt.user
def makePlaylist(mood, user):
    # Todo: diary_pk 일기의 추천 음악 id를 list로 반환

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
    return reco_musics_list


# Get: 모든 책갈피 모아보기
class BookmarkList(GenericAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def get(self, request, format=None):
        try:
            bookmarks = get_list_or_404(Bookmark, user=request.user.pk)
        except:
            return Response([], status=status.HTTP_404_NOT_FOUND)
        # 복호화
        for bookmark in bookmarks:
            diary = bookmark.diary
            bookmark.diary.title = ciper.decrypt_str(diary.title)
            bookmark.diary.content = ciper.decrypt_str(diary.content)
            bookmark.diary.emotion = ciper.decrypt_str(diary.emotion)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Post: 일기장 책갈피 등록
# Delete: 일기장 책갈피 해제
class BookmarkDetail(GenericAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    
    def post(self, request, diary_pk, format=None):
        try:
            bookmark = Bookmark.objects.get(user=request.user.pk, diary=diary_pk)
        except:
            bookmark = {'user': request.user.pk, 'diary': diary_pk}
            bookmarkSerializer = BookmarkSerializer(data=bookmark)

            if bookmarkSerializer.is_valid(raise_exception=True):
                bookmarkSerializer.save()

                diary = Diary.objects.get(pk=diary_pk)
                diary.bookmarked = True
                diary.save()
                return DiaryDetail.get(DiaryDetail, request, diary_pk=diary_pk)
        
        if bookmark != None:
            print(bookmark)
            data = {'error': '이미 책갈피로 등록된 게시물입니다.'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, diary_pk, format=None):
        diary = Diary.objects.get(pk=diary_pk)
        diary.bookmarked = False
        diary.save()

        bookmark = get_object_or_404(Bookmark, user=request.user.pk, diary=diary_pk)
        bookmark.delete()
        data = {'msg': '북마크에서 해제되었습니다.'}
        return Response(data, status=status.HTTP_204_NO_CONTENT)


# Get: 월별 일기 감정 조회
class MonthEmotion(GenericAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def get(self, request, year, month, format=None):
        # int형 month를 두자리 string형으로 변환
        str_month = str(month)
        if len(str_month) == 1:
            str_month = '0'+str_month

        search = f'{year}-{str_month}-'
        emotions = Diary.objects.values_list('emotion', flat=True).filter(user=request.user.pk, created_date__contains=search)
        
        ret = []
        for emotion in emotions:
            ret.append(ciper.decrypt_str(emotion))

        data = {'emotions': ret}
        return Response(data, status=status.HTTP_200_OK)


# Get: 월별 일기 모아보기
class MonthDiary(GenericAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def get(self, request, year, month, format=None):
        # int형 month를 두자리 string형으로 변환
        str_month = str(month)
        if len(str_month) == 1:
            str_month = '0'+str_month

        search = f'{year}-{str_month}-'
        diaries = Diary.objects.filter(user=request.user.pk, created_date__contains=search)

        for diary in diaries:
            diary.title = ciper.decrypt_str(diary.title)
            diary.content = ciper.decrypt_str(diary.content)
            diary.emotion = ciper.decrypt_str(diary.emotion)

        serializer = DiarySerializer(diaries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)