from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import Bookmark, Diary, DiaryMusic, DiaryImage, DiarySticker, Image
from stickers.serializers import StickerSerializer
from musics.serializers import MusicSerializer


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
        read_only_field = {'diary',},
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['diary'] = DiarySerializer(instance.diary).data
        return response


class DiaryMusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryMusic
        fields = '__all__'
        read_only_field = {'diary',},

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['music'] = MusicSerializer(instance.music).data
        return response


class DiaryStickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiarySticker
        fields = '__all__'
        read_only_field = {'diary',},

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['sticker'] = StickerSerializer(instance.sticker).data
        return response


class DiaryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryImage
        fields = '__all__'
        read_only_field = {'diary',},
        

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class DiarySerializer(serializers.ModelSerializer):
    images = DiaryImageSerializer(many=True, read_only=True)
    stickers = DiaryStickerSerializer(many=True, read_only=True)

    class Meta:
        model = Diary
        fields = '__all__'