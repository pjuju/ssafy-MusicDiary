from re import T
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import DiarySerializer
from .models import Diary

# Create your views here.

# class DiaryView(viewsets.ModelViewSet):
#     serializer_class = DiarySerializer
#     queryset = Diary.objects.all()

def create(request):
    pass