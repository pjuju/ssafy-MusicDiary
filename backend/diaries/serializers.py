from rest_framework import serializers
from .models import Bookmark, Diary, Image

class DiarySerializer(serializers.ModelSerializer):
    image_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # bookmark_set = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

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