# import boto3
# import uuid

# from django.conf import settings

# class FileUpload:
#     def __init__(self, client):
#         self.client = client

#     def upload(self, file):
#         return self.client.upload(file)

#     def delete(self, image_id):
#         return self.client.delete(image_id)

# class MyS3Client:
#     def __init__(self, access_key, secret_key, bucket_name):
#         boto3_s3 = boto3.client(
#             's3',
#             aws_access_key_id = access_key,
#             aws_secret_access_key = secret_key
#         )
#         self.s3_client = boto3_s3
#         self.bucket_name = bucket_name

#     def upload(self, file):
#         try: 
#             file_id = str(uuid.uuid4())
#             extra_args = { 'ContentType' : file.content_type }

#             self.s3_client.upload_fileobj(
#                     file,
#                     self.bucket_name,
#                     file_id,
#                     ExtraArgs = extra_args
#                 )
#             return settings.AWS_S3_CUSTOM_DOMAIN + "/" + file_id
#         except:
#             return None

#     def delete(self, image_id):
#       try:
#         self.s3_client.delete_object(Bucket=self.bucket_name, Key=image_id)
#         return "SUCCESS"
#       except:
#         return "FAIL"


# # MyS3Client instance
# s3_client = MyS3Client(settings.AWS_ACCESS_KEY_ID, settings.AWS_SECRET_ACCESS_KEY, settings.AWS_STORAGE_BUCKET_NAME)