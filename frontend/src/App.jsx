import React from 'react';
import RoleSelector from './Pages/RoleSelector';
import { Route, Routes } from 'react-router-dom';
import RestaurentDashboard from './Pages/RestaurentDashboard';
import { ToastContainer } from 'react-toastify';
import UserLogin from './Pages/UserLogin';
import UserDashBoard from './Pages/UserDashBoard';
import RestaurantOwnerLogin from './Pages/RestaurentOwnerLogin';
import ProtectedLoginRoute from './Components/ProtectedLoginRoute';
import RestaurantSelection from './Pages/RestaurantSelection';

function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={6000} />
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/userLogin" element={
           <ProtectedLoginRoute>
        <UserLogin />
      </ProtectedLoginRoute> } />
        <Route path="/RestaurentDashbord" element={<RestaurentDashboard />} />
        <Route path="userDashBoard" element={<UserDashBoard />} />
        <Route path="/select-restaurant" element={<RestaurantSelection />} />


        <Route path="/ownerLogin" element={<RestaurantOwnerLogin />} />
      </Routes>
 
    </>
  );
}

export default App;
