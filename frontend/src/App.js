import React from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApplyLeave from'./pages/ApplyLeave';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route
const ProtectedRoute=({children})=>{

    const token=localStorage.getItem('access_token');
    return token?children:<Navigate to="/" />;
};

// Admin Only Route
const AdminRoute=({children})=>{

  const token=localStorage.getItem('access_token');
  const user=JSON.parse(localStorage.getItem('user'));
  if(!token ) return <Navigate to="/" />;
  if(!user?.is_admin) return <Navigate to="/dashboard" />;
  return children;
};

// Employee Only Route
const EmployeeRoute=({children})=>{

  const token=localStorage.getItem('access_token');
  const user=JSON.parse(localStorage.getItem('user'));
  if(!token ) return <Navigate to="/" />;
  if(user?.is_admin) return <Navigate to="/admin/dashboard" />;
  return children;
};

function App(){
    return(
      <BrowserRouter>
        <Routes>
           {/* Public */}
          <Route path="/" element={<Login/>} />

          {/* Employee Routes */}
          <Route path="/dashboard" element={
            <EmployeeRoute><Dashboard/></EmployeeRoute>
          } />
          <Route path="/apply-leave" element={
            <EmployeeRoute><ApplyLeave /></EmployeeRoute>
          }/>

           {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AdminRoute><AdminDashboard/></AdminRoute>
          } />
        </Routes>
      </BrowserRouter>
    );
};

export default App;
