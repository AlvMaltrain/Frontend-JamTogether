import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarBuscarBandas from "../components/SidebarBuscarBandas";
import BandasDestacadas from "../components/BandasDestacadas";
import api from "../api/axiosConfig"; // Importamos la API
import "../styles/buscarBandas.css";

export default function BuscarBandas() {
  // Estado de filtros (inputs del usuario)
  const [filtros, setFiltros] = useState({ ciudad: "", estilo: "" });

  // Estados para manejo de datos
  const [todasLasBandas, setTodasLasBandas] = useState([]); // Lista completa del backend
  const [bandasFiltradas, setBandasFiltradas] = useState([]); // Lista filtrada para mostrar
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Cargar bandas desde el Backend al iniciar
  useEffect(() => {
    const fetchBandas = async () => {
      try {
        // Llamada al endpoint GET /api/bands
        const response = await api.get('/api/bands');
        
        setTodasLasBandas(response.data);
        setBandasFiltradas(response.data); // Inicialmente se muestran todas
      } catch (err) {
        console.error("Error al cargar bandas:", err);
        setError("Hubo un problema al cargar la lista de bandas.");
      } finally {
        setLoading(false);
      }
    };

    fetchBandas();
  }, []);

  // 2. Función de Filtrado adaptada al Backend
  const aplicarFiltro = () => {
    const norm = (s) => s?.toString().trim().toLowerCase() || "";

    const filtradas = todasLasBandas.filter((banda) => {
      
      // Filtro por Ciudad (Backend: ubicacion)
      const ciudadMatch =
        !filtros.ciudad || norm(banda.ubicacion).includes(norm(filtros.ciudad));

      // Filtro por Estilo/Género (Backend: genres es un ARRAY de objetos)
      // Verificamos si al menos uno de los géneros de la banda coincide
      const estiloMatch =
        !filtros.estilo ||
        (banda.genres && banda.genres.some(genero => 
            norm(genero.nombreGenero).includes(norm(filtros.estilo))
        ));

      return ciudadMatch && estiloMatch;
    });

    // Guardamos el resultado filtrado
    setBandasFiltradas(filtradas);
  };

  return (
    <div className="app-container">
      <Navbar />
      <h1 style={{textAlign: "center", margin: "20px 0"}}>Buscar Bandas</h1>

      {/* Sidebar con filtros */}
      <SidebarBuscarBandas
        filtros={filtros}
        setFiltros={setFiltros}
        aplicarFiltro={aplicarFiltro}
      />

      <div className="main-content-search">
          {/* Mensajes de Estado */}
          {loading && <p style={{textAlign: 'center', marginTop: '50px'}}>Cargando bandas...</p>}
          
          {error && (
            <div style={{textAlign: 'center', marginTop: '50px', color: '#666'}}>
                <p>{error}</p>
            </div>
          )}

          {/* Mostrar resultados */}
          {!loading && !error && (
             bandasFiltradas.length > 0 ? (
                <BandasDestacadas
                  bandas={bandasFiltradas}
                  layout="horizontal"
                  placeholderImage="https://via.placeholder.com/300x200?text=Banda"
                />
              ) : (
                  <p style={{textAlign: 'center', marginTop: '50px'}}>
                      No se encontraron bandas con esos criterios.
                  </p>
              )
          )}
      </div>

      <Footer />
    </div>
  );
}