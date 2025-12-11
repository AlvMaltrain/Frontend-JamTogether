import React, { useState } from "react";
import "../styles/artistasDestacados.css";

export default function ArtistasDestacados({
  artistas = [], 
  titulo = "Artistas Destacados", 
  layout = "vertical", 
}) {
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);

  const mostrarInstrumentos = (instrumentsArray) => {
      if (!instrumentsArray || instrumentsArray.length === 0) return "Músico";
      return instrumentsArray[0].nombreInstrumento + (instrumentsArray.length > 1 ? "..." : "");
  };

  const obtenerImagen = (artista) => {
    if (artista.imageUrl && artista.imageUrl.trim() !== "") {
        return artista.imageUrl;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(artista.nombrePublico)}&background=random&color=fff&size=200&bold=true`;
  };

  return (
    <section className="artistas-destacados">
      {/* Solo mostramos el título si no está vacío */}
      

      <div className={`cards-container ${layout}`}>
        {artistas.map((artista) => (
          <div className={`card ${layout}`} key={artista.id} onClick={() => setArtistaSeleccionado(artista)}>
            
            <img
                src={obtenerImagen(artista)}
                alt={artista.nombrePublico}
                className="card-img"
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artista.nombrePublico)}&background=random`;
                }}
            />

            {layout === "vertical" ? (
                // --- HOME (Compacto) ---
                <div className="card-info-minimal">
                    <h3 className="nombreBanda">{artista.nombrePublico}</h3>
                    <h4 className="estiloBanda">{mostrarInstrumentos(artista.instruments)}</h4>
                    <p className="ciudad-mini">{artista.ubicacion}</p>
                </div>
            ) : (
                // --- BÚSQUEDA (Completo con Descripción y Pin) ---
                <div className="card-content">
                    <h3 className="nombreBanda">{artista.nombrePublico}</h3>
                    <h4 className="estiloBanda">{mostrarInstrumentos(artista.instruments)}</h4>
                    
                    {/* Ubicación con Icono */}
                    <p className="ciudad-mini">📍 {artista.ubicacion}</p>
                    
                    {/* Descripción (Bio) */}
                    <p className="descripcion-busqueda">
                        {artista.bio || "Sin biografía disponible."}
                    </p>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {artistaSeleccionado && (
        <div className="modal-overlay" onClick={() => setArtistaSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setArtistaSeleccionado(null)}>✖</button>
            <img src={obtenerImagen(artistaSeleccionado)} alt="" className="modal-img" />
            <h2 className="tituloBanda-card">{artistaSeleccionado.nombrePublico}</h2>
            
            <div className="modal-extra">
              <p><strong>Instrumentos:</strong> {artistaSeleccionado.instruments?.map(i => i.nombreInstrumento).join(", ")}</p>
              <p><strong>Ubicación:</strong> {artistaSeleccionado.ubicacion}</p>
              <p><strong>Biografía:</strong></p>
              <p className="descripcionBanda-card">{artistaSeleccionado.bio || "Sin biografía."}</p>
            </div>
            <button className="contact-btn">Contactar Artista</button>
          </div>
        </div>
      )}
    </section>
  );
}