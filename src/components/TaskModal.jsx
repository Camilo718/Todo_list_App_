import React from 'react';

export default function TaskModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-xl"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Detalle de la tarea</h2>
        <p className="mb-2"><strong>Texto:</strong> {task.text}</p>
        <p className="mb-2"><strong>Autor:</strong> {task.autor}</p>
        <p className="mb-2"><strong>Completada:</strong> {task.completed ? 'Sí' : 'No'}</p>
      </div>
    </div>
  );
}
