from rest_framework import serializers
from .models import OrderStatus, PaymentType, Order, Article, Comment, Tag, Goods

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'name', 'price', 'img_url', 'amount', 'behavior', 'description']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user_id', 'ordered', 'acomplished', 'status', 'payment']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'isGroup', 'img_url']
