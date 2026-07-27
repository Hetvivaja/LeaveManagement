import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../services/api";

const Navbar=({user})=>{
    
    const navigate=useNavigate();

    const handleLogout=async()=>{
        const refresh_token =localStorage.getItem('refresh_token');
        await logoutAPI({refresh_token });
        localStorage.clear();
        navigate('/');
    };
    
    return(
        <nav style={styles.nav}>
            <h2 style={styles.logo}>🏢 Leave Management</h2>
            <div style={styles.right}>
                <span style={styles.username}>👤 {user?.username}</span>
                <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

const styles={
    nav       : { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 30px', background:'#1890ff', color:'white' },
    logo      : { margin:0, color:'white' },
    right     : { display:'flex', alignItems:'center', gap:'15px' },
    username  : { color:'white', fontSize:'14px' },
    logoutBtn : { padding:'5px 10px', background:'#ff4d4f', color:'white', border:'none', borderRadius:'4px', cursor:'pointer' },    
};

export default Navbar;