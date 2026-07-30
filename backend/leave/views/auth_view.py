from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from leave.dtos import LoginRequsetDTO, AuthResponseDTO,SignupRequestDto

class LoginView(APIView):
     permission_classes = [AllowAny]
     
     def post(self,request):
          dto=LoginRequsetDTO.from_requset(request.data)

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

class SignupView(APIView):
     permission_classes=[AllowAny]

     def post(self,request):
          dto=SignupRequestDto.from_request(request.data)
          errors=dto.validate()

          if errors:
               return Response(
                    {'success': False, 'message': errors},
                    status=status.HTTP_400_BAD_REQUEST
               )
          # Check username already exists
          if User.objects.filter(username=dto.username).exists():
               return Response(
                    {'success': False, 'message': 'Username already exists!'},
                    status=status.HTTP_400_BAD_REQUEST
                    )
           # Check email already exists
          if User.objects.filter(email=dto.email).exists():
            return Response(
                {'success': False, 'message': 'Email already exists!'},
                status=status.HTTP_400_BAD_REQUEST
               )
          # Create User
            user = User.objects.create_user(
            username   = dto.username,
            password   = dto.password,
            email      = dto.email,
            first_name = dto.first_name,
            last_name  = dto.last_name,
          )
            # Create Token
            refresh=RefreshToken.for_user(user)
            return Response({
                    'success'       : True,
                    'message'       : 'Account created successfully!',
                    'access_token'  : str(refresh.access_token),
                    'refresh_token' : str(refresh),
                    'user': {
                    'id'       : user.id,
                    'username' : user.username,
                    'email'    : user.email,
                    'is_admin' : user.is_staff,
                    }
            },status=status.HTTP_201_CREATED)

class AdminUserListView(APIView):
     
     permission_classes=[IsAuthenticated]

     def get(self,request):
          if not request.user.is_staff:
            return Response(
                {'error': 'Permission denied!'},
                status=status.HTTP_403_FORBIDDEN
            )
          users = User.objects.all().values(
            'id', 'username', 'email',
            'first_name', 'last_name',
            'is_staff', 'is_active',
            'date_joined'
          )
          return Response({
            'success': True,
            'count'  : len(list(users)),
            'data'   : list(users)
          })    

class AdminUserDetailView(APIView):
     permission_classes=[IsAuthenticated]

     def patch(self,request,user_id):
           if not request.user.is_staff:
            return Response(
                {'error': 'Permission denied!'},
                status=status.HTTP_403_FORBIDDEN
            )
           try:
               user        = User.objects.get(id=user_id)
               new_password = request.data.get('password')
               is_active    = request.data.get('is_active')
               is_staff     = request.data.get('is_staff')

               if new_password:
                user.set_password(new_password)
               if is_active is not None:
                user.is_active = is_active
               if is_staff is not None:
                user.is_staff = is_staff

               user.save()
               return Response({
                'success': True,
                'message': f"User '{user.username}' updated!"
            })
           except User.DoesNotExist:
               return Response(
                {'error': 'User not found!'},
                status=status.HTTP_404_NOT_FOUND
            )  
     def delete(self,request,user_id):
         if not request.user.is_staff:
            return Response(
                {'error': 'Permission denied!'},
                status=status.HTTP_403_FORBIDDEN
            )
         try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({
                'success': True,
                'message': 'User deleted!'
            })
         except User.DoesNotExist:
            return Response(
                {'error': 'User not found!'},
                status=status.HTTP_404_NOT_FOUND
            )      
