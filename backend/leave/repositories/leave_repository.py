from leave.models import Leave


class LeaveRepository:
    def get_all_leaves(self):
        return Leave.objects.select_related('employee').order_by('-applied_on')

    def get_leaves_by_employee(self, employee_id):
        return Leave.objects.select_related('employee').filter(employee_id=employee_id).order_by('-applied_on')

    def get_leaves_by_id(self, leave_id):
        return Leave.objects.select_related('employee').filter(id=leave_id).first()

    def create_leaves(self, employee, data):
        return Leave.objects.create(
            employee=employee,
            leave_type=data['leave_type'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            reason=data['reason'],
        )

    def update_leave_status(self, leave_id, status):
        leave = self.get_leaves_by_id(leave_id)
        if leave:
            leave.status = status
            leave.save(update_fields=['status', 'updated_on'])
        return leave

    def delete_by_id(self, leave_id):
        leave = self.get_leaves_by_id(leave_id)
        if leave:
            leave.delete()
            return True
        return False

