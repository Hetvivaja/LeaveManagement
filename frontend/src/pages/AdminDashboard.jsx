import React, { useEffect, useState } from "react";
import { getLeavesAPI, approveLeaveAPI, rejectLeaveAPI, deleteLeaveAPI,getUsersAPI,updateUserAPI,deleteUserAPI} from "../services/api";
import Navbar      from "../components/Navbar";
import LeaveList   from "../components/LeaveList";
import AdminStats  from "../components/AdminStats";
import AdminFilter from "../components/AdminFilter";
import AdminUserList from "../components/AdminUserList";

const AdminDashboard=()=>{

    const [leaves,  setLeaves]  = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter,  setFilter]  = useState('all');
    const [search,  setSearch]  = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const [activeTab, setActiveTab] = useState('leaves'); 
    const [users,     setUsers]     = useState([]); 


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

    const fetchUsers = async () => {
        try {
            const res = await getUsersAPI();
            setUsers(res.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    
    useEffect(()=>{fetchLeaves();
        fetchUsers},[]);
        
    const handlePasswordChange = async (id, password) => {
        await updateUserAPI(id, { password });
        alert('Password updated!');
    };

    const handleUserDelete = async (id) => {
        await deleteUserAPI(id);
        fetchUsers();
    };

    const handleToggleActive = async (id, is_active) => {
        await updateUserAPI(id, { is_active: !is_active });
        fetchUsers();
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
                    <p style={styles.subtitle}>Manage leaves and employees</p>
                </div>
                <button style={styles.exportBtn} onClick={exportCSV}>
                    📥 Export CSV
                </button>
            </div>

            {/* Stats */}
            <AdminStats leaves={leaves} />

            {/* Tabs */}
            <div style={styles.tabs}>
                <button
                    style={{
                        ...styles.tab,
                        borderBottom: activeTab === 'leaves' ? '3px solid #1890ff' : 'none',
                        color: activeTab === 'leaves' ? '#1890ff' : '#666',
                    }}
                    onClick={() => setActiveTab('leaves')}
                >
                    📋 Leave Requests ({leaves.length})
                </button>
                <button
                    style={{
                        ...styles.tab,
                        borderBottom: activeTab === 'users' ? '3px solid #1890ff' : 'none',
                        color: activeTab === 'users' ? '#1890ff' : '#666',
                    }}
                    onClick={() => setActiveTab('users')}
                >
                    👥 Users ({users.length})
                </button>
            </div>

            {/* Leave Tab */}
            {activeTab === 'leaves' && (
                <>
                    <div style={styles.searchFilter}>
                        <input
                            style={styles.searchInput}
                            type="text"
                            placeholder="🔍 Search employee..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <AdminFilter current={filter} onChange={setFilter} />
                    </div>
                    {loading ? (
                        <p>Loading... ⏳</p>
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
                </>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <AdminUserList
                    users={users}
                    onPasswordChange={handlePasswordChange}
                    onDelete={handleUserDelete}
                    onToggleActive={handleToggleActive}
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
    tabs      : { display:'flex', gap:'0', marginBottom:'20px', borderBottom:'1px solid #ddd' },
    tab       : { padding:'12px 25px', background:'none', border:'none', cursor:'pointer', fontSize:'14px', fontWeight:'bold' },
};

export default AdminDashboard
       
    