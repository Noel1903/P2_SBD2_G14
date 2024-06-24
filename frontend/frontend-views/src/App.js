import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../src/general/components/HomePage';
import Signup from '../src/general/components/Signup';
import Login from "../src/general/components/Login";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        {/* Rutas protegidas */}
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
