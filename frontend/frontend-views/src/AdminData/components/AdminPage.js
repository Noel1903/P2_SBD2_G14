import React from 'react'
import NavBar from './MyNavBar';
import '../styles/AdminPage.css';

const AdminPage = () => {

    return (
        <div>
            <NavBar />
            <div className="containereditperfil">
                <h1 className='tituloEditPerfil'>Bienvenido Administrador</h1>
            </div>
        </div>
    );
}

export default AdminPage;