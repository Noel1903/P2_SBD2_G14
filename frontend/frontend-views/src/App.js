import React from 'react';
//import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../src/general/components/HomePage';
import SignupUser from '../src/general/components/Signup';
import LoginUser from "../src/general/components/Login";
import UserPageEdit from "../src/UserData/components/UserPage";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupUser />} />
        <Route path='/login' element={<LoginUser />} />
        {/* Rutas protegidas */}
        <Route path='/userpage' element={<UserPageEdit />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
