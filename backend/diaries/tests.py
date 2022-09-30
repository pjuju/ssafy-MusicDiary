from fileinput import filename
from urllib import response
from django.test import TestCase, Client
import json

from torch import rand

from .models import Diary
from accounts.models import User

from pathlib import Path
import os

# Create your tests here.


class DiaryTest(TestCase):
    def setUp(self):
        print("--------------- setUp -----------------")
        self.client = Client()
        if(self.client.login(email='apso123@test.com', password='apsotest')):
            print('login success!!!')
            return super().setUp()
        else:
            print('login fail!!!')
            return exit

    def test_get_diary_list(self):
        print("--------------- test_get_diary_list -----------------")
        response = self.client.get('/rest/diary/', content_type='application/json')
        # print(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
            

    def test_post_diary(self):
        print("--------------- test_post_diary -----------------")
        data = {
            'title': '테스트 제목',
            'content': '행복하다',
            'created_date': '2022-09-29',
            'images': [
                {'image_url': "test_url"}
            ]
        }
        response = self.client.post('/rest/diary/', json.dumps(data), content_type='application/json;charset=utf-8', follow=True)
        print(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)


    def test_patch_diary(self):
        import random
        print("--------------- test_patch_diary -----------------")
        data = {
            'title': '패치 테스트',
            'content': str(random.randrange(1, 1000))
        }
        response = self.client.patch('/rest/diary/5', json.dumps(data), content_type='application/json;charset=utf-8', follow=True)
        print('response content>>>> ', response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 202)


    def tearDown(self):
        print("--------------- tearDown -----------------")
        self.client.logout()
        return super().tearDown()


class S3Test(TestCase):
    def setUp(self):
        print("--------------- setUp -----------------")
        self.client = Client()
        if(self.client.login(email='apso123@test.com', password='apsotest')):
            print('login success!!!')
            return super().setUp()
        else:
            print('login fail!!!')
            return exit


    def test_image_upload(self):
        print("--------------- test_image_upload -----------------")
        BASE_DIR = Path(__file__).resolve().parent
        ROOT_DIR = os.path.dirname(BASE_DIR)
        file = {
            'image': open(os.path.abspath('./testfile/ryan.jpg'), 'rb')
        }
        header = {'HTTP_CONTENT_DISPOSITION': 'attachment; filename=ryan.jpg'}
        response = self.client.post('/rest/diary/image/', files=file, **header)
        url = response.content.decode('UTF-8').replace('"', '')
        print(url)
        self.assertEqual(response.status_code, 200)

        # print("--------------- test_image_delete -----------------")
        # data = {'image_url': url}
        # response = self.client.delete('/rest/diary/image/', json.dumps(data), content_type='application/json;charset=utf-8')
        # print(response.content.decode('UTF-8'))
        # self.assertEqual(response.status_code, 200)


    # def test_image_delete(self):
    #     print("--------------- test_image_upload -----------------")
    #     data = {'image_url': }
    #     response = self.client.delete('/rest/diary/image', json.dumps(), content_type='')
    #     print(response.content.decode('UTF-8'))
    #     self.assertEqual(response.status_code, 200)

    def tearDown(self):
        print("--------------- tearDown -----------------")
        self.client.logout()
        return super().tearDown()