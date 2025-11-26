import React from "react";
import "../styles/buscarArtistas.css";



export default function SidebarBuscarArtistas({ filtros, setFiltros, aplicarFiltro }) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const limpiar = () =>
    setFiltros({ nombre: "", instrumento: "", ciudad: ""});

  return (
    <aside className="sidebar-filtros">

      <label>
        Nombre
        <input
          type="text"
          name="nombre"
          value={filtros.nombre}
          onChange={onChange}
          placeholder="Ej: Camila"
        />
      </label>

      <label>
        Instrumento
        <input
          type="text"
          name="instrumento"
          value={filtros.instrumento}
          onChange={onChange}
          placeholder="Ej: Guitarra, Voz…"
        />
      </label>

      <label>
        Ciudad
        <input
          type="text"
          name="ciudad"
          value={filtros.ciudad}
          onChange={onChange}
          placeholder="Ej: Santiago"
        />
      </label>

      <div className="sidebar-actions">
        <button onClick={aplicarFiltro}>Filtrar</button>
      </div>
    </aside>
  );
}
