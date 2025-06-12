import React from 'react';
import RoleSelector from './Pages/RoleSelector';
import { Route, Routes } from 'react-router-dom';
import RestaurentDashboard from './Pages/RestaurentDashboard';
import { ToastContainer } from 'react-toastify';
import UserLogin from './Pages/UserLogin';
import UserDashBoard from './Pages/UserDashBoard';

function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={6000} />
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/RestaurentDashbord" element={<RestaurentDashboard />} />
        <Route path="userDashBoard" element={<UserDashBoard />} />
      </Routes>
 
    </>
  );
}

export default App;
