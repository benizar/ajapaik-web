# Generated by Django 2.2.16 on 2020-10-11 16:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ajapaik_face_recognition', '0105_auto_20201011_1914'),
    ]

    operations = [
        migrations.RenameField(
            model_name='facerecognitionrectanglesubjectdatasuggestion',
            old_name='guesser',
            new_name='proposer',
        ),
    ]
