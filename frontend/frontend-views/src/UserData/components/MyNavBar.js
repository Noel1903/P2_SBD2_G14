import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import '../styles/MyNavBar.css';

const MyNavbar2 = () => {

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('uid');
    localStorage.removeItem('role');
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = "/";
  };

  return (
      <div className="navbar2">
        <NavLink to="/userpage" className="nav-button2">Mi Perfil</NavLink>
         {/* Aqui agrega el el link de sus paginas y quitar /userpage y poner la que ponen en el app.js */}
        <NavLink to="/userpage" className="nav-button2">Autores</NavLink>
        <NavLink to="/userpage" className="nav-button2">Catalogo</NavLink>  
        <NavLink to="/userpage" className="nav-button2">Carrito</NavLink>
        <NavLink to="/userpage" className="nav-button2">Historial de Compras</NavLink>     
        <NavLink to="/userpage" className="nav-button2">Escribir Reseña</NavLink>       
        <NavLink to="/" className="nav-button2" onClick={handleLogout}>Cerrar sesión</NavLink>
      </div>
  );
};

export default MyNavbar2;