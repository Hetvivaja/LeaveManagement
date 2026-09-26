import React from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApplyLeave from'./pages/ApplyLeave';
import AdminDashboard from './pages/AdminDashboard';
import Signup from './pages/Signup';

const AdminRoute=({children})=>{

  const token=localStorage.getItem('access_token');
  const user=JSON.parse(localStorage.getItem('user'));
  if(!token ) return <Navigate to="/" />;
  if(!user?.is_admin) return <Navigate to="/dashboard" />;
  return children;
};

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
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>}/>

          <Route path="/dashboard" element={
            <EmployeeRoute><Dashboard/></EmployeeRoute>
          } />
          <Route path="/apply-leave" element={
            <EmployeeRoute><ApplyLeave /></EmployeeRoute>
          }/>

          <Route path="/admin/dashboard" element={
            <AdminRoute><AdminDashboard/></AdminRoute>
          } />
        </Routes>
      </BrowserRouter>
    );
};

export default App;
