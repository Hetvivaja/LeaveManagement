import axios from 'axios';

// Base Url
const API=axios.create({
    baseURL:  process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/',
});

// To All Request send Token Automatic
API.interceptors.request.use((config)=>{
    const token=localStorage.getItem('access_token');
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const loginAPI=(data)=>API.post('/auth/login/',data);
export const logoutAPI=(data)=>API.post('/auth/logout/',data);
export const signupAPI=(data)=>API.post('/auth/signup/',data);

// Leave APIs
export const getLeavesAPI=()=>API.get('/leaves/');
export const applyLeaveAPI=(data)=>API.post('/leaves/',data);
export const getLeaveByIdAPI=(id)=>API.get(`/leaves/${id}/`);
export const deleteLeaveAPI=(id)=>API.delete(`/leaves/${id}/`);
export const approveLeaveAPI=(id)=>API.patch(`/leaves/${id}/approve/`);
export const rejectLeaveAPI=(id)=>API.patch(`/leaves/${id}/reject/`);

// Admin User APIs
export const getUsersAPI          = ()         => API.get('admin/users/');
export const updateUserAPI        = (id, data) => API.patch(`admin/users/${id}/`, data);
export const deleteUserAPI        = (id)       => API.delete(`admin/users/${id}/`);

export default API;