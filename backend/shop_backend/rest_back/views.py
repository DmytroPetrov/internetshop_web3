from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import Article, Tag, User, Order, OrderStatus, PaymentType, Goods
from django.http import JsonResponse
from .serializers import ArticleSerializer, TagSerializer, OrderSerializer

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

class OrderAPIView(APIView):
    def post(self, request, user_id):
        user = User.objects.filter(user_id=user_id).first()
        
        if user:
            art = Article.objects.filter(id=request.data['article']).first()
            if art:
                status = OrderStatus.objects.filter(id=request.data['status']).first()
                payment = PaymentType.objects.filter(id=request.data['payment']).first()
                goods = Goods.objects.filter(article=art).first()

                if status and payment and goods:
                    ord = Order.objects.create(user_id=user, status=status, payment=payment)
                    goods.order = ord
                    goods.save()
                    return JsonResponse({'msg': 'OK'}, status=200)
        return JsonResponse({'msg': 'Order error'}, status=404)

    def get(self, request, user_id):
        user = User.objects.filter(user_id=user_id).first()
        
        if user:
            orders = Order.objects.filter(user_id=user).values_list('id', flat=True)
            if orders:
                goods = Goods.objects.filter(order__in=orders).values_list('article', flat=True)
                
                if goods:
                    arts = Article.objects.filter(id__in=goods)

                    serial = ArticleSerializer(arts, many=True)
                    if serial:
                        return JsonResponse({'articles': serial.data}, status=200)
        return JsonResponse({'msg': 'Order error'}, status=404)

    # def delete(self, request, user_id):
    #     user = User.objects.filter(user_id=user_id).first()
        
    #     if user:
    #         art = Article.objects.filter(id=request.data['article']).first()
    #         if art:
    #             status = OrderStatus.objects.filter(id=request.data['status']).first()
    #             payment = PaymentType.objects.filter(id=request.data['payment']).first()
    #             goods = Goods.objects.filter(article=art).first()

    #             if status and payment and goods:
    #                 ord = Order.objects.create(user_id=user, status=status, payment=payment)
    #                 goods.order = ord
    #                 goods.save()
    #                 return JsonResponse({'msg': 'OK'}, status=200)
    #     return JsonResponse({'msg': 'Order error'}, status=404)