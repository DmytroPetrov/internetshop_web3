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


