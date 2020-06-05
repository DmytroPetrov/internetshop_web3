from django.urls import path

from . import views

urlpatterns = [
    path('goods/<int:id>', views.GoodsAPIView.as_view()),
    path('goods/group/<int:group_id>', views.GroupAPIView.as_view()),
    path('goods/groups/', views.TagAPIView.as_view()),
    path('groups/', views.TagListAPIView.as_view()),
    path('user/<int:user_id>/order', views.OrderAPIView.as_view())
]