export const createLeaveRequestDTO = (formData) => ({

    leave_type: formData.leave_type,
    start_date: formData.start_date,
    end_date: formData.end_date,
    reason: formData.reason,
});

export const validateLeaveRequest = (dto) => {

    const errors = [];
    if (!dto.leave_type) errors.push('Leave type is required.');
    if (!dto.start_date) errors.push('Start date is required.');
    if (!dto.end_date) errors.push('End date is required.');
    if (!dto.reason) errors.push('Reason is required.');
    if(dto.start_date>dto.end_date)
        errors.push('Start date cannot be after end date!');
    return errors;
};