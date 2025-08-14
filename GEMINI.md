# Project Overview

This is a modern, single-page application for a university debate team, designed to be visually appealing and attract new members.

It is built using **Vue.js 3** and the **Vite** build tool, following modern best practices like the Composition API with `<script setup>`. The project is structured as a multi-page application within a single-page context, using **Vue Router** for navigation between different views like the Homepage and a "Why We Debate" article page.

Styling is handled by the **Tailwind CSS** utility-first framework. The project also incorporates libraries like **Lenis** for a smooth, high-quality scrolling experience.

# Building and Running

This project is managed with `npm`. The following scripts are essential for development:

*   **Install dependencies:**
    ```bash
    npm install
    ```

*   **Run the development server:**
    Starts a local server with hot-reloading.
    ```bash
    npm run dev
    ```

*   **Build for production:**
    Compiles and minifies the application for deployment.
    ```bash
    npm run build
    ```

*   **Preview the production build:**
    Runs a local server to preview the production-ready application.
    ```bash
    npm run preview
    ```

# Development Conventions

*   **Component Structure:** The project separates components by their role:
    *   `src/views/`: Contains top-level components that correspond to a page/route (e.g., `Home.vue`).
    *   `src/components/`: Contains reusable, partial components that are imported into views (e.g., `DebateGallery.vue`, `TeamMembers.vue`).
*   **Path Alias:** A convenient path alias `@` is configured in `vite.config.js` to point directly to the `src/` directory. Always use this for absolute imports within the project.
    ```javascript
    // Example
    import Home from '@/views/Home.vue';
    import MyComponent from '@/components/MyComponent.vue';
    ```
*   **Styling:** All styling should be done using Tailwind CSS utility classes directly in the `<template>` of Vue components. Global styles are located in `src/style.css`.
*   **Routing:** All application routes are defined in `src/router/index.js`. To add a new page, you must create a new view component in `src/views` and add a corresponding route object to the `routes` array.
