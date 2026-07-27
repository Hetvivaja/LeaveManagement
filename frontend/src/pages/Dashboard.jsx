import React,{useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import { getLeavesAPI,deleteLeaveAPI } from "../services/api";
import Navbar from "../components/Navbar";
import LeaveList from "../components/LeaveList";
import LeaveBalance from "../components/LeaveBalance";
import LeaveStatusTracker from "../components/LeaveStatusTracker";

const Dashboard=()=>{
    
    const navigate=useNavigate();
    const [leaves,setLeaves]=useState([]);
    const [loading,setLoading]=useState(true);
    const user=JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{fetchLeaves();},[]);

    const fetchLeaves=async()=>{
        try{
            const res=await getLeavesAPI();
            setLeaves(res.data.data || res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };

    const handleDelete=async(id)=>{
        await deleteLeaveAPI(id);
        fetchLeaves();
    };

     // Leave Balance
    const leaveBalance = {
        casual   : 12 - leaves.filter(l => l.leave_type === 'casual'   && l.status === 'approved').length,
        sick     : 10 - leaves.filter(l => l.leave_type === 'sick'     && l.status === 'approved').length,
        earned   : 15 - leaves.filter(l => l.leave_type === 'earned'   && l.status === 'approved').length,
        maternity: 90 - leaves.filter(l => l.leave_type === 'maternity'&& l.status === 'approved').length,
    };

    return(
       <div>
            <Navbar user={user} />
            <div style={styles.container}>

                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h2 style={styles.title}>👋 Welcome, {user?.username}!</h2>
                        <p style={styles.subtitle}>Manage your leaves here</p>
                    </div>
                    <button
                        style={styles.applyBtn}
                        onClick={() => navigate('/apply-leave')}
                    >
                        + Apply Leave
                    </button>
                </div>

                {/* Leave Balance Cards */}
                <LeaveBalance leaves={leaves} />  

                {/* Status Tracker Component */}
                <LeaveStatusTracker leaves={leaves} /> 

                {/* Leave History */}
                <h3 style={styles.sectionTitle}>📜 My Leave History</h3>
                {loading ? (
                <p style={styles.loading}>Loading... ⏳</p>
                ) : (
                <LeaveList
                    leaves={leaves}
                    isAdmin={false}
                    currentUserId={user?.id}
                    onApprove={() => {}}
                    onReject={() => {}}
                    onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};
const styles={
    container       : { padding:'20px' },
    header          : { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'25px' },
    title           : { margin:'0', color:'#333' },
    subtitle        : { margin:'5px 0 0', color:'#666', fontSize:'14px' },
    applyBtn        : { padding:'10px 20px', background:'#52c41a', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'14px' },
    sectionTitle    : { color:'#333', marginBottom:'15px' },
    loading         : { textAlign:'center', fontSize:'18px', marginTop:'50px' },
    empty           : { textAlign:'center', padding:'50px', color:'#999' },

    // Balance Cards
    balanceContainer: { display:'flex', gap:'15px', marginBottom:'25px' },
    balanceCard     : { background:'white', padding:'15px', borderRadius:'10px', flex:1, textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
    balanceNumber   : { fontSize:'28px', fontWeight:'bold', margin:'0', color:'#333' },
    balanceLabel    : { margin:'5px 0 0', color:'#666', fontSize:'12px' },

    // Summary
    summaryContainer: { display:'flex', gap:'15px', marginBottom:'25px' },
    summaryCard     : { background:'white', padding:'12px 20px', borderRadius:'8px', display:'flex', alignItems:'center', gap:'10px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' },
    summaryIcon     : { fontSize:'20px' },
    summaryText     : { color:'#333', fontSize:'14px', fontWeight:'bold' },
};
export default Dashboard;