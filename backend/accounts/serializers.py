from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


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
    # password2 = serializers.CharField(write_only = True, required=True)
    
    class Meta:
        model = User
        fields = ('email','password','username', 'sad', 'angry', 'depressed', 'normal', 'point', 'image_url')
    
    def validate(self, data):
        # if data['password'] != data['password2']:
        #     raise serializers.ValidationError({
        #         "password" : "Pass word fields didn't match"
        #     })
        
        return data

    def create(self, validated_data):
        user = User.objects.create(
            email = validated_data['email']
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
            'user' : user.id,
            'refresh_token' : str(token),
            'access_token' : str(token.access_token)
        }
        return data
    