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
             <div style={styles.logoContainer}>
                <img
                    src="/hetvi_logo.png"  
                    alt="Logo"
                    style={styles.logoImg}
                />
                <h2 style={styles.logoText}>🏢Leave Management</h2>
            </div>
            <div style={styles.right}>
                <span style={styles.username}>👤 {user?.username}</span>
                <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

const styles = {
    nav           : { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 30px', background:'#1890ff', color:'white' },
    logoContainer : { display:'flex', alignItems:'center', gap:'10px' },
    logoImg       : { width:'40px', height:'40px', borderRadius:'8px', objectFit:'cover' },
    logoText      : { margin:'0', color:'white', fontSize:'20px' },
    right         : { display:'flex', alignItems:'center', gap:'15px' },
    username      : { color:'white', fontSize:'14px' },
    logoutBtn     : { padding:'8px 15px', background:'white', color:'#1890ff', border:'none', borderRadius:'5px', cursor:'pointer' },
};
export default Navbar;