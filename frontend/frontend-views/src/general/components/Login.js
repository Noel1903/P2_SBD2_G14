import React, { useState } from 'react';
import NavBar from './MyNavBar';
import imagen from '../img/user_signup.png';
import '../styles/Login.css';
import md5 from 'md5';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert('Por favor, llene todos los campos');
            return;
        }

        const hashedPassword = md5(password);
        const formData = new FormData();
        formData.append('nombre_usuario', username);
        formData.append('contrasena', hashedPassword);

        try {
            const response = await fetch('http://localhost:5000/signup/login', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 200) {
                // Redirigir a la página de inicio
                alert("Bienvenido");
                const data = await response.json();
                const token = data.token;
                console.log(token);
                localStorage.setItem('token', token);
                window.location.href = `/userpage`;
            } else {
                // Recargar la página
                alert("Lo siento, ingreso mal  usuario o contraseña.");
                window.location.reload();
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            window.location.reload();
        }
    };

    return (
        <div>
            <NavBar />
            <div className="containerL" >
                <form onSubmit={handleSubmit} className="contornoL">
                    <div className="image-containerl">
                        <img className='container-imgl' src={imagen} alt="Imagen de usuario" />
                    </div>
                    <label htmlFor="correo" className='labellogin'>Usuario:</label>
                    <div>
                        <input
                            className="inputlogin"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <label htmlFor="password" className='labellogin'>Contraseña:</label>
                    <div>
                        <input
                            type="password"
                            className='inputlogin'
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="butonlogin">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;