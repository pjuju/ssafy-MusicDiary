from dataclasses import field
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from rest_framework.validators import UniqueValidator

# class CustomTokenRefreshSerializer(serializers.Serializer):
#     refresh_token = serializers.CharField()

#     def validate(self, attrs):
#         refresh = RefreshToken(attrs['refresh_token'])
#         data = {'access_token': str(refresh.access_token)}

#         return data


from .models import User


from rest_framework import generics, status
from rest_framework.response import Response

    
class SignupSirializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required = True,
    ),
    password = serializers.CharField(
        required=True,
        write_only = True,
    )
    
    username = serializers.CharField(
        required=True,
        write_only = True,
    )
    
    sad = serializers.IntegerField(
        required=True,
        write_only = True,
    )
    
    angry = serializers.IntegerField(
        required=True,
        write_only = True,
    )
    
    depressed = serializers.IntegerField(
        required=True,
        write_only = True,
    )
    
    normal = serializers.IntegerField(
        required=True,
        write_only = True,
    )
    
    image_url = serializers.CharField(
        write_only = True,
    )    
    password2 = serializers.CharField(write_only = True, required=True)
    
    class Meta:
        model = User
        fields = ('email','password','password2','username', 'sad', 'angry', 'depressed', 'normal', 'point', 'image_url')
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({
                "password" : "Pass word fields didn't match"
            })
        
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            point = validated_data['point'],
            sad = validated_data['sad'],
            angry = validated_data['angry'],
            depressed = validated_data['depressed'],
            normal = validated_data['normal'],
            image_url = validated_data['image_url']


            
        )
        token = RefreshToken.for_user(user)
        user.set_password(validated_data['password'])
        user.refreshtoken = token
        user.save()
    
        return user
    
    
    
class SigninSirializer(serializers.ModelSerializer):
    email = serializers.CharField(
        required = True,
        write_only = True
    )
    password = serializers.CharField(
        required = True,
        write_only = True,
        style= {'input_type' : 'password'}
    )
    class Meta(object):
        model = User
        fields = ('email', 'password')

    def validate(self, data):
        email = data.get('email',None)
        password = data.get('password',None)

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)

            if not user.check_password(password):
                raise serializers.ValidationError('Check Your Email or Password')
        
        else:
            raise serializers.ValidationError("User does not exist")
        

        token = RefreshToken.for_user(user=user)
        data = {
            'username' : user.username ,
            'email' : user.email,
            'sad' : user.sad,
            'depressed' : user.depressed,
            'normal' : user.normal,
            'point' : user.point,
            'angry' : user.angry,
            'user' : user.id,
            'token' : {
                'refresh_token' : str(token),
                'access_token' : str(token.access_token)    
            }
        }
        return data
    
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'

    # def update(self, instance, validated_data): 
    #     instance.username = validated_data.get('username', instance.username)
    #     return instance
        # instance.content = validated_data.get('content', instance.title)

# class UserUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = get_user_model()
#         fields = ('username',)

#     def update(self, instance, validated_data): 
#         instance.username = validated_data.get('username', instance.username)
#         # instance.content = validated_data.get('content', instance.title)

# user = get_user_model()
# class EmailUniqueCheckSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=user.objects.all())])

#     class Meta:
#         model = get_user_model()
#         fields = ('email')