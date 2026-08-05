import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupAPI } from '../services/api';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username   : '',
        password   : '',
        email      : '',
        first_name : '',
        last_name  : '',
    });
    const [error,   setErrors   ]   = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

     // Frontend Validation
    const validate = () => {
        const errs = [];
        if (!form.first_name) errs.push('First name is required!');
        if (!form.last_name)  errs.push('Last name is required!');
        if (!form.username)   errs.push('Username is required!');
        if (!form.email)      errs.push('Email is required!');
        if (!form.password)   errs.push('Password is required!');
        if (form.password && form.password.length < 8)
            errs.push('Password must be at least 8 characters!');
        if (form.email && !form.email.includes('@'))
            errs.push('Valid email is required!');
        return errs;
    };

    const handleSubmit = async () => {
        setErrors([]);
        setSuccess('');
        const validationErrors = validate();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);

        try {
            const res = await signupAPI(form);
            localStorage.setItem('access_token',  res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            localStorage.setItem('user',          JSON.stringify(res.data.user));
            setSuccess('Account created! Redirecting...');
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            const backendError = err.response?.data?.message;
            if (Array.isArray(backendError)) {
                setErrors(backendError);
            } else if (backendError) {
                setErrors([backendError]);
            } else {
                setErrors(['Something went wrong! Please try again.']);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.title}>Leave Management</h2>
                <h3 style={styles.subtitle}>Create Account</h3>

                <ErrorAlert errors={errors} />
                <SuccessAlert message={success} />

                <input style={styles.input} type="text"     name="first_name" placeholder="First Name *"  onChange={handleChange} />
                <input style={styles.input} type="text"     name="last_name"  placeholder="Last Name"     onChange={handleChange} />
                <input style={styles.input} type="text"     name="username"   placeholder="Username *"    onChange={handleChange} />
                <input style={styles.input} type="email"    name="email"      placeholder="Email *"       onChange={handleChange} />
                <input style={styles.input} type="password" name="password"   placeholder="Password * (min 8 chars)" onChange={handleChange} />

                <button style={styles.button} onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Creating...' : 'Create Account'}
                </button>

                <p style={styles.loginText}>
                    Already have account?{' '}
                    <Link to="/" style={styles.link}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container : { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5' },
    box       : { background:'white', padding:'40px', borderRadius:'10px', width:'380px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' },
    title     : { textAlign:'center', color:'#1890ff', marginBottom:'5px' },
    subtitle  : { textAlign:'center', color:'#666', marginBottom:'20px' },
    input     : { width:'100%', padding:'10px', marginBottom:'12px', borderRadius:'5px', border:'1px solid #ddd', fontSize:'14px', boxSizing:'border-box' },
    button    : { width:'100%', padding:'10px', background:'#1890ff', color:'white', border:'none', borderRadius:'5px', fontSize:'16px', cursor:'pointer', marginBottom:'15px' },
    error     : { color:'red',   textAlign:'center', marginBottom:'10px' },
    success   : { color:'green', textAlign:'center', marginBottom:'10px' },
    loginText : { textAlign:'center', color:'#666', fontSize:'14px' },
    link      : { color:'#1890ff', textDecoration:'none' },
};

export default Signup;