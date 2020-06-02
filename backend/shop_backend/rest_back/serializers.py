from rest_framework import serializers
from .models import OrderStatus, PaymentType, Order, Article, Comment, Tag, Goods

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'name', 'price', 'amount', 'behavior', 'description']