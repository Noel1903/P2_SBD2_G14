import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../src/general/components/HomePage';
import SignupUser from '../src/general/components/Signup';
import LoginUser from "../src/general/components/Login";
import UserPage from "../src/UserData/components/UserPage";
//user routes
import UserAuthors from "../src/UserData/components/UserAuthors";
import UserBooks from "../src/UserData/components/UserBooks";
import UserCart from "../src/UserData/components/UserCart";
import UserReview from './UserData/components/UserReview';
import UserHistory from './UserData/components/UserHistory';
//administrador
import AdminPagePrincipal from "../src/AdminData/components/AdminPage";
import Report from "../src/AdminData/components/Report";
import Historial from "../src/AdminData/components/Historial";
import AdminAutores from "../src/AdminData/components/AdminAutores";
import AdminLibros from "../src/AdminData/components/AdminLibros";
import PrivateRoute from '../src/auth/PrivateRoute';
import PrivateRouteAdmin from '../src/auth/PrivateRouteAdmin';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem('uid');
        if (id) {
          const response = await fetch(`http://localhost:5000/api/user/profile/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const responseData = await response.json();

          if (response.ok) {
            const { name, lastname, email, imgProfile, address, telephone, age, registrationDate } = responseData.userProfile;
            const userDataFormatted = {
              name,
              lastname,
              email,
              imgProfile,
              address,
              telephone,
              age,
              registrationDate
            };
            setUserData(userDataFormatted);
          } else {
            throw new Error('Error al obtener los datos del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupUser />} />
          <Route path='/login' element={<LoginUser />} />
          {/* Rutas protegidas */}
          <Route path='/userpage' element={<PrivateRoute><UserPage userData={userData} /></PrivateRoute>} />
          <Route path='/adminpage' element={<PrivateRouteAdmin><AdminPagePrincipal /></PrivateRouteAdmin>} />
          <Route path='/report' element={<PrivateRouteAdmin><Report /></PrivateRouteAdmin>} />
          <Route path='/historial' element={<PrivateRouteAdmin><Historial /></PrivateRouteAdmin>} />
          <Route path='/adminlibros' element={<PrivateRouteAdmin><AdminLibros /></PrivateRouteAdmin>} />
          <Route path='/adminautores' element={<PrivateRouteAdmin><AdminAutores /></PrivateRouteAdmin>} />
          <Route path='/userauthors' element={<PrivateRoute><UserAuthors /></PrivateRoute>} />
          <Route path='/userbooks' element={<PrivateRoute><UserBooks /></PrivateRoute>} />  
          <Route path='/usercart' element={<PrivateRoute><UserCart /></PrivateRoute>} />
          <Route path='/userreview' element={<PrivateRoute><UserReview /></PrivateRoute>} />
          <Route path='/userhistory' element={<PrivateRoute><UserHistory /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
