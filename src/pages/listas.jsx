import { useState, useEffect } from "react";
import TodoItem from "./tdoItem";
import TaskModal from "../components/TaskModal";

/**
 * Componente Listas: Maneja la lista de tareas, paginación y modal de detalles.
 */
export default function Listas({ autorActual, searchQuery }) {
  // Estado para las tareas, texto del input y paginación
  const [tareas, setTareas] = useState(() => {
    // Opcional: Cargar tareas desde localStorage
    try {
      const localTareas = localStorage.getItem('tareas');
      return localTareas ? JSON.parse(localTareas) : [];
    } catch (error) {
      console.error("Error al parsear tareas desde localStorage", error);
      return [];
    }
  });
  const [texto, setTexto] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efecto para guardar tareas en localStorage cuando cambian
  useEffect(() => {
    try {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    } catch (error) {
      console.error("Error al guardar tareas en localStorage", error);
    }
  }, [tareas]);

  // --- Funciones para manejo de tareas ---
  const agregarTarea = () => {
    if (!texto.trim()) return;
    const newTareas = [
      ...tareas,
      {
        id: Date.now(),
        text: texto,
        autor: autorActual,
        completed: false,
      },
    ];
    setTareas(newTareas);
    setTexto("");
    const totalPages = Math.ceil(newTareas.length / tasksPerPage);
    setCurrentPage(totalPages || 1);
  };

  const toggleCompleted = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editarTarea = (id) => {
    const tareaAEditar = tareas.find(t => t.id === id);
    if (!tareaAEditar) return;
    const nuevoTexto = prompt("Nuevo texto de la tarea:", tareaAEditar.text);
    if (nuevoTexto && nuevoTexto.trim() !== tareaAEditar.text) {
        setTareas(
            tareas.map((t) =>
                t.id === id ? { ...t, text: nuevoTexto } : t
            )
        );
    }
  };

  const eliminarTarea = (id) => {
    const newTareas = tareas.filter((t) => t.id !== id);
    setTareas(newTareas);
    const totalPages = Math.ceil(newTareas.length / tasksPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (newTareas.length === 0) {
      setCurrentPage(1);
    }
  };

  // --- Lógica de filtrado y paginación ---
  const tareasFiltradas = tareas.filter((t) =>
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tareasFiltradas.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tareasFiltradas.length / tasksPerPage);

  // Efecto para resetear a página 1 cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
    }
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="full-page-container">
      {/* Formulario para agregar tarea */}
      <div className="bg-white border-2 border-gray-200 p-4 rounded-lg my-4 flex items-center gap-4 shadow-md max-w-full">
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          className="flex-grow p-2 text-black bg-transparent focus:outline-none"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
        />
        <button
          onClick={agregarTarea}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-transform transform hover:scale-105 active:scale-95 font-semibold"
        >
          Crear
        </button>
      </div>

      {/* Cuadrícula de tareas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full">
        {currentTasks.map((t) => (
          <TodoItem
            key={t.id}
            tarea={t}
            toggleCompleted={() => toggleCompleted(t.id)}
            onEditar={() => editarTarea(t.id)}
            onEliminar={() => eliminarTarea(t.id)}
            onSelect={() => handleSelectTask(t)}
          />
        ))}
      </div>
      
      {/* Mensaje cuando no hay tareas */}
      {tareas.length > 0 && tareasFiltradas.length === 0 && (
        <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">No se encontraron tareas</h3>
            <p className="text-gray-500">Intenta con otra búsqueda.</p>
        </div>
      )}

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white border-2 border-blue-500 text-blue-500'}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal para detalles de tarea */}
      {isModalOpen && selectedTask && (
        <TaskModal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
}
