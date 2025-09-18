import PropTypes from 'prop-types';

// Componente TodoItem: Representa una tarea individual en la lista de tareas.
export default function TodoItem({ tarea, toggleCompleted, onEditar, onEliminar, onSelect }) {
    return (
        <div 
            onClick={onSelect}
            className={`
                w-full
                flex flex-col justify-between h-full gap-3 p-4 bg-white border-2 border-blue-500
                rounded-lg shadow-md
                transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1
                ${tarea.completed ? 'bg-gray-100' : ''}
            `}
        >
            {/* This inner div prevents clicks on the content from propagating to the main div's onSelect */}
            <div onClick={(e) => e.stopPropagation()}>
                {/* Texto de la tarea y checkbox */}
                <div className="flex items-start gap-3">
                    <input
                        className="form-checkbox h-5 w-5 mt-1 border-gray-300 text-blue-500 focus:ring-blue-200"
                        type="checkbox"
                        checked={tarea.completed}
                        onChange={toggleCompleted}
                    />
                    <span className={`flex-1 text-lg font-medium ${tarea.completed ? 'line-through text-gray-500' : 'text-black'}`}>
                        {tarea.text}
                    </span>
                </div>

                {/* Metadata y botones */}
                <div className="mt-auto pt-4">
                    {/* Metadata de la tarea */}
                    <div className="text-xs text-gray-500 mb-3 text-center">
                      <div>Autor: {tarea.autor}</div>
                      <div>Creado: {new Date(tarea.id).toLocaleString()}</div>
                    </div>

                    {/* Contenedor de botones */}
                    <div className="flex items-center justify-center gap-2">
                        <button
                            className="px-3 py-1 w-full bg-yellow-400 border border-yellow-500 text-black rounded hover:bg-yellow-500 transition-colors text-sm font-semibold"
                            onClick={onEditar}
                        >
                            Editar
                        </button>
                        <button
                            className="px-3 py-1 w-full bg-red-500 border border-red-600 text-white rounded hover:bg-red-600 transition-colors text-sm font-semibold"
                            onClick={onEliminar}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

TodoItem.propTypes = {
    tarea: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        autor: PropTypes.string,
    }).isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    onEditar: PropTypes.func.isRequired,
    onEliminar: PropTypes.func.isRequired,
    onSelect: PropTypes.func, // onSelect is optional
};
