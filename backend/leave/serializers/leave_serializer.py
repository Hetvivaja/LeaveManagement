from  rest_framework import serializers
from leave.models import Leave

class LeaveSerializer(serializers.ModelSerializer):

    #To Show to help Employee Name's
    employee_name=serializers.SerializerMethodField()

    class Meta:
        model=Leave
        fields=[
            'id',
            'employee',
            'employee_name',
            'leave_type',
            'start_date',
            'end_date',
            'reason',
            'status',
            'applied_on',
            'updated_on',
        ]
        read_only_fields=[
            'employee',
            'status',
            'applied_on',
            'updated_on',
        ]
    def get_employee_name(self,obj):
        return obj.employee.get_full_name() or obj.employee.username