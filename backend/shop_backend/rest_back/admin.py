from django.contrib import admin

# Register your models here.

from .models import User, OrderStatus, PaymentType, Order, Article, Comment, Tag, Goods

admin.site.register(OrderStatus)
admin.site.register(PaymentType)
admin.site.register(Order)
admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(Goods)