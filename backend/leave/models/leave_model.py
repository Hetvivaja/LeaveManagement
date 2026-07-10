from django.db import models
from django.contrib.auth.models import User

class Leave(models.Model):

    #Leave Type
    LEAVE_TYPE_CHOICE=[
        ('casual','Casual Leave'),
        ('sick','Sick Leave'),
        ('earned','Earned Leave'),
        ('maternity','Maternity Leave'),
    ]

    #Status Choice
    STATUS_CHOICE=[
        ('pending',"Pending"),
        ('approved','Approved'),
        ('rejected','Rejected'),
    ]

    #Fields
    employee=models.ForeignKey(User,on_delete=models.CASCADE,related_name='leaves')
    leave_type=models.CharField(max_length=20,choices=LEAVE_TYPE_CHOICE)
    start_date=models.DateField()
    end_date=models.DateField()
    reason=models.TextField()
    status=models.CharField(max_length=20,choices=STATUS_CHOICE,default='pending')
    applied_on=models.DateTimeField(auto_now_add=True)
    updated_on=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.employee.username} - {self.leave_type} ({self.status})"