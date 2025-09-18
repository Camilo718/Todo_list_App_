import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usuarios } from "../db";
import SearchInput from "./pages/buscador";
import Listas from "./pages/listas"; // Import the Listas component
import "./App.css";

// Icon for user
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

function App() {
  // Estados de login (se mantienen igual)
  const [username, setUsername] = useState(() => localStorage.getItem("usuarioActual") || "");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("usuarioActual"));

  // Estado del buscador (se mantiene en App para controlar el header)
  const [searchQuery, setSearchQuery] = useState("");

  // --- Login --- (se mantiene igual)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const userFound = usuarios.find((user) => user.username === username && user.password === password);
    if (userFound) {
      setMensaje("Login exitoso. Redirigiendo...");
      localStorage.setItem("usuarioActual", username);
      setIsLoggedIn(true);
    } else {
      setMensaje("Usuario o contraseña incorrectos");
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMensaje("");
    localStorage.removeItem("usuarioActual");
  };

  // --- Vista si ya está logueado (COMPLETAMENTE REFACTORIZADA) ---
  if (isLoggedIn) {
    return (
      <div className="w-full min-h-screen bg-gray-50 text-gray-800">
        <header className="flex justify-between items-center p-4 sm:p-6 bg-white shadow-md">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <UserIcon />
            <span className="font-semibold text-lg hidden sm:block">¡Bienvenido, {username}!</span>
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-4 max-w-lg">
            <SearchInput onSearch={setSearchQuery} />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Cerrar Sesión
          </button>
        </header>

        <main className="p-4 sm:p-8">
          <Listas autorActual={username} searchQuery={searchQuery} />
        </main>
      </div>
    );
  }

  // --- Vista si no está logueado (se mantiene igual) ---
  return (
    <div className="app-container">
      <AnimatePresence>
        <motion.div
          className="login-card"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -40 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="login-header">
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              Iniciar Sesión
            </motion.h1>
            <motion.p initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              Accede a tu cuenta
            </motion.p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <motion.div className="input-group" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
                disabled={isLoading}
              />
            </motion.div>
            <motion.div className="input-group" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                disabled={isLoading}
              />
            </motion.div>
            <motion.button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Entrar"}
            </motion.button>
          </form>
          {mensaje && (
            <motion.div
              key="mensaje"
              className={`mensaje ${mensaje.includes("exitoso") ? "success" : "error"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {mensaje}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;