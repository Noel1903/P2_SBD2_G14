import React from 'react';
import NavBar from './MyNavBar';
import '../styles/HomePage.css';
import imagen from '../img/libros.png';

const HomePage = () => {
    return (
        <div >
            <NavBar />
            <div className='container_hp'>
                <h1 className='titulo_hp'>BOOKSTORE</h1>
                <div>
                <img className='container-img_hp' src={imagen} alt="Nube de libros" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;