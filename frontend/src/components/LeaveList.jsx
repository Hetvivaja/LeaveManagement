import React from "react";

const statusColor={
    pending  : '#faad14',
    approved : '#52c41a',
    rejected : '#ff4d4f',
};

const  LeaveList=({leaves, isAdmin, onApprove, onReject,currentUserId, onDelete})=>{
    if(leaves.length===0){
        return<p>No leaves  fount!</p>;
    }
    return(
         <table style={styles.table}>
            <thead>
                <tr style={styles.thead}>
                    <th>Employee</th>
                    <th>Type</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {leaves.map((leave) => (
                    <tr key={leave.id} style={styles.row}>
                        <td>{leave.employee_name}</td>
                        <td>{leave.leave_type}</td>
                        <td>{leave.start_date}</td>
                        <td>{leave.end_date}</td>
                        <td>{leave.reason}</td>
                        <td>
                            <span style={{ ...styles.badge, background: statusColor[leave.status] }}>
                                {leave.status}
                            </span>
                        </td>
                        <td>
                            {isAdmin && leave.status === 'pending' && (
                                <>
                                    <button style={styles.approveBtn} onClick={() => onApprove(leave.id)}>✅ Approve</button>
                                    <button style={styles.rejectBtn}  onClick={() => onReject(leave.id)}>❌ Reject</button>
                                </>
                            )}  
                            {(isAdmin || leave.employee === parseInt(currentUserId)) && (
                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => onDelete(leave.id)}
                                >
                                    🗑️ Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const styles={
    table     : { width:'100%', borderCollapse:'collapse' },
    thead     : { background:'#1890ff', color:'white' },
    row       : { borderBottom:'1px solid #ddd', textAlign:'center', padding:'10px' },
    badge     : { padding:'4px 10px', borderRadius:'20px', color:'white', fontSize:'12px' },
    approveBtn: { padding:'5px 10px', background:'#52c41a', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', marginRight:'5px' },
    rejectBtn : { padding:'5px 10px', background:'#ff4d4f', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', marginRight:'5px' },
    deleteBtn : { padding:'5px 10px', background:'#53c2d1',   color:'white', border:'none', borderRadius:'4px', cursor:'pointer' },
};
export default LeaveList;