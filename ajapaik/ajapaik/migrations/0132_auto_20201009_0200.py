# Generated by Django 2.2.16 on 2020-10-08 23:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ajapaik', '0131_auto_20200929_1617'),
    ]

    operations = [
        migrations.CreateModel(
            name='PhotoSceneSuggestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('scene', models.PositiveSmallIntegerField(blank=True, choices=[(0, 'Interior'), (1, 'Exterior')], null=True, verbose_name='Scene')),
                ('photo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ajapaik.Photo')),
                ('proposer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='photo_scene_suggestions', to='ajapaik.Profile'))
            ],
        ),
    ]
