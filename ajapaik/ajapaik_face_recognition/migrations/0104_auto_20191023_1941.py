# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-10-23 16:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ajapaik', '0109_auto_20191023_1941'),
        ('ajapaik_face_recognition', '0103_auto_20191001_1753'),
    ]

    operations = [
        migrations.AddField(
            model_name='facerecognitionrectanglefeedback',
            name='alternative_subject',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ajapaik.Album'),
        ),
        migrations.AddField(
            model_name='facerecognitionrectanglefeedback',
            name='is_correct_person',
            field=models.NullBooleanField(),
        ),
        migrations.AlterField(
            model_name='facerecognitionrectangle',
            name='age',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(0, 'Laps'), (1, 'Täiskasvanu'), (2, 'Eakas'), (3, 'Tundmatu'), (4, 'Not Applicable')], null=True),
        ),
        migrations.AlterField(
            model_name='facerecognitionrectanglesubjectdataguess',
            name='age',
            field=models.PositiveSmallIntegerField(choices=[(0, 'Laps'), (1, 'Täiskasvanu'), (2, 'Eakas'), (3, 'Tundmatu'), (4, 'Not Applicable')], null=True),
        ),
    ]
