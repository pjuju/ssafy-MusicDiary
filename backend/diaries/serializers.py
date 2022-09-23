from rest_framework import serializers
from .models import Bookmark, Diary, DiaryMusic, DiaryImage, DiarySticker, Image

class DiarySerializer(serializers.ModelSerializer):
    diaryimage_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    diarymusic_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    diarysticker_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Diary
        exclude = ['user']
        

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        exclude = ['user']
        read_only_field = {'diary',},


class DiaryMusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryMusic
        fields = '__all__'
        read_only_field = {'diary',},


class DiaryStickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiarySticker
        fields = '__all__'
        read_only_field = {'diary',},


class DiaryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryImage
        read_only_field = {'diary',},
        

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'