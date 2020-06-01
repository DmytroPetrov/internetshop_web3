from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import Article, Tag
from django.http import JsonResponse
from .serializers import ArticleSerializer

# Create your views here.

class GoodsAPIView(APIView):
    def get(self, request, id):
        art = Article.objects.filter(id=id).first()
        serial = ArticleSerializer(art)
        if art:
            return JsonResponse(serial.data, status=200)
        return JsonResponse({'msg': 'Nothing'}, status=404)
