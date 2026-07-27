import React from "react";

const AdminStats = ({leaves}) => {

    const stats={
        total    : leaves.length,
        pending  : leaves.filter(l => l.status === 'pending').length,
        approved : leaves.filter(l => l.status === 'approved').length,
        rejected : leaves.filter(l => l.status === 'rejected').length,
    };
     return (
        <div style={styles.container}>
            <div style={{...styles.card, borderTop:'4px solid #1890ff'}}>
                <h3 style={styles.number}>{stats.total}</h3>
                <p style={styles.label}>📋 Total Leaves</p>
            </div>
            <div style={{...styles.card, borderTop:'4px solid #faad14'}}>
                <h3 style={styles.number}>{stats.pending}</h3>
                <p style={styles.label}>⏳ Pending</p>
            </div>
            <div style={{...styles.card, borderTop:'4px solid #52c41a'}}>
                <h3 style={styles.number}>{stats.approved}</h3>
                <p style={styles.label}>✅ Approved</p>
            </div>
            <div style={{...styles.card, borderTop:'4px solid #ff4d4f'}}>
                <h3 style={styles.number}>{stats.rejected}</h3>
                <p style={styles.label}>❌ Rejected</p>
            </div>
        </div>
    );
};

const styles={
    container : { display:'flex', gap:'20px', marginBottom:'25px' },
    card      : { background:'white', padding:'20px', borderRadius:'10px', flex:1, textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
    number    : { fontSize:'32px', fontWeight:'bold', margin:'0', color:'#333' },
    label     : { margin:'5px 0 0', color:'#666', fontSize:'14px' },
};

export default AdminStats;