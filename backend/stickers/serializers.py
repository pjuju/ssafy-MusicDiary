from rest_framework import serializers
from .models import StickerPack, Sticker, UserSticker


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

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['stickerpacks'] = StickerPackSerializer(instance.sticker_pack).data
        return response


class StickerPackSerializer(serializers.ModelSerializer):
    stickers = StickerSerializer(many=True, read_only=True)

    class Meta:
        model = StickerPack
        fields = '__all__'