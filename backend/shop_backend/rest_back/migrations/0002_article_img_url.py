# Generated by Django 3.0.5 on 2020-06-04 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_back', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='img_url',
            field=models.TextField(blank=True, default=None),
        ),
    ]
