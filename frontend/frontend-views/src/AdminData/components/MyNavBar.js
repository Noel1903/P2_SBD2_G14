import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import '../styles/MyNavBar.css';

const MyNavbar2 = () => {

  const handleLogout = () => {
    // Eliminar el admin del almacenamiento local al cerrar sesión
    localStorage.removeItem('uid');
    localStorage.removeItem('role');    
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = "/";
  };

  return (
      <div className="navbar2">
        <NavLink to="/adminpage" className="nav-button2">Inicio</NavLink>
         {/* Aqui agrega el el link de sus paginas y quitar /adminpage y poner la que ponen en el app.js */}
        <NavLink to="/Report" className="nav-button2">Reporte Libros</NavLink>
        <NavLink to="/adminautores" className="nav-button2">Autores</NavLink>
        <NavLink to="/adminlibros" className="nav-button2">Libros</NavLink>  
        <NavLink to="/historial" className="nav-button2">Historial de Compras</NavLink> 
        <NavLink to="/" className="nav-button2" onClick={handleLogout}>Cerrar sesión</NavLink>
      </div>
  );
};

export default MyNavbar2;