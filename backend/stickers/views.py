from warnings import catch_warnings
from django.shortcuts import get_object_or_404, get_list_or_404

from stickers import serializers
from accounts.models import User

from .serializers import StickerPackSerializer, StickerSerializer, UserStickerSerializer
from .models import StickerPack, Sticker, UserSticker

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view

# Create your views here.

# Get: 전체 스티커팩 조회
class StickerPackList(GenericAPIView):
    queryset = StickerPack.objects.all()
    serializer_class = StickerPackSerializer

    def get(self, request, format=None):
        stickerpacks = get_list_or_404(StickerPack)
        serializer = StickerPackSerializer(stickerpacks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, format=None):
        newStickerPack = {
            'name': request.data['name'],
            'price': request.data['price'],
            'user': request.data.get('user', request.user.pk)
        }
        serializer = StickerPackSerializer(data=newStickerPack)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# Get: 특정 스티커팩 전체 스티커 조회
class StickerPackDetail(GenericAPIView):
    queryset = StickerPack.objects.all()
    serializer_class = StickerPackSerializer

    def get(self, request, stickerpack_id, format=None):
        stickerpack = get_object_or_404(StickerPack, pk=stickerpack_id)
        serializer = StickerPackSerializer(stickerpack)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Get: 특정 스티커 조회
class StickerDetail(GenericAPIView):
    queryset = Sticker.objects.all()
    serializer_class = StickerPackSerializer

    def get(self, request, sticker_id, format=None):
        sticker = get_object_or_404(Sticker, pk=sticker_id)
        serializer = StickerSerializer(sticker)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserStickerDetail(GenericAPIView):
    queryset = UserSticker.objects.all()
    serializer_class = UserStickerSerializer

    def get(self, request, user_id, format=None):
        stickers = get_list_or_404(UserSticker, user=user_id)
        # print(stickers)
        serializer = UserStickerSerializer(stickers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, user_id, format=None):
        stickerPack_pk = request.data['sticker_pack']

        try:
            user = get_object_or_404(User, pk=user_id)
            stickerPack = get_object_or_404(StickerPack, pk=stickerPack_pk)
            # 포인트가 부족하지 않은지 체크
            if user.point < stickerPack.price:
                return Response({'error': '포인트가 부족합니다'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response({'error': '유효하지 않은 user_pk와 stickerpack_pk 입니다'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 이미 구매한 스티커 팩인지 체크
            sticker = UserSticker.objects.get(sticker_pack=stickerPack_pk, user=user_id)
        except:
            # 구매한 적 없음 (구매 성공)
            data = {'sticker_pack': stickerPack_pk, 'user': user_id}
            serializer = UserStickerSerializer(data=data)
            # Todo: 사용자 포인트 차감
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                user.point -= stickerPack.price
                user.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        # 이미 구매한 스티커팩 (구매 실패)
        data = {'error': '이미 구매한 항목입니다.'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST',])
def KakaoPay(request,user_id):
    user = get_object_or_404(User, id=user_id)
    charge = request.POST.get('charge')
    user.point += int(charge)
    user.save()
    return Response(status=status.HTTP_200_OK)
