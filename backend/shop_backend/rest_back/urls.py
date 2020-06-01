from django.urls import path

from . import views

urlpatterns = [
    path('goods/<int:id>', views.GoodsAPIView.as_view()),
    path('goods/group/<int:group_id>', views.GroupAPIView.as_view())
]