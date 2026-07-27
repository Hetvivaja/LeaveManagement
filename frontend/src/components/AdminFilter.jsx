import React from "react";

const FILTERS=['all', 'pending', 'approved', 'rejected'];

const AdminFilter=({current,onChange})=>{

     return (
        <div style={styles.container}>
            <span style={styles.label}>🔍 Filter:</span>
            {FILTERS.map((f) => (
                <button
                    key={f}
                    style={{
                        ...styles.btn,
                        background : current === f ? '#1890ff' : '#fff',
                        color      : current === f ? '#fff'     : '#333',
                    }}
                    onClick={() => onChange(f)}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
};

const styles={
    container : { display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' },
    label     : { fontWeight:'bold', color:'#333' },
    btn       : { padding:'6px 16px', border:'1px solid #1890ff', borderRadius:'20px', cursor:'pointer', fontSize:'13px' },
};

export default AdminFilter;