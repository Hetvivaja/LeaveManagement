from leave.repositories import LeaveRepository
from leave.serializers import LeaveSerializer

class LeaveService:

    def __init__(self):
        self.repo=LeaveRepository()

    def get_all_leaves(self):
        leaves=self.repo.get_all_leaves()
        return LeaveSerializer(leaves,many=True).data
    
    def get_employee_leaves(self,employee_id):
        leaves=self.repo.get_leaves_by_employee(employee_id)
        return LeaveSerializer(leaves,many=True).data

    def get_leave_by_id(self,leave_id):
        leave=self.repo.get_leaves_by_id(leave_id)
        if leave:
            return LeaveSerializer(leave).data
        return None
    
    def apply_leave(self,employee,data):
        # Business Rule: Start date end date se pehle honi chahiye
        if data['start_date']>data['end_date']:
            return{
                'error': 'Start date cannot be after end date!'
            }
        leave=self.repo.create_leaves(employee,data)
        return LeaveSerializer(leave).data
    
    def approve_leave(self,leave_id):
        leave=self.repo.update_leave_status(leave_id,'approved')
        if leave:
            return LeaveSerializer(leave).data
        return {'error': 'Leave not found!'}

    def reject_leave(self,leave_id):
        leave=self.repo.update_leave_status(leave_id,'rejected')
        if leave:
            return LeaveSerializer(leave).data
        return {'error': 'Leave not found!'}

    def delete_leave(self,leave_id):
        leave=self.repo.delete_leave_id(leave_id)
        if leave:
            return {'message': 'Leave deleted successfully!'}
        return {'error': 'Leave not found!'}