from django.shortcuts import get_object_or_404, get_list_or_404

from .serializers import DiarySerializer, BookmarkSerializer
from .models import Bookmark, Diary

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import datetime

# Get: 다이어리 목록 반환
# Post: 다이어리 작성
@api_view(['GET', 'POST'])
def diary(request):
    if request.method == 'GET':
        diary = Diary.objects.all()
        serializer = DiarySerializer(diary, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = DiarySerializer(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# Get: 일기 상세보기
# Put: 일기 수정
# Delete: 일기 삭제
@api_view(['GET', 'PUT', 'DELETE'])
def diary_detail(request, diary_pk):
    diary = get_object_or_404(Diary, pk=diary_pk)

    if request.method == 'GET':
        serializer = DiarySerializer(diary)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = DiarySerializer(diary, request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    elif request.method == 'DELETE':
        diary.delete()
        data = {
            'delete': f'데이터 {diary_pk}번이 삭제되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)


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

#     elif request.method == 'POST':
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
        bookmark = Bookmark.objects.all()
        serializer = BookmarkSerializer(bookmark, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = BookmarkSerializer(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# Delete: 북마크 삭제
@api_view(['DELETE'])
def bookmark_detail(request, bookmark_pk):
    bookmark = get_object_or_404(Bookmark, pk=bookmark_pk)
    bookmark.delete()
    data = {
        'delete': f'데이터 {bookmark_pk}번이 삭제되었습니다.'
    }
    return Response(data, status=status.HTTP_204_NO_CONTENT)


# Get: 월별 일기 감정 조회
@api_view(['GET'])
def monthEmotion():
    # now = datetime.now()
    # year = now.strftime("%Y")
    # month = now.strftime("%m")
    # emotions = Diary.objects.values_list('emotion', flat=True).filter(created_at__year=year, created_at__month=month)
    # serializer = BookmarkSerializer(emotions, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)
    pass


# Get: 월별 일기 모아보기
@api_view(['GET'])
def monthDiary():
    # # from datetime import date, timedelta
    # # diaries = Diary.objects.filter(created_at__range=[date.today() - timedelta(days=30), date.today]).values().all()
    # now = datetime.now()
    # year = now.strftime("%Y")
    # month = now.strftime("%m")
    # diaries = Diary.objects.filter(created_at__year=year, created_at__month=month)
    # serializer = BookmarkSerializer(diaries, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)
    pass