import React, { useState } from 'react';
import NavBar from './MyNavBar';
import imagen from '../img/user_signup.png';
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert('Por favor, llene todos los campos');
            return;
        }

        const data = {
            email: username,
            password: password
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
        
            if (responseData.ok === true) {
                // Redirigir a la página de inicio
                const { uid, role } = responseData.userLogin;
                console.log(responseData);
                alert("Bienvenido");
                localStorage.setItem('uid', uid); // Guardar el uid en el localStorage
                localStorage.setItem('role', role); // Guardar el role en el localStorage
                if (role === 1){
                    window.location.href = `/userpage`;
                }else{
                    window.location.href = `/adminpage`;
                }                
            } else {
                // Recargar la página
                alert("Error en el login: " + responseData.message);
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