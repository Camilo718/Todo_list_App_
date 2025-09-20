# <a name="readme-top"></a>

<div align="center">
	<img src="logo.png" alt="logo" width="140" height="auto" style="border-radius:50%" />
	<br/>
	<h3><b>TODO LIST APP</b></h3>
</div>

# ✅ TABLA DE CONTENIDOS
- [📖 Acerca del Proyecto](#about-project)
	- [⚒️ Construido con](#built-with)
		- [Stack Tecnológico](#tech-stack)
		- [Características Clave](#key-features)
	- [🚀 Demo](#live-demo)
- [💻 Comenzando](#getting-started)
	 - [Requisitos](#prerequisites)
	 - [Instalación](#install)
	 - [Uso](#usage)
	 - [Ejecutar Pruebas](#run-tests)
	 - [Despliegue](#deployment)
- [👥 Autores](#authors)
- [🕹️ Futuras Funcionalidades](#future-features)
- [🤝 Contribuciones](#contributing)
- [⭐ Apoya el Proyecto](#support)
- [👏 Agradecimientos](#acknowledgements)
- [📃 Licencia](#license)

# 📖 Acerca del Proyecto <a name="about-project"></a>

**Todo List App** es una aplicación web para gestionar tareas, desarrollada con React, Vite y Tailwind CSS. Permite crear, editar, eliminar y buscar tareas, mostrando autor, fecha de creación y última edición.

## ⚒️ Construido con <a name="built-with"></a>

<p>
Este proyecto fue construido usando:
React, Vite, Tailwind CSS, JavaScript, HTML, CSS, Git, GitHub
</p>

### Stack Tecnológico <a name="tech-stack"></a>

<li> React </li>
<li> Vite </li>
<li> Tailwind CSS </li>
<li> JavaScript </li>
<li> HTML & CSS </li>
<li> Git & GitHub </li>

<details>
<summary>Cliente</summary>
<ul>
<li><a href="https://react.dev/">React</a></li>
<li><a href="https://vitejs.dev/">Vite</a></li>
<li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
</ul>
</details>

### Características Clave <a name="key-features"></a>

- login de usuarios (simulado)
- Crear, editar, eliminar y marcar tareas como completadas
- Búsqueda de tareas por texto
- Visualización de autor, fecha de creación, última edición y usuario que editó la tarea
- Interfaz moderna y responsiva

<p align="right"><a href="#readme-top">Volver arriba</a></p>

## 🚀 Demo <a name="live-demo"></a>

Próximamente

## 💻 Comenzando <a name="getting-started"></a>

Para obtener una copia local y ejecutarla sigue estos pasos:

### Requisitos <a name="prerequisites"></a>

- [VS Code]
- [Node.js y npm]
- [Git y GitHub]

### Instalación <a name="install"></a>

Clona el repositorio y entra en la carpeta:
```bash
git clone <url-del-repo>
cd Todo_list_App_
```
Instala las dependencias:
```bash
npm install
```

### Uso <a name="usage"></a>

Inicia la app en modo desarrollo:
```bash
npm run dev
```

### Ejecutar Pruebas <a name="run-tests"></a>

Este proyecto utiliza **Jest** y **@testing-library/react** para pruebas unitarias de los componentes y la lógica de la app.

Ejecuta todas las pruebas:
```bash
npm test
```

#### ¿Qué cubren los tests?

- Pruebas de login: formulario, validación y mensajes de error.
- Pruebas de tareas: crear, editar (incluye mostrar "Editado por"), y eliminar tareas usando la interfaz.
- Comprobación de renderizado de componentes y mensajes.

#### Ubicación de los tests

Los archivos de pruebas están en `src/test/`:
- `login.test.js`: Pruebas del login.
- `tareas.test.js`: Pruebas de gestión de tareas (crear, editar, eliminar).

#### Tecnologías usadas para testing

- [Jest](https://jestjs.io/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)

### Despliegue <a name="deployment"></a>

Puedes desplegar la app usando tu entorno local o servicios como Vercel/Netlify.

<p align="right"><a href="#readme-top">Volver arriba</a></p>

## 👥 Autores <a name="authors"></a>

JOSTHIN PAZ - CAMILO PINZON - DILAN RAMIREZ 


## 🕹️ Futuras Funcionalidades <a name="future-features"></a>

- [ ] Mejorar la gestión de usuarios
- [ ] Filtros avanzados de tareas
- [ ] Notificaciones al correo 

## 🤝 Contribuciones <a name="contributing"></a>

¡Contribuciones, issues y sugerencias son bienvenidas!
Revisa la sección de [issues](https://github.com/alyconr/Todo_list_App_/issues)

## ⭐ Apoya el Proyecto <a name="support"></a>

Si te gusta este proyecto, por favor dale una estrella ⭐

## 👏 Agradecimientos <a name="acknowledgements"></a>

Agradecimiento al instructor y compañeros de clase.

## 📃 Licencia <a name="license"></a>

Este proyecto está licenciado bajo la licencia MIT. Ver [LIECENSE.md](../LIECENSE.md) para más detalles.

<p align="right"><a href="#readme-top">Volver arriba</a></p>
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


