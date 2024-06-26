import React, { useState, useEffect } from 'react';
import NavBar from './MyNavBar';
import '../styles/UserPage.css';

const UserPage = ({ userData }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [emailState, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagen2, setImagen2] = useState(null);
    const [imagenBase64, setImagenBase64] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        if (userData) {
            setNombre(userData.name || '');
            setApellido(userData.lastname || '');
            setEdad(userData.age || '');
            setTelefono(userData.telephone || '');
            setDireccion(userData.address || '');
            setEmail(userData.email || '');
            setImagen(userData.imgProfile || null);
            setFecha(userData.registrationDate || '');
        }
    }, [userData]);

    const handleImagenChange = (event) => {
        const imagenSeleccionada = event.target.files[0];
        if (imagenSeleccionada) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagen2(URL.createObjectURL(imagenSeleccionada));
                setImagenBase64(reader.result.split(',')[1]); // Extraer solo la parte base64
            };
            reader.readAsDataURL(imagenSeleccionada);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const id = localStorage.getItem('uid');

        const data = {
            name: nombre,
            lastname: apellido,
            email: emailState,
            password: contrasena,
            address: direccion,
            imgProfile: imagenBase64,
            telephone: telefono,            
            age: edad,
            uid:id
        };

        try {
            const response = await fetch('http://localhost:5000/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (responseData.ok === true) {
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

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="containeruserpage">
                <div className="cuadradouserpage">
                    <div className="contornouserpage">
                        <h1 className='titulouserpage'>Mi Perfil</h1>
                        <label className='labelsignup'>Fecha de creacion:{fecha} </label>
                        <img className='container-imguserpage' src={imagen} alt="Descripción de la imagen" />
                    </div>
                </div>
                <div className="cuadradouserpage">
                    <form onSubmit={handleSubmit}>
                        <div className='contornouserpagedata'>
                            <div className='mb-3'>
                                <label className='labelsignup'>Nombre: </label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="text" name="Nombre" placeholder="Ingrese nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Apellido: </label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="text" name="Apellido" placeholder="Ingrese apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Edad: </label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="number" name="Edad" placeholder="Ingrese edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Telefono: </label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="number" name="Telefono" placeholder="Ingrese telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Dirección: </label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="text" name="Direccion" placeholder="Ingrese su direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Correo: </label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="email" name="Email" placeholder="Ingrese su correo" value={emailState} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='labelsignup'>Contraseña</label>
                            </div>
                            <div className='mb-3'>
                                <input className='inputsignup' type="password" name="Contrasenia" placeholder="Ingrese su contraseña para confirmar" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <button type="submit" className="butonsignup">
                                    Actualizar datos
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="cuadradouserpage">
                    <form onSubmit={handleSubmit}>
                        <div className="contornouserpagedataimage">
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
                            {imagen2 && (
                                <img src={imagen2} alt="Imagen seleccionada" className="container-imguserpage" />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
