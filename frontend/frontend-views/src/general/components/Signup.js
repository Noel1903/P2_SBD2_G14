import React, { useState } from 'react';
import NavBar from './MyNavBar';
import '../styles/Signup.css';
import md5 from 'md5';

const Signup = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [fecha_registro, setFecha_Registro] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenObject, setImagenObject] = useState(null);

    const handleImagenChange = (event) => {
        const imagenSeleccionada = event.target.files[0];
        setImagenObject(event.target.files[0]);
        if (imagenSeleccionada) {
            setImagen(URL.createObjectURL(imagenSeleccionada));

        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        setFecha_Registro(formattedDate);
        const hashedPassword = md5(contrasena);
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('edad', edad);
        formData.append('telefono', telefono);
        formData.append('direccion', direccion);
        formData.append('email', email);
        formData.append('contrasena', hashedPassword);
        formData.append('fecha_registro', fecha_registro);
        formData.append('foto_perfil', imagenObject);

        try {

            const response = await fetch('http://localhost:5000/signup/signup', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 200) {
                // Redirigir a la página de inicio
                alert("Registro exitoso");
                window.location.href = '/';
            } else {
                // Recargar la página
                alert("Error en el registro");
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
            <form className='containerS' onSubmit={handleSubmit}>
                <div className='cuadradosignup'>
                    <div className='contornosignup'>
                        <div className='labelsignup'>
                            <label htmlFor="imagen">Imagen</label>
                        </div>
                        <input
                            type="file"
                            id="imagen"
                            accept="image/*"
                            onChange={handleImagenChange}
                            className='labelsignup'
                        />
                        {imagen && (
                            <img src={imagen} alt="Imagen seleccionada" className="container-imgS" />
                        )}
                    </div>
                </div>
                <div className='cuadradosignup'>
                    <div className='contornosignup'>
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
                            <input className='inputsignup' type="text" name="Direccion" placeholder="Ingrese su direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
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
                            <input className='inputsignup' type="password" name="Contrasenia" placeholder="Ingrese su contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className="butonsignup">
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;