import React from 'react';
import './App.css';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import LoginPage from './Components/Pages/LoginPage';
import VerificationPage from './Components/Pages/Verification';
import RegistrationPage from './Components/Pages/RegistrationPage';
import { SnackbarProvider } from 'notistack';

function App() {
  const location = useLocation();
  const pathnames = ['/HOME', '/VERIFICATION', '/REGISTRATION'];
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        maxSnack={5}
      >
        {pathnames.includes(location.pathname.toUpperCase()) && (
          <>
            <ResponsiveAppBar location={location.pathname} />
            <p style={{ color: '#000', position: 'absolute', bottom: -7, left: 18 }}>V.1.0</p>
          </>
        )}
        <Routes>
          <Route index path='/*' element={<LoginPage />} />
          <Route exact path='/Home' element={<HomePage />} />
          <Route exact path='/Verification' element={<VerificationPage />} />
          <Route exact path='/Registration' element={<RegistrationPage />} />   
        </Routes>
      </SnackbarProvider>
    </>
  );
}

export default App;
