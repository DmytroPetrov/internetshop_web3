from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import Article, Tag
from django.http import JsonResponse
from .serializers import ArticleSerializer, TagSerializer

# Create your views here.

class GoodsAPIView(APIView):
    def get(self, request, id):
        art = Article.objects.filter(id=id).first()
        serial = ArticleSerializer(art)
        if art:
            return JsonResponse(serial.data, status=200)
        return JsonResponse({'msg': 'Nothing'}, status=404)

class GroupAPIView(APIView):
    def get(self, request, group_id):
        art = Article.objects.filter(tags__id=group_id)
        if art:
            serial = ArticleSerializer(art, many=True)
            if serial:
                return JsonResponse({'articles': serial.data}, status=200)
        return JsonResponse({'msg': 'Nothisng'},status = 404)

class TagAPIView(APIView):
    def get(self, request):
        tags = Tag.objects.filter(isGroup=True)
        if tags:
            serial = TagSerializer(tags, many=True)
            if serial:
                return JsonResponse({'groups': serial.data}, status=200)
        return JsonResponse({'msg': 'Nothisng'},status = 404)

class TagListAPIView(APIView):
    def get(self, request):
        tags = Tag.objects.filter()
        if tags:
            serial = TagSerializer(tags, many=True)
            if serial:
                return JsonResponse({'groups': serial.data}, status=200)
        return JsonResponse({'msg': 'Nothisng'},status = 404)