import React, { useState } from "react";
import "../styles/bandasDestacadas.css";

export default function BandasDestacadas({ 
  bandas = [], 
  titulo = "Bandas Destacadas", 
  layout = "vertical",
}) {
  const [bandaSeleccionada, setBandaSeleccionada] = useState(null);

  const mostrarGeneros = (listaGeneros) => {
      if (!listaGeneros || listaGeneros.length === 0) return "Sin género";
      return listaGeneros[0].nombreGenero + (listaGeneros.length > 1 ? "..." : "");
  };

  const obtenerImagen = (banda) => {
    if (banda.imageUrl && banda.imageUrl.trim() !== "") {
        return banda.imageUrl;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(banda.nombreBanda)}&background=random&color=fff&size=200&rounded=false&bold=true`;
  };

  return (
    <section className="bandas-destacadas">


      <div className={`cards-container ${layout}`}>
        {bandas.map((banda) => (
          <div className={`card ${layout}`} key={banda.id} onClick={() => setBandaSeleccionada(banda)}>
            
            <img 
                src={obtenerImagen(banda)} 
                alt={banda.nombreBanda} 
                className="card-img" 
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(banda.nombreBanda)}&background=random&color=fff&size=200&rounded=false&bold=true`;
                }}
            />

            {layout === "vertical" ? (
                // --- VISTA HOME ---
                <div className="card-info-minimal">
                    <h3 className="nombreBanda">{banda.nombreBanda}</h3>
                    <h4 className="estiloBanda">{mostrarGeneros(banda.genres)}</h4>
                    <p className="ciudad-mini">{banda.ubicacion}</p>
                </div>
            ) : (
                // --- VISTA BÚSQUEDA ---
                <div className="card-content">
                    <h3 className="nombreBanda">{banda.nombreBanda}</h3>
                    <h4 className="estiloBanda">{mostrarGeneros(banda.genres)}</h4>
                    <p className="ciudad-mini">📍 {banda.ubicacion}</p>
                    <p className="descripcion-busqueda">
                        {banda.descripcion || "Sin descripción disponible."}
                    </p>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL DE DETALLE */}
      {bandaSeleccionada && (
        <div className="modal-overlay" onClick={() => setBandaSeleccionada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setBandaSeleccionada(null)}>✖</button>
            
            <img 
                src={obtenerImagen(bandaSeleccionada)} 
                alt={bandaSeleccionada.nombreBanda} 
                className="modal-img" 
            />
            
            <h2 className="tituloBanda-card">{bandaSeleccionada.nombreBanda}</h2>
            <h4 className="estiloCiudad-card">
                {mostrarGeneros(bandaSeleccionada.genres)} / {bandaSeleccionada.ubicacion}
            </h4>
            
            <div className="modal-extra">
              <p><strong>Descripción:</strong></p>
              <p className="descripcionBanda-card">{bandaSeleccionada.descripcion}</p>
              <p><strong>Buscan:</strong> {bandaSeleccionada.seekingInstruments?.map(i => i.nombreInstrumento).join(", ")}</p>
            </div>

            <button className="contact-btn">Contactar Banda</button>
          </div>
        </div>
      )}
    </section>
  );
}