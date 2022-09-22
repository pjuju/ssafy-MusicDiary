from rest_framework import serializers
from .models import Bookmark, Diary, DiaryMusic, Image, DiarySticker

class DiarySerializer(serializers.ModelSerializer):
    image_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    diarymusic_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    diarysticker_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Diary
        fields = '__all__'
        

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
        read_only_field = {'diary',},
        

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
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