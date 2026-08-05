import React,{useState} from "react";
import {useNavigate,Link} from 'react-router-dom';
import {loginAPI} from '../services/api';
// import { createLoginRequestDTO, validateLoginRequest } from '../dtos/request/authRequestDTO';
// import { parseLoginResponse } from '../dtos/response/authResponseDTO';
import ErrorAlert from '../components/ErrorAlert'; 

const Login=()=>{
    const navigate=useNavigate();
    const[form,setForm]=useState({username:'',password:''});
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        if(e)e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const res = await loginAPI({
            username: form.username,
            password: form.password,
            });

            // Direct response - DTO skip 
            const { access_token, refresh_token, user } = res.data;

            // Token Save
            localStorage.setItem('access_token',access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('user', JSON.stringify(user));

            // Auto Ridirect Role wise
            if(user.is_admin){
                navigate('/admin/dashboard');}
            else{
                navigate('/dashboard');
            }
            
        }catch(err){
            setError('Invalid username or password!');
        }finally{
            setLoading(false);
        }
    };

    return(
         <div style={styles.container}>
            <div style={styles.box}>
                 <div style={styles.logoContainer}>
                    <img
                        src="/hetvi_logo.png"
                        alt="Logo"
                        style={styles.logoImg}
                    />
                </div>
                <h2 style={styles.title}>Leave Management</h2>
                <h3 style={styles.subtitle}>Login</h3>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    style={styles.input}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />
                <input
                    style={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button
                    style={styles.button}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p style={styles.signupText}>
                    New user?{' '}
                    <Link to="/signup" style={styles.link}>Create account</Link>
                </p>
                <ErrorAlert errors={error} />
            </div>
        </div>
    );
};
const styles={
    container : { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', backgroundColor:'#f0f2f5' },
    box       : { background:'white', padding:'40px', borderRadius:'10px', width:'350px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' },
    title     : { textAlign:'center', color:'#1890ff', marginBottom:'5px' },
    subtitle  : { textAlign:'center', color:'#666', marginBottom:'20px' },
    input     : { width:'100%', padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', fontSize:'14px', boxSizing:'border-box' },
    button    : { width:'100%', padding:'10px', backgroundColor:'#1890ff', color:'white', border:'none', borderRadius:'5px', fontSize:'16px', cursor:'pointer' },
    error     : { color:'red', textAlign:'center', marginBottom:'10px' },
    signupText : { textAlign:'center', color:'#666', fontSize:'14px', marginTop:'15px' },
    link       : { color:'#1890ff', textDecoration:'none' },
    logoContainer : { display:'flex', justifyContent:'center', marginBottom:'10px' },
    logoImg       : { width:'80px', height:'80px', borderRadius:'15px', objectFit:'cover' },
};
export default Login;