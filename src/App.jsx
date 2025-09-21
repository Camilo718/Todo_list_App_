import React, { useState } from "react";
import { AnimatePresence } from "framer-motion"; // <-- AGREGA ESTA LÍNEA
import { usuarios } from "../db";
import SearchInput from "./pages/buscador";
import Listas from "./pages/listas";


// Icon for user
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

function App() {
  const [username, setUsername] = useState(() => localStorage.getItem("usuarioActual") || "");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("usuarioActual"));

  const [searchQuery, setSearchQuery] = useState("");

  // --- Login ---
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

  // --- Vista logueado ---
  if (isLoggedIn) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-800">
        <header className="flex justify-between items-center p-4 sm:p-6 bg-white/70 backdrop-blur-md shadow-md rounded-b-xl">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <UserIcon />
            <span className="font-semibold text-lg hidden sm:block text-blue-700">
              ¡Bienvenido, {username}!
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-4 max-w-lg">
            <SearchInput onSearch={setSearchQuery} />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all font-semibold"
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

  // --- Vista login ---
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 font-sans">
      <AnimatePresence>
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -40 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="text-center mb-6">
            <motion.h1
              className="text-2xl font-bold text-blue-700"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Iniciar Sesión
            </motion.h1>
            <motion.p
              className="text-gray-600 mt-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Accede a tu cuenta
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <label htmlFor="username" className="block text-sm font-semibold text-blue-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <label htmlFor="password" className="block text-sm font-semibold text-blue-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all"

            >
              {isLoading ? "Iniciando sesión..." : "Entrar"}
            </motion.button>
          </form>

          {mensaje && (
            <motion.div
              key="mensaje"
              className={`mt-4 text-center font-semibold ${
                mensaje.includes("exitoso") ? "text-green-600" : "text-red-600"
              }`}
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
