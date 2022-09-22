# Generated by Django 3.2 on 2022-09-22 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stickers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stickerpack',
            name='name',
            field=models.CharField(max_length=60, unique=True),
        ),
        migrations.AddConstraint(
            model_name='sticker',
            constraint=models.UniqueConstraint(fields=('sticker_pack', 'image_url'), name='unique_sticker'),
        ),
        migrations.AddConstraint(
            model_name='usersticker',
            constraint=models.UniqueConstraint(fields=('user', 'sticker_pack'), name='unique_user_sticker'),
        ),
    ]
