import React from 'react';

const ErrorAlert = ({ errors }) => {

    if (!errors || errors.length === 0) return null;

    const errorList = Array.isArray(errors) ? errors : [errors];

    return (
        <div style={styles.container}>
            {errorList.map((err, index) => (
                <div key={index} style={styles.errorItem}>
                    ❌ {err}
                </div>
            ))}
        </div>
    );
};

const styles = {
    container : { background:'#fff2f0', border:'1px solid #ffccc7', borderRadius:'8px', padding:'10px 15px', marginBottom:'15px' },
    errorItem : { color:'#ff4d4f', fontSize:'13px', padding:'3px 0' },
};

export default ErrorAlert;