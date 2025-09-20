/* eslint-env jest */
/* eslint-env jest */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

jest.mock("../../db.js", () => ({
  usuarios: [
    { username: "Josthin", password: "160515" },
    { username: "Dilan", password: "202585" },
  ],
}));


describe("App Login", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  test("muestra formulario y permite login exitoso", async () => {
    render(<App />);

    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/usuario/i), "Josthin");
    await userEvent.type(screen.getByLabelText(/contraseña/i), "160515");

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    // Espera a que aparezca el mensaje de bienvenida
    await waitFor(() =>
      expect(screen.getByText(/¡bienvenido, josthin!/i)).toBeInTheDocument()
    );
  });

  test("muestra error con login incorrecto", async () => {
    render(<App />);

    await userEvent.type(screen.getByLabelText(/usuario/i), "wronguser");
    await userEvent.type(screen.getByLabelText(/contraseña/i), "wrongpass");

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() =>
      expect(screen.getByText(/usuario o contraseña incorrectos/i)).toBeInTheDocument()
    );
  });
});
