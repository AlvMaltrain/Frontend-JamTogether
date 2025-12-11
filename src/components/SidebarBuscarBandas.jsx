import { useState } from "react";
import "../styles/Sidebar.css";
import React from "react";

export default function SidebarBuscarBandas({ filtros, setFiltros, aplicarFiltro}) {
//Manejamos los cambios en los inputs
const handleChange = (e) => {
  setFiltros({
    ...filtros,
    [e.target.name]: e.target.value, //actualiza el campo correspondiente

  });
};

  return (
    <aside className="sidebar-buscar">
      <ul className="filtros-lista">
        <li>
          <label className="genero">
            Estilo:
            <input type="text" name="estilo" value={filtros.estilo} onChange={handleChange} placeholder="Ej: Rock" />
          </label>
        </li>
        <li>
          <label>
            Ciudad:
            <input type="text" name="ciudad" value= {filtros.ciudad} onChange={handleChange} placeholder="Ej: Santiago" />
          </label>
        </li>
        <li>
          <button onClick={aplicarFiltro}>Filtrar</button>
        </li>
      </ul>
    </aside>
  );
}

