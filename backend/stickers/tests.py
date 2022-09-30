import email
from django.urls import reverse
from django.test import TestCase, Client
import json

from stickers.views import StickerPackList
from .models import Sticker, StickerPack, UserSticker
from accounts.models import User

# Create your tests here.


class SPListTest(TestCase):
    def setUp(self) -> None:
        user = User.objects.create_user('temporary@test.com', 'temporary')
        print("create user success!!!")
        self.client = Client()
        return super().setUp()


    def test_get_sticker_pack_list(self):
        data = [
            {
                "id": 1,
                "stickers": [
                {
                    "id": 4,
                    "image_url": "https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/6307e4c5-3e5f-42b0-877d-b4aba1a49c51",
                    "sticker_pack": 1
                },
                {
                    "id": 3,
                    "image_url": "https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/77140afd-8e2a-4744-8182-61996ec15c3d",
                    "sticker_pack": 1
                },
                {
                    "id": 2,
                    "image_url": "https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/7bd73766-eb07-47bb-9c70-a5eceea6134f",
                    "sticker_pack": 1
                },
                {
                    "id": 1,
                    "image_url": "https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/c21ea845-cf10-43d4-8a54-fd9496dbc4c1",
                    "sticker_pack": 1
                }
                ],
                "name": "춘식팩",
                "price": 120,
                "user": 3
            },
            {
                "id": 3,
                "stickers": [],
                "name": "테스트팩",
                "price": 90,
                "user": 1
            },
            {
                "id": 4,
                "stickers": [],
                "name": "빈스티커팩",
                "price": 0,
                "user": 5
            }
            ]
        
        if(self.client.login(email='temporary@test.com', password='temporary')):
            print('login success!!!')
            # response = self.client.post('/sticker/pack/'+1)
            response = self.client.get('/rest/sticker/pack/', content_type='application/json')
            print(response.content.decode('UTF-8'))
            self.assertEqual(response.status_code, 201)
            self.assertEqual(response.json(), data)
        else:
            print('login fail!!!')

    def test_post_sticker_pack(self):
        data = {
            'name': '유닛테스트팩',
            'price': 30,
            'user': 5
        }
        self.client.login(email='temporary@test.com', password='temporary')
        response = self.client.post('/rest/sticker/pack/', json.dumps(data), content_type='application/json;charset=utf-8')
        print(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {
            'name': '유닛테스트팩',
            'price': 30,
            'user': 5
        })

    def tearDown(self) -> None:
        self.client.logout()
        return super().tearDown()