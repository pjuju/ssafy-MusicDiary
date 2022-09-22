from rest_framework import serializers
from .models import StickerPack, Sticker, UserSticker

class StickerPackSerializer(serializers.ModelSerializer):
    sticker_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = StickerPack
        fields = '__all__'


class StickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = '__all__'
        read_only_field = {'sticker_pack',},


class UserStickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSticker
        fields = '__all__'
        read_only_field = {'sticker_pack',}