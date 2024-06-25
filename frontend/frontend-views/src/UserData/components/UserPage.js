import React, { useState } from 'react'
import NavBar from './MyNavBar';
import '../styles/UserPage.css';
import md5 from 'md5';

const UserPage = ({ userData }) => {
    const [nombre, setNombre] = useState(userData ? userData.nombreusuario : '');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenObject, setImagenObject] = useState(null);

    // Verificar si userData está definido y obtener los valores correspondientes
    const imagenperfil = userData ? userData.fotoperfil : '';

    const handleImagenChange = (event) => {
        const imagenSeleccionada = event.target.files[0];
        setImagenObject(event.target.files[0]);
        if (imagenSeleccionada) {
            setImagen(URL.createObjectURL(imagenSeleccionada));

        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const hashedPassword = md5(contrasena);
        const formData = new FormData();
        const Token = localStorage.getItem("token")
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('edad', edad);
        formData.append('telefono', telefono);
        formData.append('direccion', direccion);
        formData.append('email', email);
        formData.append('contrasena', hashedPassword);
        formData.append('foto_perfil', imagenObject);
        formData.append('token', Token);

        try {
            const response = await fetch('http://localhost:5000/editperfil/editperfil', {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();
            if (response.status === 200) {
                // Redirigir a la página de inicio
                alert("Actualizacion exitosa ", data.message);
                window.location.reload();
            } else {
                // Recargar la página
                alert("Error al actualizar", data.message);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al enviar solicitud:', error);
            // Recargar la página
            window.location.reload();
        }
    };

    return (
        <div>
            <NavBar />
            <div className="containereditperfil">
                <div className="cuadradoeditperfil">
                    <div className="contornoeditperfil">
                        <h1 className='tituloEditPerfil'>Mi Perfil</h1>
                        <img className='container-imgeditperfil' src={imagenperfil} alt="Descripción de la imagen" />
                    </div>
                </div>
                <div className="cuadradoeditperfil">
                    <form onSubmit={handleSubmit}>
                        <div className="contornoeditperfildataimage">
                            <div>
                                <label className="labelsignupedipperfil">Imagen</label>

                            </div>
                            <input
                                type="file"
                                className="labelsignupedipperfil"
                                id="imagen"
                                accept="image/*"
                                onChange={handleImagenChange}
                            />
                            {imagen && (
                                <img src={imagen} alt="Imagen seleccionada" className="container-imgeditperfil" />
                            )}
                        </div>
                    </form>
                </div>
                <div className="cuadradoeditperfil">
                    <form onSubmit={handleSubmit}>
                        <div className='contornoeditperfildata'>
                            <div className='mb-3'>
                                <label className='labelsignup'>Nombre</label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="text" name="Nombre" placeholder="Ingrese nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Apellido</label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="text" name="Apellido" placeholder="Ingrese apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required/>
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Edad</label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="number" name="Edad" placeholder="Ingrese edad" value={edad} onChange={(e) => setEdad(e.target.value)} required/>
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Telefono</label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="number" name="Telefono" placeholder="Ingrese telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required/>
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Dirección</label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="text" name="Direccion" placeholder="Ingrese su direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required/>
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Correo</label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="email" name="Email" placeholder="Ingrese su correo" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Contraseña</label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="password" name="Contrasenia" placeholder="Ingrese su contraseña para confirmar" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>
                            </div>
                            <div className='mb-3'>
                                <button type="submit" className="butonsignup">
                                    Actualizar datos
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserPage;