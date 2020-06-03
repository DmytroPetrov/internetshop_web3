from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from User.models import User
from User.serializers import UserSerializer


class UserAPIView(APIView):

  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      user = User.object.create_user(serializer.data['username'], serializer.data['email'],serializer.data['password'])
      refresh = RefreshToken.for_user(user=user)
      return JsonResponse({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=201)
    return JsonResponse(serializer.errors, status=400)
  
  def get(self, request, user_id):
    user = User.object.filter(user_id=user_id).first()
    if user:
      serial = UserSerializer(user)
      if serial:
        return JsonResponse(serial.data, status=200)
    return JsonResponse({'msg': 'No such user'}, status=404)

  def delete(self, request, user_id):
    user = User.object.filter(user_id=user_id).first()
    if user:
      user.delete()
      
      return JsonResponse({'msg': 'OK'}, status=200)

    return JsonResponse({'msg': 'No such user'}, status=404)

  def patch(self, request, user_id):
    user = User.object.filter(user_id=user_id).first()
    if user:
      user.username = request.data['username']
      user.save()
      
      return JsonResponse({'msg': request.data['username']}, status=200)
      
    return JsonResponse({'msg': 'No such user'}, status=404)


