import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = ({ target: { name, value } }) => {
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: '' }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = {};
        if (!form.username.trim()) nextErrors.username = 'Username is required.';
        if (!form.password) nextErrors.password = 'Password is required.';
        if (Object.keys(nextErrors).length) return setErrors(nextErrors);
        setLoading(true);
        setServerError('');
        try {
            const { data } = await loginAPI(form);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate(data.user.is_admin ? '/admin/dashboard' : '/dashboard', { replace: true });
        } catch (error) {
            const message = error.response?.data?.message;
            setServerError(Array.isArray(message) ? message.join(' ') : message || 'Unable to sign in. Check your username and password.');
        } finally {
            setLoading(false);
        }
    };

    return <main className="auth-page auth-page--login"><section className="auth-card card border-0">
        <div className="text-center mb-4"><img src="/hetvi_logo.png" alt="Leave Management" className="auth-logo mb-3" /><p className="eyebrow mb-2">WELCOME BACK</p><h1 className="h3 fw-bold mb-2">Sign in to your workspace</h1><p className="text-secondary mb-0">Manage your leave requests in one place.</p></div>
        {serverError && <div className="alert alert-danger py-2" role="alert">{serverError}</div>}
        <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3"><label className="form-label fw-semibold" htmlFor="username">Username</label><input id="username" name="username" value={form.username} onChange={handleChange} className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`} autoComplete="username" /><div className="invalid-feedback">{errors.username}</div></div>
            <div className="mb-4"><label className="form-label fw-semibold" htmlFor="password">Password</label><input id="password" name="password" type="password" value={form.password} onChange={handleChange} className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`} autoComplete="current-password" /><div className="invalid-feedback">{errors.password}</div></div>
            <button className="btn btn-primary btn-lg w-100 auth-submit" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <p className="text-center text-secondary mt-4 mb-0">New here? <Link className="fw-semibold text-decoration-none" to="/signup">Create an account</Link></p>
    </section></main>;
};

export default Login;
