# Todo List App

Aplicación web para gestionar tareas, desarrollada con React, Vite y Tailwind CSS.

## Características

- Registro y login de usuarios (simulado con jest).
- Crear, editar, eliminar y marcar tareas como completadas.
- Búsqueda de tareas por texto.
- Visualización de autor, fecha de creación, última edición de cada tarea y usuario que la edito.

## Instalación y ejecución

1. Clona el repositorio:
	```bash
	git clone <url-del-repo>
	cd Todo_list_App_
	```
2. Instala las dependencias:
	```bash
	npm install
	```
3. Inicia la app en modo desarrollo:
	```bash
	npm run dev
	```
## Pruebas Unitarias

Este proyecto utiliza **Jest** y **@testing-library/react** para pruebas unitarias de los componentes y la lógica de la app como el login.

### ¿Cómo ejecutar las pruebas?

1. Instala las dependencias si no lo has hecho:
	```bash
	npm install
	```
2. Ejecuta todas las pruebas:
	```bash
	npm test
	```

### ¿Qué cubren los tests?

- Pruebas de login: formulario, validación y mensajes de error.
- Pruebas de tareas: crear, editar (incluye mostrar "Editado por"), y eliminar tareas usando la interfaz.
- Comprobación de renderizado de componentes y mensajes.

### Ubicación de los tests

Los archivos de pruebas están en `src/test/`:
- `login.test.js`: Pruebas del login.
- `tareas.test.js`: Pruebas de gestión de tareas (crear, editar, eliminar).

### Tecnologías usadas para testing

- [Jest](https://jestjs.io/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)


