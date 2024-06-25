import React from 'react';
//import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../src/general/components/HomePage';
import SignupUser from '../src/general/components/Signup';
import LoginUser from "../src/general/components/Login";
import LoginAdm from "../src/general/components/LoginAdmin";
import UserPageEdit from "../src/UserData/components/UserPage";
import AdminPagePrincipal from "../src/AdminData/components/AdminPage";
//import PrivateRoute from '../src/auth/PrivateRoute';
import PrivateRouteAdmin from '../src/auth/PrivateRouteAdmin';
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
        <Route path='/loginadmin' element={<LoginAdm />} />
        {/* Rutas protegidas */}
        <Route path='/userpage' element={<UserPageEdit />} />
        {/* <Route path='/userpage' element={<PrivateRoute><UserPage userData={userData} /></PrivateRoute>} /> ESTO ES POR SI VAN A PASAR DATOS LOS MANDAN DESDE AQUI*/}
        <Route path='/adminpage' element={<PrivateRouteAdmin><AdminPagePrincipal /></PrivateRouteAdmin>} />

      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
