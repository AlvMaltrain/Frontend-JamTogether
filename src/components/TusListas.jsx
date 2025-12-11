import React from "react";
import "../styles/tusListas.css";

export default function TusListas() {
  
  // Datos simulados
  const listas = [
    { id: 1, titulo: "Top 50", subtitulo: "Bandas mejor puntuadas", img: "https://www.laopinion.co/sites/default/files/2021-07/Rock.jpg" },
    { id: 2, titulo: "Novedades Rock", subtitulo: "Unidas recientemente", img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=400&q=80" },
    { id: 3, titulo: "Indie & Alternativo", subtitulo: "Descubrimientos", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" },
    { id: 4, titulo: "Bandas de los 80s", subtitulo: "Nostalgia pura", img: "https://lacarnemagazine.com/wp-content/uploads/2021/07/musica-romantica-cabecera-1200x675.jpg" },
    { id: 5, titulo: "Metal Pesado", subtitulo: "Potencia máxima", img: "https://media.istockphoto.com/id/1475104709/es/vector/folleto-colorido-vintage-de-heavy-metal.jpg?s=612x612&w=0&k=20&c=o5OQ3DC0Zee3kL5KuIAHjXXevmEOlhLeQnNgg6vicoo=" }
  ];

  return (
    <section className="tus-listas-section">
      <div className="container-listas">
        <div className="header-listas">
          <h2 className="titulo-seccion">Destacados</h2>
          <a href="#" className="ver-todas">Ver todas</a>
        </div>

        <div className="grid-listas">
          {listas.map((lista) => (
            <div key={lista.id} className="card-lista">
              <div className="img-wrapper">
                <img src={lista.img} alt={lista.titulo} />
                {/* Efecto Hover: Icono de Play */}
                <div className="play-overlay">
                    <span>▶</span>
                </div>
              </div>
              <h3 className="titulo-lista">{lista.titulo}</h3>
              <p className="subtitulo-lista">{lista.subtitulo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}