import React from 'react';

const LEAVE_LIMITS = {
    casual   : 12,
    sick     : 10,
    earned   : 15,
    maternity: 90,
};

const LeaveBalance = ({ leaves }) => {

    const getUsed = (type) =>
        leaves.filter(l =>
            l.leave_type === type &&
            l.status === 'approved'
        ).length;

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>🗓️ Leave Balance</h3>
            <div style={styles.cards}>
                {Object.entries(LEAVE_LIMITS).map(([type, total]) => {
                    const used    = getUsed(type);
                    const balance = total - used;
                    const percent = Math.round((used / total) * 100);
                    const color   = balance > 5 ? '#52c41a' : '#ff4d4f';

                    return (
                        <div key={type} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <span style={styles.leaveType}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </span>
                                <span style={{...styles.balance, color}}>
                                    {balance} left
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div style={styles.progressBg}>
                                <div style={{
                                    ...styles.progressFill,
                                    width     : `${percent}%`,
                                    background: color,
                                }} />
                            </div>

                            <div style={styles.cardFooter}>
                                <span style={styles.used}>Used: {used}</span>
                                <span style={styles.total}>Total: {total}</span>
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
    cards      : { display:'flex', gap:'15px' },
    card       : { background:'white', padding:'15px', borderRadius:'10px', flex:1, boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
    cardHeader : { display:'flex', justifyContent:'space-between', marginBottom:'10px' },
    leaveType  : { fontWeight:'bold', color:'#333', textTransform:'capitalize' },
    balance    : { fontWeight:'bold', fontSize:'14px' },
    progressBg : { background:'#f0f0f0', borderRadius:'10px', height:'8px', marginBottom:'8px' },
    progressFill: { height:'8px', borderRadius:'10px', transition:'width 0.3s' },
    cardFooter : { display:'flex', justifyContent:'space-between' },
    used       : { color:'#999', fontSize:'12px' },
    total      : { color:'#999', fontSize:'12px' },
};

export default LeaveBalance;