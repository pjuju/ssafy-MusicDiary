from warnings import catch_warnings
from django.shortcuts import get_object_or_404, get_list_or_404

from diaries import serializers

from .serializers import StickerPackSerializer, StickerSerializer, UserStickerSerializer
from .models import StickerPack, Sticker, UserSticker

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

# Create your views here.

# Get: 전체 스티커팩 조회
class StickerPackList(GenericAPIView):
    queryset = StickerPack.objects.all()
    serializer_class = StickerPackSerializer

    def get(self, request, format=None):
        stickerpacks = get_list_or_404(StickerPack)
        serializer = StickerPackSerializer(stickerpacks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    # def post(self, request, format=None):
    #     # request.data = {
    #     #   name: "",
    #     #   price: "",
    #     #   sticker: ["..", ".."]
    #     # }
    #     newStickerPack = {
    #         'name': request.data['name'],
    #         'price': request.data['price']
    #     }
    #     serializer = StickerSerializer(data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)


# Get: 특정 스티커팩 전체 스티커 조회
class StickerPackDetail(GenericAPIView):
    queryset = Sticker.objects.all()
    serializer_class = StickerPackSerializer

    def get(self, request, stickerpack_id, format=None):
        stickers = get_list_or_404(Sticker, sticker_pack=stickerpack_id)
        serializer = StickerSerializer(data=stickers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Get: 특정 스티커 조회
class StickerDetail(GenericAPIView):
    queryset = Sticker.objects.all()
    # serializer_class = StickerPackSerializer

    def get(self, request, sticker_id, format=None):
        sticker = get_object_or_404(Sticker, pk=sticker_id)
        serializer = StickerSerializer(data=sticker)
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
        sticker_pack = request.data['sticker_pack']
        try:
            sticker = UserSticker.objects.get(sticker_pack=sticker_pack, user=user_id)
        except:
            data = {'sticker_pack': sticker_pack, 'user': user_id}
            serializer = UserStickerSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        if sticker != None:
            data = {'post': '이미 구매한 항목입니다.'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
