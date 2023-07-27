import React from 'react';
import './App.css';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { Routes, HashRouter, Route } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import VerificationPage from './Components/Pages/Verification';
import RegistrationPage from './Components/Pages/RegistratioPage';

import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className='App-header'>
      <HashRouter>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          maxSnack={5}
        >
          <ResponsiveAppBar />
          <Routes>
            <Route exact path='/Home' element={<HomePage />} />
            <Route index exact path='/*' element={<HomePage />} />
            <Route exact path='/Verification' element={<VerificationPage />} />
            <Route exact path='/registration' element={<RegistrationPage />} />
          </Routes>
        </SnackbarProvider>
      </HashRouter>
      <p style={{ color: '#000', position: 'absolute', bottom: -7, left: 18 }}>V.1.0</p>
    </div>
  );
}

export default App;
