import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BuscarBandas from "./pages/BuscarBandas";
import BuscarArtistas from "./pages/BuscarArtistas";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/buscar-bandas" element={<BuscarBandas/>} />
        <Route path="/buscar-artistas" element={<BuscarArtistas />} />
        <Route path="/login" element={<LoginModal/>} />
        <Route path="/registro" element={<RegisterModal/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
