from leave.models import Leave

class LeaveRepository:

    def get_all_leaves(self):
        return Leave.objects.all()
    
    def get_leaves_by_employee(self,employee_id):
        return Leave.objects.filter(employee_id=employee_id)

    def get_leaves_by_id(self,employee_id):
        try:
            return Leave.objects.get(id=employee_id)
        except Leave.DoesNotExist:
            return None
        
    def create_leaves(self,employee,data):
        return Leave.objects.create(
            employee=employee,
            leave_type=data['leave_type'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            reason=data['reason'],
        )
    
    def update_leave_status(self,leave_id,status):
        leave=self.get_leaves_by_id(leave_id)
        if leave:
            leave.status=status
            leave.save()
            return leave
        return None
    
    def delete_leave(self,leave_id):
        leave=self.get_leaves_by_id(leave_id)
        if leave:
            leave.delete()
            return True
        return False
    
    def delete_leave_id(self,leave_id):
        try:
            Leave.objects.get(id=leave_id).delete()
            return True
        except Leave.DoesNotExist:
            return False