from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from leave.services import LeaveService

service=LeaveService()

# 1-Get All Leave plus new Approved Leave
class LeaveListView(APIView):
    permission_classes=[IsAuthenticated]

    # Get All the Leave
    def get(self,request):
      
      # Admin: View all leave requests.
      # Employee: View only their own leave requests.
      if request.user.is_staff:
         data=service.get_all_leaves()
      else:
         data=service.get_employee_leaves(request.user.id)
      return Response(data,status=status.HTTP_200_OK)
    
    # Post All Leave
    def post(self,request):
       data=service.apply_leave(request.user,request.data)
       if 'error'in data:
          return Response(data,status=status.HTTP_400_BAD_REQUEST)
       return self.response(data,status=status.HTTP_201_CREATED)

# 2-Single Leave - Get, Approve, Reject, Delete  
class LeaveDetailView(APIView):
   permission_classes=[IsAuthenticated]

   # Get Single Leave
   def get(self,request,leave_id):
      data=service.get_leave_by_id(leave_id)
      if not data:
         return Response(
            {'error': 'Leave not found!'},
            status=status.HTTP_404_NOT_FOUND
            )
      return Response(data,status=status.HTTP_200_OK)
   

    # Delete Leave
   def delete(self,request,leave_id):
      data=service.delete_leave(leave_id)
      if 'error'in data:
         return Response(data,status=status.HTTP_404_NOT_FOUND)
      return Response(data,status=status.HTTP_200_OK)
   
# 3-Leave Approved
class LeaveApprovedView(APIView):
   permission_classes=[IsAuthenticated]

   def patch(self,request,leave_id):
      
      # Only approved the leave Admin
      if not request.user.is_staff:
         return Response(
            {'error': 'Only admin can approve leaves!'},
            status=status.HTTP_403_FORBIDDEN
         )
      data=service.approve_leave(leave_id)
      return Response(data,status=status.HTTP_200_OK)
   
# 4-Leave Reject
class LeaveRejectView(APIView):
   permission_classes=[IsAuthenticated]

   def patch(self,request,leave_id):
      
      # Only reject the leave Admin
        if not request.user.is_staff:
          return Response(
            {'error': 'Only admin can reject leaves!'},
            status=status.HTTP_403_FORBIDDEN
         )
        data=service.reject_leave(leave_id)
        return Response(data,status=status.HTTP_200_OK)

    