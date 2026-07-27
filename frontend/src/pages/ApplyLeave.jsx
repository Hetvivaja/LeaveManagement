import  React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyLeaveAPI } from '../services/api';
import Navbar from '../components/Navbar';
import LeaveForm from '../components/LeaveForm';
import { createLeaveRequestDTO, validateLeaveRequest } from '../dtos/request/leaveRequestDTO';

const ApplyLeave = () => {
        const navigate=useNavigate();
        const user=JSON.parse(localStorage.getItem('user'));
        const [error,setError]=useState('');
        const[success,setSuccess]=useState('');
        const [loading,setLoading]=useState(false);

        const handleSubmit=async(formData)=>{
            setError('');
            setSuccess('');
            setLoading(true);

            const dto=createLeaveRequestDTO(formData);
            const errors=validateLeaveRequest(dto);

            if(errros.length>0){
                setError(errors.join(', '));
                setLoading(false);
                return;
            }

            try{
                await applyLeaveAPI(dto);
                setSuccess('Leave applied successfully! ✅');
                setTimeout(() => navigate('/dashboard'), 1500);
            }catch(err){
                setError('Something went wrong!');
            }finally {
            setLoading(false);
            }
        };

    return(
        <div>
            <Navbar user={user} />
            <div style={styles.container}>
                <h2>Apply for Leave</h2>

                {error   && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                {/* LeaveForm Component use karo */}
                <LeaveForm
                    onSubmit={handleSubmit}
                    loading={loading}
                />

                <button
                    style={styles.cancelBtn}
                    onClick={() => navigate('/dashboard')}
                >
                    Cancel
                </button>
            </div>
        </div>     
    );
};
const styles={
    container : { padding:'30px', maxWidth:'500px', margin:'0 auto' },
    error     : { color:'red' },
    success   : { color:'green' },
    cancelBtn : { width:'100%', padding:'10px', background:'#ff4d4f', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', marginTop:'10px' },
};

export default ApplyLeave;