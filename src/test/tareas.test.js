/* eslint-env jest */
/* eslint-env jest */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

beforeEach(() => {
  window.localStorage.clear();
});

describe("Gestión de tareas", () => {
  test("crear, editar y eliminar una tarea", async () => {
    // Login primero
    render(<App />);
    await userEvent.type(screen.getByLabelText(/usuario/i), "Josthin");
    await userEvent.type(screen.getByLabelText(/contraseña/i), "160515");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    await waitFor(() => expect(screen.getByText(/¡bienvenido, josthin!/i)).toBeInTheDocument());

    // Crear tarea
    const inputNuevaTarea = screen.getByPlaceholderText(/escribe una nueva tarea/i);
    await userEvent.type(inputNuevaTarea, "Tarea de prueba");
    await userEvent.click(screen.getByRole("button", { name: /crear/i }));
    expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();

    // Editar tarea (simula prompt)
    window.prompt = jest.fn().mockReturnValue("Tarea editada");
    await userEvent.click(screen.getByRole("button", { name: /editar/i }));
    expect(screen.getByText("Tarea editada")).toBeInTheDocument();
    expect(screen.getByText(/editado por: josthin/i)).toBeInTheDocument();

    // Eliminar tarea
    await userEvent.click(screen.getByRole("button", { name: /eliminar/i }));
    await waitFor(() => expect(screen.queryByText("Tarea editada")).not.toBeInTheDocument());
  });
});
