from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionManager
import regex

class MyUserManager(BaseUserManager):
  def create_user(self, email, password):
    if not email:
      raise ValueError("User must have an email address")
    if not password:
      raise ValueError("User must have an password")
    if len(password) < 4:
      raise ValueError("password must be at least 4 characters")

    user = self.model(
      email = self.normalize_email(email)
    )

    user.set_password(password)
    user.save(using=self._db)
    return user
  
  def addUsername(user, username):
    if not username:
      raise ValueError("User must have an username")
    if not regex.match("[^ @]*",username):
      raise ValueError("username must be valid")
    user.username = username
    user.save()
    return user

  def create_superuser(self, email, password):
    user = self.create_user(
      email=self.normalize_email(email),
      password = password
    )
    user.is_admin = True
    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)
    return user



class User(AbstractBaseUser):
  user_id = models.AutoField(primary_key = True )
  username = models.CharField(max_length=30, default="")
  email = models.EmailField(verbose_name="email", max_length=60, unique= True)
  password = models.CharField(max_length=32)

  date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
  last_login = models.DateTimeField(verbose_name='last login',auto_now=True)
  is_admin = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)

  USERNAME_FIELD ='email'
  EMAIL_FIELD = 'email'

  object = MyUserManager()
  objects = PermissionManager()

  def __str__(self):
    return self.username

  def has_perm(self, perm , obj=None):
    return self.is_admin

  def has_module_perms(self, app_label):
    return True

# --------------------------------------------------------------#

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


