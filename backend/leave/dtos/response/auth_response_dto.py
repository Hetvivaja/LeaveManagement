class AuthResponseDTO:

    @staticmethod
    def user_data(user):
        profile = getattr(user, 'profile', None)
        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'department': profile.department if profile else '',
            'is_active': user.is_active,
            'is_admin': user.is_staff,
        }

    @staticmethod
    def login_success(user,access_token,refresh_token):
        return {
            'success': True,
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': AuthResponseDTO.user_data(user),
        }
    
    @staticmethod
    def login_error(message='Invalid username or password!'):
        return {
            'success': False,
            'message': message,
        }
    
    @staticmethod
    def logout_success(message='Logout successful!'):
        return {
            'success': True,
            'message': message,
        }
