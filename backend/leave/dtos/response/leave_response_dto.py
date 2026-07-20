class LeaveResponseDTO:
        
        @staticmethod
        def success(data,message='Success!'):
                return {
                        'success': True,
                        'message': message, 
                        'data': data,
                }
        
        @staticmethod
        def error(message='Somthing went wrong!'):
                return {
                        'success': False,
                        'message': message, 
                        'data': None,
                }
        
        @staticmethod
        def list_response(data):
                return {
                        'success': True,
                        'count': len(data), 
                        'data': data,
                }
                