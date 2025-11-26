import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";

// 1. IMPORTAR EL PROVIDER
import { AuthProvider } from "./context/AuthContext"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*  Envolver <App /> */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);