from django.db import models

# Create your models here.

from User.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionManager
import regex


class OrderStatus(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class PaymentType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Order(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.DateTimeField(auto_now_add=True)
    acomplished = models.DateTimeField(null=True, blank=True)
    status = models.ForeignKey(OrderStatus, on_delete=models.DO_NOTHING)
    payment = models.ForeignKey(PaymentType, on_delete=models.DO_NOTHING)

class Tag(models.Model):
    name = models.CharField(max_length=50)
    isGroup = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Article(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    amount = models.IntegerField()
    behavior = models.TextField()
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.name

class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    article_id = models.ForeignKey(Article, on_delete=models.CASCADE)
    text = models.TextField()
    rate = models.DecimalField(max_digits=1, decimal_places=0)

class Goods(models.Model):
    depot = models.TextField()
    article = models.ForeignKey(Article, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)


