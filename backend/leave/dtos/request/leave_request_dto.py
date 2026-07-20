from dataclasses import dataclass
from datetime import date

@dataclass
class LeaveRequestDTO:
    leave_type: str
    start_date: date
    end_date: date
    reason: str

    @staticmethod
    def from_method(data):
        return LeaveRequestDTO(
            leave_type = data.get('leave_type', ''),
            start_date = data.get('start_date', ''),
            end_date   = data.get('end_date', ''),
            reason     = data.get('reason', ''),
        )
    
    def validate(self):
        errors=[]
        if not self.leave_type:
            errors.append("Leave type is required.")
        if not self.start_date:
            errors.append("Start date is required.")
        if not self.end_date:
            errors.append("End date is required.")
        if not self.reason:
            errors.append("Reason is required.")
        if self.start_date and self.end_date:
            if self.start_date > self.end_date:
                errors.append("Start date cannot be after end date.")
        return errors
    