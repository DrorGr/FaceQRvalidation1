import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import { Routes, HashRouter, Navigate, Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import ValidationPage from "./Components/Pages/ValidationPage";
import RegistratioPage from "./Components/Pages/RegistratioPage";
import MissingPage from "./Components/Pages/MissingPage";
import VideoBackground from "./Components/VideoBackground";
import video from "./assets/backgraund/background-video4.mp4";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App-header">
      <HashRouter>
        <SnackbarProvider
          anchorOrigin={{
            // vertical: "top",
            // horizontal: "right",
            vertical: "top",
            horizontal: "center",
          }}
          maxSnack={5}
        >
          <ResponsiveAppBar />
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="*" element={<ValidationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/validation" element={<ValidationPage />} />
            <Route path="/registration" element={<RegistratioPage />} />
            <Route path="/missing" element={<MissingPage />} />
          </Routes>
        </SnackbarProvider>
      </HashRouter>
    </div>
  );
}

export default App;
