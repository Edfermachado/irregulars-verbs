# 🎮 VERB_QUEST: Irregular Verbs Practice App

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Una aplicación web moderna, rápida e interactiva diseñada para dominar los verbos irregulares en inglés (V2 y V3). Construida con un enfoque "Mobile-First" y una estética Premium Dark Mode.

🔗 **[¡Juega y practica en vivo aquí!](https://irregulars-verbs-two.vercel.app)**

---

## ✨ Características Principales

* 🧠 **Práctica Dinámica:** El motor del juego alterna aleatoriamente entre pedir el **Pasado Simple (V2)** y el **Participio Pasado (V3)** para evitar la memorización mecánica.
* 🎨 **Premium Dark UI:** Interfaz limpia estilo "Glassmorphism" con acentos en colores neón (Índigo y Esmeralda).
* 📱 **Optimización Táctil:** Botones de gran tamaño con feedback mecánico (hundimiento interactivo) optimizados para los pulgares en dispositivos móviles.
* 🔊 **Feedback Sensorial:** * **Audio:** Efectos de sonido Arcade al acertar o fallar.
    * **Visual:** La pantalla destella en verde o rojo, y la cuadrícula de opciones vibra (`shake animation`) si te equivocas.
* ⚡ **Rendimiento:** Creada con el App Router de Next.js y estilizada con el nuevo y ultrarrápido motor de **Tailwind CSS v4**.

---

## 🛠️ Tecnologías Usadas

* **Framework:** [Next.js (App Router)](https://nextjs.org/)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Gestor de Estado:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
* **Despliegue:** [Vercel CLI](https://vercel.com/)
* **Entorno de Desarrollo:** Desarrollado bajo Debian 12 (Linux).

---

## 🚀 Instalación y Uso Local

Si quieres clonar este proyecto y correrlo en tu propia máquina, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/Edfermachado/irregulars-verbs.git](https://github.com/Edfermachado/irregulars-verbs.git)
cd irregulars-verbs

2. Instalar dependencias
Bash
npm install
3. Iniciar el servidor de desarrollo
Bash
npm run dev
Abre http://localhost:3000 en tu navegador para ver la aplicación corriendo.
```

### 📂 Estructura del Proyecto
Toda la lógica principal vive dentro del directorio app/:

page.tsx: Componente principal del cliente que renderiza la UI y maneja las interacciones.

store.ts: Lógica del juego y manejo del estado global impulsado por Zustand.

verbs.json: Base de datos ligera con los verbos en su forma base, pasada, participio y sus respectivos distractores.

globals.css: Punto de entrada para Tailwind v4 y animaciones CSS personalizadas.


---
### 👨‍💻 Creador
Desarrollado con ❤️ por Edwin Machado (Edfer_code).

GitHub: @Edfermachado

LinkedIn: Edwin Machado

Email: Edfer_code@proton.me

💡 "El código es como el humor. Cuando tienes que explicarlo, es malo." - Cory House
