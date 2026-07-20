from leave.dtos import LoginRequsetDTO, AuthResponseDTO
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class LoginView(APIView):
     permission_classes = [AllowAny]
     
     def post(self,request):
          dto=LoginRequsetDTO.from_request(request.data)

          # Validate the DTO
          errors=dto.validate()
          if errors:
               return Response(
                    {'success': False,'message': errors},
                     status=status.HTTP_400_BAD_REQUEST)    

          # User Checked
          user=authenticate(username=dto.username,password=dto.password)
          if user is None:
               return Response(
                    AuthResponseDTO.login_error(),
                    status=status.HTTP_401_UNAUTHORIZED
               )
          # To create Token
          refresh=RefreshToken.for_user(user)

          return Response(
               AuthResponseDTO.login_success(user, str(refresh.access_token), str(refresh)),
               status=status.HTTP_200_OK
          )

class LogoutView(APIView):
     permission_classes = [AllowAny]
     
     def post(self,request):
          try:
               refresh_token=request.data.get('refresh_token')
               token=RefreshToken(refresh_token)
               token.blacklist()
               return Response(
                    AuthResponseDTO.logout_success(),
                    status=status.HTTP_200_OK
               )
          except Exception:
               return Response(
                   {'success':False,'message':'Invalid token!'},
                    status=status.HTTP_400_BAD_REQUEST
               )