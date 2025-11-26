import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarBuscarArtistas from "../components/SideBarBuscarArtistas";
import ArtistasDestacados from "../components/ArtistasDestacados";
import api from "../api/axiosConfig"; // Importamos la configuración de Axios
import "../styles/buscarBandas.css"; 
import "../styles/buscarArtistas.css";

export default function BuscarArtistas() {
  // Estado de filtros (inputs del usuario)
  const [filtros, setFiltros] = useState({
    nombre: "",
    instrumento: "",
    ciudad: "",
    descripcion: "",
  });

  // Estados para manejo de datos
  const [todosLosArtistas, setTodosLosArtistas] = useState([]); // La lista completa original traída del backend
  const [artistasFiltrados, setArtistasFiltrados] = useState([]); // La lista filtrada que se muestra
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Cargar artistas desde el Backend al iniciar
  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        // Llamada al endpoint GET /api/profiles
        const response = await api.get('/api/profiles');
        
        setTodosLosArtistas(response.data);
        setArtistasFiltrados(response.data); // Inicialmente se muestra todo
      } catch (err) {
        console.error("Error al cargar artistas:", err);
        setError("Hubo un problema al cargar la comunidad de artistas.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistas();
  }, []);

  // 2. Función de Filtrado adaptada al backend
  const aplicarFiltro = () => {
    const norm = (s) => s?.toString().trim().toLowerCase() || "";

    const filtradas = todosLosArtistas.filter((artista) => {
      
      // Filtro por Nombre (Backend: nombrePublico)
      const nombreMatch =
        !filtros.nombre || norm(artista.nombrePublico).includes(norm(filtros.nombre));

      // Filtro por Ciudad (Backend: ubicacion)
      const ciudadMatch =
        !filtros.ciudad || norm(artista.ubicacion).includes(norm(filtros.ciudad));

      // Filtro por Descripción/Bio (Backend: bio)
      const bioMatch = 
        !filtros.descripcion || norm(artista.bio).includes(norm(filtros.descripcion));

      // Filtro por Instrumento (Backend: instruments es un ARRAY de objetos)
      // Verificamos si al menos uno de los instrumentos del artista coincide con la búsqueda
      const instrumentoMatch =
        !filtros.instrumento ||
        (artista.instruments && artista.instruments.some(inst => 
            norm(inst.nombreInstrumento).includes(norm(filtros.instrumento))
        ));

      return nombreMatch && instrumentoMatch && ciudadMatch && bioMatch;
    });

    setArtistasFiltrados(filtradas);
  };

  return (
    <div className="app-container">
      <Navbar />

      {/* Sidebar con filtros - Pasamos la función aplicarFiltro */}
      <SidebarBuscarArtistas
        filtros={filtros}
        setFiltros={setFiltros}
        aplicarFiltro={aplicarFiltro}
      />

      <div className="main-content-search"> 
          {/* Mensajes de Estado (Carga y Error) */}
          {loading && <p style={{textAlign: 'center', marginTop: '50px'}}>Cargando artistas...</p>}
          
          {error && (
            <div style={{textAlign: 'center', marginTop: '50px', color: '#666'}}>
                <p>{error}</p>
            </div>
          )}

          {/* Resultados */}
          {!loading && !error && (
            artistasFiltrados.length > 0 ? (
                <ArtistasDestacados
                  artistas={artistasFiltrados}
                  layout="horizontal" 
                  placeholderImage="https://via.placeholder.com/150?text=Artista"
                />
            ) : (
                <p style={{textAlign: 'center', marginTop: '50px'}}>
                    No se encontraron artistas con esos criterios.
                </p>
            )
          )}
      </div>

      <Footer />
    </div>
  );
}