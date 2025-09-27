import React from "react";
import { motion } from "framer-motion";

export default function TaskModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        className="relative bg-blue-200/90 rounded-3xl shadow-xl w-full max-w-2xl p-10 font-sans text-gray-800"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -30 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-red-500 transition-colors text-2xl font-bold"
        >
          ✕
        </button>

        {/* Título */}
        <h2 className="text-3xl font-extrabold mb-8 border-b border-blue-300 pb-4 tracking-wide text-blue-900">
          Detalles de la tarea
        </h2>

        {/* Contenido */}
        <div className="space-y-6">
          <p className="text-lg leading-relaxed pl-2">
            <span className="font-semibold text-blue-800">Tarea:</span> {task.text}
          </p>

          <p className="text-lg leading-relaxed pl-2">
            <span className="font-semibold text-blue-800">Autor:</span> {task.autor}
          </p>

          <p
            className={`inline-block px-5 py-2.5 rounded-full text-base font-medium shadow-sm ml-2 ${
              task.completed
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-yellow-100 text-yellow-700 border border-yellow-300"
            }`}
          >
            {task.completed ? "✅ Completada" : "⏳ Pendiente"}
          </p>
        </div>

        {/* Botón cerrar */}
        <div className="mt-10 text-center">
          <button
            onClick={onClose}
            className="px-10 py-3 bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-blue-200 transition-all hover:scale-105 hover:from-blue-400 hover:to-blue-600"
          >
            ✨ Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
