import React from 'react';

const LeaveStatusTracker = ({ leaves }) => {

    // Sirf last 3 leaves dikhao
    const recentLeaves = [...leaves]
        .sort((a, b) => new Date(b.applied_on) - new Date(a.applied_on))
        .slice(0, 3);

    const statusConfig = {
        pending  : { color:'#faad14', icon:'⏳', label:'Pending Review' },
        approved : { color:'#52c41a', icon:'✅', label:'Approved'       },
        rejected : { color:'#ff4d4f', icon:'❌', label:'Rejected'       },
    };

    if (recentLeaves.length === 0) {
        return null;
    }

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>🔄 Recent Leave Status</h3>
            <div style={styles.list}>
                {recentLeaves.map((leave) => {
                    const config = statusConfig[leave.status];
                    return (
                        <div key={leave.id} style={styles.item}>

                            {/* Left Side */}
                            <div style={styles.left}>
                                <span style={styles.icon}>{config.icon}</span>
                                <div>
                                    <p style={styles.leaveType}>
                                        {leave.leave_type.charAt(0).toUpperCase() +
                                         leave.leave_type.slice(1)} Leave
                                    </p>
                                    <p style={styles.dates}>
                                        {leave.start_date} → {leave.end_date}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div style={{
                                ...styles.statusBadge,
                                background: config.color
                            }}>
                                {config.label}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    container  : { marginBottom:'25px' },
    title      : { color:'#333', marginBottom:'15px' },
    list       : { display:'flex', flexDirection:'column', gap:'10px' },
    item       : { background:'white', padding:'15px 20px', borderRadius:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
    left       : { display:'flex', alignItems:'center', gap:'15px' },
    icon       : { fontSize:'24px' },
    leaveType  : { margin:'0', fontWeight:'bold', color:'#333', fontSize:'14px' },
    dates      : { margin:'3px 0 0', color:'#999', fontSize:'12px' },
    statusBadge: { padding:'5px 15px', borderRadius:'20px', color:'white', fontSize:'12px', fontWeight:'bold' },
};

export default LeaveStatusTracker;