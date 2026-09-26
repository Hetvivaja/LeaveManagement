from leave.dtos import LeaveRequestDTO, LeaveResponseDTO
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from leave.services import LeaveService

service=LeaveService()

class LeaveListView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
      if request.user.is_staff:
         data=service.get_all_leaves()
      else:
         data=service.get_employee_leaves(request.user.id)
         
      return Response(LeaveResponseDTO.list_response(data),
                      status=status.HTTP_200_OK)
    
    def post(self,request):
       
       dto=LeaveRequestDTO.from_method(request.data)
       errors=dto.validate()

       if errors:
          return Response(LeaveResponseDTO.error(errors),
                          status=status.HTTP_400_BAD_REQUEST)

       data=service.apply_leave(request.user,request.data)
       
       if 'error'in data:
          return Response(LeaveResponseDTO.error(data['error']),
                          status=status.HTTP_400_BAD_REQUEST)
       
       return Response(LeaveResponseDTO.success(data,'Leave Applied!'),
                      status=status.HTTP_201_CREATED)

class LeaveDetailView(APIView):
   permission_classes=[IsAuthenticated]

   def get(self,request,leave_id):
      data=service.get_leave_by_id(leave_id)
      if not data:
         return Response(
            {'error': 'Leave not found!'},
            status=status.HTTP_404_NOT_FOUND
            )
      if not request.user.is_staff and data['employee'] != request.user.id:
         return Response({'error': 'You are not authorized to view this leave!'}, status=status.HTTP_403_FORBIDDEN)
      return Response(data,status=status.HTTP_200_OK)
   

   def delete(self,request,leave_id):
      leave = service.get_leave_by_id(leave_id)
      if not leave:
         return Response(
            {'error': 'Leave not found!'},
            status=status.HTTP_404_NOT_FOUND
         )
      
      if not request.user.is_staff and leave['employee']!=request.user.id:
         return Response(
            {'error': 'You are not authorized to delete this leave!'},
            status=status.HTTP_403_FORBIDDEN
         )
      if not request.user.is_staff and leave['status'] != 'pending':
         return Response({'error': 'Only pending leave requests can be deleted!'}, status=status.HTTP_400_BAD_REQUEST)
      data=service.delete_leave(leave_id)
      return Response(data,status=status.HTTP_200_OK)
   
class LeaveApprovedView(APIView):
   permission_classes=[IsAuthenticated]

   def patch(self,request,leave_id):
      
      if not request.user.is_staff:
         return Response(
            {'error': 'Only admin can approve leaves!'},
            status=status.HTTP_403_FORBIDDEN
         )
      data=service.approve_leave(leave_id)
      if 'error' in data:
         return Response(data, status=status.HTTP_404_NOT_FOUND)
      return Response(data,status=status.HTTP_200_OK)
   
class LeaveRejectView(APIView):
   permission_classes=[IsAuthenticated]

   def patch(self,request,leave_id):
      
      if not request.user.is_staff:
         return Response(
            {'error': 'Only admin can reject leaves!'},
            status=status.HTTP_403_FORBIDDEN
         )
      data=service.reject_leave(leave_id)
      if 'error' in data:
         return Response(data, status=status.HTTP_404_NOT_FOUND)
      return Response(data,status=status.HTTP_200_OK)

