from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class LoginView(APIView):
     permission_classes = [AllowAny]
     
     def post(self,request):
          username=request.data.get('username')
          password=request.data.get('password')

          # User Checked
          user=authenticate(username=username,password=password)
          if user is None:
               return Response(
                    {'error': 'Invalid username or password!'},
                    status=status.HTTP_401_UNAUTHORIZED
               )
          # To create Token
          refresh=RefreshToken.for_user(user)

          return Response({
                'access_token'  : str(refresh.access_token),
                'refresh_token' : str(refresh),
                'user': {
                'id'       : user.id,
                'username' : user.username,
                'email'    : user.email,
                'is_admin' : user.is_staff,
            }
          },status=status.HTTP_200_OK)
     
class LogoutView(APIView):
     permission_classes = [AllowAny]
     
     def post(self,request):
          try:
               refresh_token=request.data.get('refresh_token')
               token=RefreshToken(refresh_token)
               token.blacklist()
               return Response(
                    {'message': 'Logout successful!'},
                    status=status.HTTP_200_OK
               )
          except Exception:
               return Response(
                    {'error': 'Invalid token!'},
                    status=status.HTTP_400_BAD_REQUEST
               )