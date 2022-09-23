from django.shortcuts import get_object_or_404, get_list_or_404

from .serializers import DiaryMusicSerializer, DiarySerializer, BookmarkSerializer, DiaryStickerSerializer, DiaryImageSerializer, ImageSerializer
from .models import Bookmark, Diary, DiaryMusic, DiaryImage
from django.views.generic import View

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view

import base64
from Crypto import Random
from Crypto.Cipher import AES
import hashlib

from django.conf import settings
from .storages import FileUpload, s3_client


import random

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

# Get: 일기 전체 리스트 보기
# Post: 일기 작성
class DiaryList(GenericAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def get(self, request, format=None):
        diaries = get_list_or_404(Diary, user=request.user.pk)
        for diary in diaries:
            diary.title = self.ciper.decrypt_str(diary.title)
            diary.content = self.ciper.decrypt_str(diary.content)
            diary.emotion = self.ciper.decrypt_str(diary.emotion)

        serializer = DiarySerializer(diaries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        newPost = dict()
        newPost['user'] = request.user.pk
        newPost['title'] = self.ciper.encrypt_str(request.data['title'])
        newPost['content'] = self.ciper.encrypt_str(request.data['content'])

        if ('emotion' in request.data) and (request.data['emotion']!=""):
            # 명시된 감정이 있을 경우
            emotion = request.data['emotion']
        else:   
            # 명시된 감정이 없을 경우 텍스트 분석으로 감정 도출
            emotion = self.stubEmotion()

        newPost['emotion'] = self.ciper.encrypt_str(emotion)
        diarySerializer = DiarySerializer(data=newPost)

        if diarySerializer.is_valid(raise_exception=True):
            diarySerializer.save()
            # 방금 등록된 일기의 id 값
            diary_id = diarySerializer.data['id']

            # 일기에 첨부된 이미지가 있을 경우
            if ('images' in request.data) and (request.data['images']!=""):
                # 이미지 리스트
                images = str(request.data['images']).split(',')
                image = {'diary': diary_id, 'image_url': ''}

                # 각각의 이미지를 image 테이블에 넣어줌
                for url in images:
                    image['image_url'] = url
                    diaryImageSerializer = DiaryImageSerializer(data=image)
                    if diaryImageSerializer.is_valid(raise_exception=True):
                        diaryImageSerializer.save()

            # 일기에 첨부된 스티커가 있을 경우
            if ('stickers' in request.data) and (request.data['stickers']!=""):
                # 스티커 리스트
                stickers = request.data['stickers']
                sticker = {'diary': diary_id}
                # sticker = {'diary': diary_id, 'sticker': '', 'sticker_x': '', 'sticker_y': ''}

                # 각각의 스티커를 sticker 테이블에 넣어줌
                for stckr in stickers:
                    sticker['sticker'] = stckr['sticker_id']
                    sticker['sticker_x'] = stckr['sticker_x']
                    sticker['sticker_y'] = stckr['sticker_y']
                    diarystickerSerializer = DiaryStickerSerializer(data=sticker)
                    if diarystickerSerializer.is_valid(raise_exception=True):
                        diarystickerSerializer.save()
            
            serializer = DiarySerializer(Diary.objects.get(pk=diary_id))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def stubEmotion(self):
        emotion = random.randrange(1,5)
        if emotion==1:
            return "sad"
        elif emotion==2:
            return "happy"
        elif emotion==3:
            return "angry"
        else:
            return "depressed"


class ImageDetail(GenericAPIView):
    serializer_class = ImageSerializer
    def post(self, request, format=None):
        file = request.FILES['image']
        profile_image_url = FileUpload(s3_client).upload(file)
        if profile_image_url != None:
            return Response(profile_image_url, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, format=None):
        file_id = request.data['file_id']
        print(file_id)
        ret = FileUpload(s3_client).delete(file_id)
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
        diary.title = self.ciper.decrypt_str(diary.title)
        diary.content = self.ciper.decrypt_str(diary.content)
        diary.emotion = self.ciper.decrypt_str(diary.emotion)
        serializer = DiarySerializer(diary)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        newPost = dict()       
        newPost['title'] = self.ciper.encrypt_str(request.data['title'])
        newPost['content'] = self.ciper.encrypt_str(request.data['content'])
        newPost['emotion'] = self.ciper.encrypt_str(request.data['emotion'])
        
        serializer = DiarySerializer(diary, data=newPost)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def patch(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        
        newPost = dict()       
        newPost['title'] = self.ciper.encrypt_str(request.data['title'])
        newPost['content'] = self.ciper.encrypt_str(request.data['content'])
        newPost['emotion'] = self.ciper.encrypt_str(request.data['emotion'])

        serializer = DiarySerializer(Diary, data=diary, partial=True)


    def delete(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        diary.delete()
        data = {'delete': f'데이터 {diary_pk}번이 삭제되었습니다.'}
        return Response(data, status=status.HTTP_204_NO_CONTENT)


# Get: 일기별 플레이리스트 조회
# Post: 일기별 플레이리스트 생성
@api_view(['GET', 'POST'])
def DiaryMusicDetail(request, diary_pk):
    if request.method == 'GET':
        playlist = get_list_or_404(DiaryMusic, diary=diary_pk)
        serializer = DiaryMusicSerializer(playlist, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        diary = get_object_or_404(Diary, pk=diary_pk)
        emotion = ciper.decrypt_str(diary.emotion)
        playlist = stubPlaylist(emotion)

        data={'diary': diary_pk, 'music': ''}
        for music in playlist:
            data['music'] = music
            serializer = DiaryMusicSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
        return Response(playlist, status=status.HTTP_201_CREATED)


def stubPlaylist(emotion):
    # Todo: diary_pk 일기의 추천 음악 id를 list로 반환
    if emotion=='happy':
        list = [1, 2]
    elif emotion=='sad':
        list = [6, 8]
    else:
        list = [10, 11]
    return list


# Get: 모든 책갈피 모아보기
class BookmarkList(GenericAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def get(self, request, format=None):
        bookmark = get_list_or_404(Bookmark, user=request.user.pk)
        serializer = BookmarkSerializer(bookmark, many=True)
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
            serializer = BookmarkSerializer(data=bookmark)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        if bookmark != None:
            print(bookmark)
            data = {'post': '이미 책갈피로 등록된 게시물입니다.'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, diary_pk, format=None):
        bookmark = get_object_or_404(Bookmark, user=request.user.pk, diary=diary_pk)
        bookmark.delete()
        data = {'delete': f'데이터 {diary_pk}번이 삭제되었습니다.'}
        return Response(data, status=status.HTTP_204_NO_CONTENT)


# Get: 월별 일기 감정 조회
@api_view(['GET'])
def monthEmotion(request, month):
    # int형 month를 두자리 string형으로 변환
    str_month = str(month)
    if len(str_month) == 1:
        str_month = '0'+str_month

    emotions = Diary.objects.values_list('emotion', flat=True).filter(created_date__month=str_month)

    for emotion in emotions:
        emotion = ciper.decrypt_str(emotion)

    data = {'emotions': emotions}
    return Response(data, status=status.HTTP_200_OK)


# Get: 월별 일기 모아보기
@api_view(['GET'])
def monthDiary(request, month):
    # int형 month를 두자리 string형으로 변환
    str_month = str(month)
    if len(str_month) == 1:
        str_month = '0'+str_month

    diaries = Diary.objects.filter(created_date__month=str_month)

    for diary in diaries:
        diary.title = ciper.decrypt_str(diary.title)
        diary.content = ciper.decrypt_str(diary.content)
        diary.emotion = ciper.decrypt_str(diary.emotion)

    serializer = DiarySerializer(diaries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)