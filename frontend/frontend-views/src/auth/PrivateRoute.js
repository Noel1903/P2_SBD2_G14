import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const uid = localStorage.getItem('uid');
  const role = localStorage.getItem('role');
  
  const isLoggedIn = !!uid && !!role && role === '1'; // Verifica si uid y role existen y si role es igual a '1'
  
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
