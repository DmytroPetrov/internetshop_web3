# Generated by Django 3.0.5 on 2020-06-04 16:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rest_back', '0007_auto_20200604_1604'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='img_url',
        ),
    ]