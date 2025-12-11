import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SidebarBuscarBandas from "../src/components/SidebarBuscarBandas"; // 

// Wrapper para simular el componente padre con estado real
function Wrapper({ initial = { estilo: "", ciudad: "" }, onFiltrar = () => {} }) {
  const [filtros, setFiltros] = React.useState(initial);
  return (
    <SidebarBuscarBandas
      filtros={filtros}
      setFiltros={setFiltros}
      aplicarFiltro={onFiltrar}
    />
  );
}

describe("SidebarBuscarBandas", () => {
  it("renderiza inputs y botón", () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText("Ej: Rock")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej: Santiago")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filtrar/i })).toBeInTheDocument();
  });

  it("actualiza los valores al tipear en Estilo y Ciudad", async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const estiloInput = screen.getByPlaceholderText("Ej: Rock");
    const ciudadInput = screen.getByPlaceholderText("Ej: Santiago");

    await user.clear(estiloInput);
    await user.type(estiloInput, "Metal");
    await user.clear(ciudadInput);
    await user.type(ciudadInput, "Valparaíso");

    expect(estiloInput).toHaveValue("Metal");
    expect(ciudadInput).toHaveValue("Valparaíso");
  });

  it("ejecuta aplicarFiltro al hacer click en 'Filtrar'", async () => {
    const user = userEvent.setup();
    const aplicarFiltro = vi.fn();

    render(<Wrapper onFiltrar={aplicarFiltro} />);

    await user.click(screen.getByRole("button", { name: /filtrar/i }));
    expect(aplicarFiltro).toHaveBeenCalledTimes(1);
  });
});
