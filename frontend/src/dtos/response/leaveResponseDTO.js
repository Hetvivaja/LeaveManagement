export const parseLeaveListResponse=(data)=>({

    success: data.success,
    count: data.count,
    leaves: data.data,
});

export const parseSingleLeaveResponse=(data)=>({

    success: data.success,
    message: data.message,
    leave: data.data,
}); 