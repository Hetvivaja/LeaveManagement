import React from 'react';

const SuccessAlert = ({ message }) => {
    if (!message) return null;

    return (
        <div style={styles.container}>
            ✅ {message}
        </div>
    );
};

const styles = {
    container: { background:'#f6ffed', border:'1px solid #b7eb8f', borderRadius:'8px', padding:'10px 15px', marginBottom:'15px', color:'#52c41a', fontSize:'13px' },
};

export default SuccessAlert;