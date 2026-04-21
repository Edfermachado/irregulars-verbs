# 🎮 VERB_QUEST V2: Full Tense Practice App

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)

Una evolución masiva de la plataforma original para dominar no solo los verbos irregulares, sino todos los tiempos verbales clave en inglés a través de una experiencia gamificada premium.

---

## 🚀 Nuevas Características (V2.0)

* 🏠 **Menú Principal Interactivo:** Nueva interfaz de inicio para seleccionar tu camino de aprendizaje.
* 🕹️ **3 Modos de Juego:**
    1.  **Irregular Verbs (Extendido):** Practica V1, V2, V3, Presente (3ra persona), Continuo y Futuro de más de 170 verbos.
    2.  **Tenses in Context:** Completa oraciones reales (Fill-in-the-blank) para aprender el uso gramatical.
    3.  **Direct Conjugation:** Domina las estructuras combinando Pronombres + Verbos Base + Tiempos Verbales.
* 🎨 **UI Adaptativa:** Etiquetas de colores y estilos únicos para cada tiempo verbal para facilitar el reconocimiento visual.
* 🧠 **Motor Inteligente:** Lógica unificada con Zustand que gestiona puntuación, feedback sensorial y transiciones fluidas.

---

## 🛠️ Tecnologías Usadas
... (igual que antes)

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
