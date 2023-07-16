import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import { Routes, BrowserRouter, Navigate, Route } from "react-router-dom";
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
      <BrowserRouter>
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
            <Route path="/" element={<ValidationPage />} />
            <Route index path="*" element={<ValidationPage />} />
            <Route path="/validation" element={<ValidationPage />} />
            <Route path="/registration" element={<RegistratioPage />} />
            <Route path="/missing" element={<MissingPage />} />
          </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
