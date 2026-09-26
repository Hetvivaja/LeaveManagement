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

    return(
       <div>
            <Navbar user={user} />
            <main style={styles.container} className="page-shell">

                <div style={styles.header} className="page-header">
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

                <LeaveBalance leaves={leaves} />  

                <LeaveStatusTracker leaves={leaves} /> 

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
            </main>
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
};
export default Dashboard;
