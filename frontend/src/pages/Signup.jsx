import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupAPI } from '../services/api';

const departments = [['engineering', 'Engineering'], ['human_resources', 'Human Resources'], ['finance', 'Finance'], ['marketing', 'Marketing'], ['operations', 'Operations'], ['sales', 'Sales']];

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ first_name: '', last_name: '', username: '', email: '', password: '', department: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = ({ target: { name, value } }) => { setForm((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: '' })); };
    const validate = () => {
        const nextErrors = {};
        if (!form.first_name.trim()) nextErrors.first_name = 'First name is required.';
        if (!form.username.trim()) nextErrors.username = 'Username is required.';
        else if (form.username.trim().length < 3) nextErrors.username = 'Use at least 3 characters.';
        if (!form.email.trim()) nextErrors.email = 'Email is required.';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
        if (!form.password) nextErrors.password = 'Password is required.';
        else if (form.password.length < 8) nextErrors.password = 'Use at least 8 characters.';
        if (!form.department) nextErrors.department = 'Select your department.';
        return nextErrors;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length) return setErrors(nextErrors);
        setLoading(true); setServerError('');
        try {
            const { data } = await signupAPI({ ...form, username: form.username.trim(), email: form.email.trim() });
            localStorage.setItem('access_token', data.access_token); localStorage.setItem('refresh_token', data.refresh_token); localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard', { replace: true });
        } catch (error) {
            const message = error.response?.data?.message;
            setServerError(Array.isArray(message) ? message.join(' ') : message || 'We could not create your account. Please try again.');
        } finally { setLoading(false); }
    };
    const field = (name, label, options = {}) => <div className={options.full ? 'col-12' : 'col-sm-6'}><label className="form-label fw-semibold" htmlFor={name}>{label}{options.optional && <span className="text-secondary fw-normal"> (optional)</span>}</label><input id={name} name={name} type={options.type || 'text'} value={form[name]} onChange={handleChange} className={`form-control ${errors[name] ? 'is-invalid' : ''}`} autoComplete={options.autoComplete} /><div className="invalid-feedback">{errors[name]}</div>{options.hint && <div className="form-text">{options.hint}</div>}</div>;

    return <main className="auth-page auth-page--signup"><section className="auth-card auth-card--wide card border-0">
        <div className="text-center mb-4"><img src="/hetvi_logo.png" alt="Leave Management" className="auth-logo mb-3" /><p className="eyebrow mb-2">GET STARTED</p><h1 className="h3 fw-bold mb-2">Create your account</h1><p className="text-secondary mb-0">Set up your employee workspace in under a minute.</p></div>
        {serverError && <div className="alert alert-danger py-2" role="alert">{serverError}</div>}
        <form onSubmit={handleSubmit} noValidate><div className="row g-3">
            {field('first_name', 'First name', { autoComplete: 'given-name' })}
            {field('last_name', 'Last name', { optional: true, autoComplete: 'family-name' })}
            {field('username', 'Username', { autoComplete: 'username' })}
            <div className="col-sm-6"><label className="form-label fw-semibold" htmlFor="department">Department</label><select id="department" name="department" value={form.department} onChange={handleChange} className={`form-select ${errors.department ? 'is-invalid' : ''}`}><option value="">Choose a department</option>{departments.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><div className="invalid-feedback">{errors.department}</div></div>
            {field('email', 'Work email', { type: 'email', full: true, autoComplete: 'email' })}
            {field('password', 'Password', { type: 'password', full: true, autoComplete: 'new-password', hint: 'At least 8 characters.' })}
        </div><button className="btn btn-primary btn-lg w-100 auth-submit mt-4" type="submit" disabled={loading}>{loading ? 'Creating account…' : 'Create account'}</button></form>
        <p className="text-center text-secondary mt-4 mb-0">Already have an account? <Link className="fw-semibold text-decoration-none" to="/">Sign in</Link></p>
    </section></main>;
};

export default Signup;
