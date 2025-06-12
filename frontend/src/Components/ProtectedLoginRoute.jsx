// src/components/ProtectedLoginRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedLoginRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('restaurantUser');
  return isAuthenticated ? <Navigate to="/UserDashBoard" /> : children;
}
