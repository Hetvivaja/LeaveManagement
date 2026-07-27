import React, { useEffect, useState } from "react";
import { getLeavesAPI, approveLeaveAPI, rejectLeaveAPI, deleteLeaveAPI } from "../services/api";
import Navbar      from "../components/Navbar";
import LeaveList   from "../components/LeaveList";
import AdminStats  from "../components/AdminStats";
import AdminFilter from "../components/AdminFilter";

const AdminDashboard=()=>{

    const [leaves,  setLeaves]  = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter,  setFilter]  = useState('all');
    const [search,  setSearch]  = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

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

    const handleApprove=async(id)=>{
        await approveLeaveAPI(id);
        fetchLeaves();
    };

    const handleReject=async(id)=>{
        await rejectLeaveAPI(id);
        fetchLeaves();
    };

    const handleDelete=async(id)=>{
        await deleteLeaveAPI(id);
        fetchLeaves();
    };

    // Filter + Search Logic
    const filteredLeaves=leaves
    .filter(l=>filter==='all' || l.status===filter)
    .filter(l=>l.employee_name.toLowerCase().includes(search.toLowerCase()));

    // Export CSV
    const exportCSV=()=>{
        const headers  = ['Employee', 'Type', 'Start', 'End', 'Reason', 'Status'];
        const rows     = filteredLeaves.map(l => [
            l.employee_name, l.leave_type,
            l.start_date, l.end_date,
            l.reason, l.status
        ]);
        const csvContent = [headers, ...rows]
            .map(r => r.join(','))
            .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = 'leaves_report.csv';
        a.click();
    };

    return(
         <div>
            <Navbar user={user} />
            <div style={styles.container}>

                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h2 style={styles.title}>🏢 Admin Dashboard</h2>
                        <p style={styles.subtitle}>Manage all employee leaves</p>
                    </div>
                    <button style={styles.exportBtn} onClick={exportCSV}>
                        📥 Export CSV
                    </button>
                </div>

                {/* Stats */}
                <AdminStats leaves={leaves} />

                {/* Search + Filter */}
                <div style={styles.searchFilter}>
                    <input
                        style={styles.searchInput}
                        type="text"
                        placeholder="🔍 Search employee..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <AdminFilter current={filter} onChange={setFilter} />
                </div>

                {/* Leave List */}
                {loading ? (
                    <p style={styles.loading}>Loading... ⏳</p>
                ) : filteredLeaves.length === 0 ? (
                    <div style={styles.empty}>
                        <p>📭 No leaves found!</p>
                    </div>
                ) : (
                    <LeaveList
                        leaves={filteredLeaves}
                        isAdmin={true}
                        currentUserId={user?.id}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onDelete={handleDelete}
                    />
                )}

            </div>
        </div>
    );
};

const styles={
        container   : { padding:'20px' },
    header      : { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'25px' },
    title       : { margin:'0', color:'#333' },
    subtitle    : { margin:'5px 0 0', color:'#666', fontSize:'14px' },
    exportBtn   : { padding:'10px 20px', background:'#52c41a', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'14px' },
    searchFilter: { display:'flex', alignItems:'center', gap:'20px', marginBottom:'20px', flexWrap:'wrap' },
    searchInput : { padding:'8px 15px', border:'1px solid #ddd', borderRadius:'20px', fontSize:'14px', width:'250px' },
    loading     : { textAlign:'center', fontSize:'18px', marginTop:'50px' },
    empty       : { textAlign:'center', padding:'50px', color:'#999', fontSize:'18px' },
};

export default AdminDashboard
       
    