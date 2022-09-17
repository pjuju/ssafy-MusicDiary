from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import DiarySerializer
from .models import Diary
from diaries import serializers

# Get: 다이어리 목록 반환
# Post: 다이어리 작성
@api_view(['GET', 'POST'])
def create(request):
    if request.method == 'GET':
        diary = Diary.objects.all()
        serializer = DiarySerializer(diary, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = DiarySerializer(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# Get: 일기 상세보기
# Put: 일기 수정
@api_view(['GET', 'PUT'])
def detail(request, diary_pk):
    diary = get_object_or_404(Diary, pk=diary_pk)

    if request.method == 'GET':
        serializer = DiarySerializer(diary)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = DiarySerializer(diary, request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


#################################
# # Post: 스티커 부착
# @api_view(['POST'])
# def decorate():
#     pass
#################################


#################################
# # Get: 일기별 플레이리스트 조회
# # Post: 일기별 플레이리스트 생성
# @api_view(['GET', 'POST'])
# def playlist(request):
#     if request.method == 'GET':
#         diary = Diary.objects.all()
#         serializer = DiarySerializer(diary, many=True)
#         return Response(serializer.data)

#     if request.method == 'POST':
#         serializer = DiarySerializer(request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#################################


#################################
# Get: 일기별 스티커 조회
# @api_view(['GET'])
# def monthSticker():
#     pass
#################################


# Get: 책갈피 모아보기
# Post: 책갈피 생성
@api_view(['GET', 'POST'])
def bookmark(request):
    if request.method == 'GET':
        diary = Diary.objects.all()
        serializer = DiarySerializer(diary, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = DiarySerializer(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# Get: 월별 일기 감정 조회
@api_view(['GET'])
def monthEmotion():
    pass


# Get: 월별 일기 모아보기
@api_view(['GET'])
def monthDiary():
    pass