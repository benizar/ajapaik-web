# Generated by Django 2.2.16 on 2020-09-29 13:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ajapaik', '0130_auto_20200910_0237'),
    ]

    operations = [
        migrations.RenameModel('ImageSimilarityGuess', 'ImageSimilaritySuggestion'),
        migrations.RenameField(
            model_name='imagesimilaritysuggestion',
            old_name='guesser',
            new_name='proposer',
        ),
    ]
