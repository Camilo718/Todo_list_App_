import { useState } from 'react'; // Importa el hook useState de React para manejar estados locales
import { motion, AnimatePresence } from 'framer-motion'; // Importa componentes para animaciones
import { usuarios } from '../db'; // Importa un arreglo de usuarios desde un archivo local llamado db.js
import './App.css'; // Importa el archivo de estilos CSS  para este componente

function App() {
  // Estados del componente:
  const [username, setUsername] = useState(() => localStorage.getItem('usuarioActual') || ''); // Guarda el nombre de usuario; si ya hay uno guardado en localStorage lo usa
  const [password, setPassword] = useState(''); // Guarda la contraseña ingresada
  const [mensaje, setMensaje] = useState(''); // Guarda mensajes de error o éxito
  const [isLoading, setIsLoading] = useState(false); // Indica si el login está en proceso (cargando)
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('usuarioActual')); // Indica si el usuario está logueado actualmente

  // Función que se ejecuta cuando se envía el formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    setIsLoading(true); // Activa el estado de cargando
    setMensaje(''); // Limpia mensajes anteriores

    await new Promise(resolve => setTimeout(resolve, 500)); // Simula un pequeño retraso de 500ms para mejor experiencia visual

    const userFound = usuarios.find( // Busca en el arreglo de usuarios
      (user) => user.username === username && user.password === password // Compara si el usuario y contraseña coinciden
    );

    if (userFound) { // Si encontró un usuario válido
      setMensaje(" Login exitoso. Redirigiendo..."); // Cambia el mensaje
      localStorage.setItem("usuarioActual", username); // Guarda el usuario en el almacenamiento local
      setIsLoggedIn(true); // Marca como usuario logueado

      setTimeout(() => { // Espera 1.5 segundos
        console.log('Usuario logueado:', username); // Solo muestra en consola el usuario logueado (aquí se podría redirigir a otra página)
      }, 1500);
    } else {
      setMensaje(" Usuario o contraseña incorrectos"); // Si no se encontró el usuario, muestra error
    }

    setIsLoading(false); // Termina el estado de cargando
  };

  // Si el usuario está logueado, muestra la pantalla de bienvenida
  if (isLoggedIn) {
    return (
      <AnimatePresence> {/* Contenedor para animaciones de entrada/salida */}
        <motion.div
          style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none', boxShadow: 'none', border: 'none' }}
          initial={{ opacity: 0, y: 40 }} // Animación inicial (opacidad 0, desplazado hacia abajo)
          animate={{ opacity: 1, y: 0 }} // Animación cuando aparece
          exit={{ opacity: 0, y: -40 }} // Animación al salir
          transition={{ duration: 0.7, type: 'spring' }} // Duración y tipo de animación
        >
          <motion.h1
            style={{ fontSize: '2.5rem', color: '#222', fontWeight: 'bold', marginBottom: '18px', textAlign: 'center' }}
            initial={{ opacity: 0, x: -30 }} // Aparece desde la izquierda
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >¡Bienvenido, {username}!</motion.h1>
          <motion.p
            style={{ fontSize: '1.2rem', color: '#555', marginBottom: '32px', textAlign: 'center' }}
            initial={{ opacity: 0, x: 30 }} // Aparece desde la derecha
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >Has iniciado sesión correctamente.</motion.p>
          <motion.button
            onClick={() => { // Cuando se presiona el botón de cerrar sesión
              setIsLoggedIn(false); // Cambia estado a no logueado
              setUsername(''); // Limpia el nombre de usuario
              setPassword(''); // Limpia la contraseña
              setMensaje(''); // Limpia mensajes
              localStorage.removeItem("usuarioActual"); // Borra el usuario guardado en el almacenamiento local
            }}
            className="logout-btn" // Clase CSS
            style={{ fontSize: '1.1rem', padding: '14px 32px', borderRadius: '12px', background: '#222', color: '#fff', fontWeight: 'bold', border: 'none', boxShadow: '0 2px 12px rgba(33,147,176,0.15)', marginTop: '10px' }}
            whileHover={{ scale: 1.05 }} // Efecto al pasar el cursor
            whileTap={{ scale: 0.95 }} // Efecto al hacer clic
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Cerrar Sesión
          </motion.button>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Si el usuario no está logueado, muestra el formulario de login
  return (
    <div className="app-container"> {/* Contenedor principal */}
      <AnimatePresence>
        <motion.div
          className="login-card" // Tarjeta de login
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -40 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <div className="login-header"> {/* Encabezado del login */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >Iniciar Sesión</motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >Accede a tu cuenta</motion.p>
          </div>

          {/* Formulario de login */}
          <form onSubmit={handleSubmit} className="login-form">
            <motion.div className="input-group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label htmlFor="username">Usuario</label> {/* Etiqueta para el campo usuario */}
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Actualiza el estado de username
                placeholder="Ingresa tu usuario"
                required
                disabled={isLoading} // Desactiva si está cargando
              />
            </motion.div>

            <motion.div className="input-group"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de password
                placeholder="Ingresa tu contraseña"
                required
                disabled={isLoading}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="login-btn"
              disabled={isLoading}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.6, duration: 0.4, type: 'spring', stiffness: 300 }}
            >
              {isLoading ? 'Iniciando sesión...' : 'Entrar'} {/* Cambia el texto según el estado */}
            </motion.button>
          </form>

          <AnimatePresence>
            {mensaje && (
              <motion.div
                key="mensaje"
                className={`mensaje ${mensaje.includes('✅') ? 'success' : 'error'}`} // Muestra mensaje de error o éxito
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {mensaje}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App; // Exporta el componente para que pueda ser usado en otros archivos