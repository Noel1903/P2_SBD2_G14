import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import '../styles/MyNavBar.css';
const MyNavbar = () => {

  return (

    <div className="navbar_hpn">
        <NavLink to="/" className="nav-button_hpn">Inicio</NavLink>
        <NavLink to="/signup" className="nav-button_hpn">Registrarse</NavLink>
        <NavLink to="/login" className="nav-button_hpn">Inicio de Sesión</NavLink>
        <NavLink to="/loginadmin" className="nav-button_hpn">Inicio de Sesión administrador</NavLink>
        {/* Aqui agrega el inicio de administrador osea otro boton para redirigir a esa pagina*/}
    </div>

  );
};

export default MyNavbar;