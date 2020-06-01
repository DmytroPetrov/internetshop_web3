from django.urls import path

from . import views

urlpatterns = [
    path('goods/<int:id>', views.GoodsAPIView.as_view()),
]