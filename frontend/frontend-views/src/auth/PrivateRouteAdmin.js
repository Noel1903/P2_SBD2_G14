import { Navigate } from 'react-router-dom';
import React from 'react'

const PrivateRouteAdmin = ({ children }) => {
  //const isLoggedIn = !!localStorage.getItem('admin'); // Verifica si hay un token en el almacenamiento local
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRouteAdmin;