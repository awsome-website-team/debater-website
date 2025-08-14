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

---
# Session Summary (2025-08-15)

- **`TeamCulture.vue` Component Refactor:**
  - Replaced the time-based image carousel with a scroll-driven animation. The image displayed in the right-hand gallery is now directly mapped to the user's scroll progress through the corresponding text chapter on the left.
  - This was achieved by removing the `setInterval` logic and implementing a `scroll` event listener that calculates the scroll progress within the active chapter (identified by an `IntersectionObserver`).

- **Navigation Bar Enhancement:**
  - Addressed an issue where the navigation bar's text became invisible against light-colored backgrounds.
  - Implemented a dynamic color inversion solution:
    - The global `App.vue` now contains an `IntersectionObserver` that watches for a specific ID (`#light-bg-section`).
    - When the header intersects with an element carrying this ID (like `TeamCulture.vue`), it dynamically changes the navigation text and button colors to a dark theme for better visibility.

- **Layout & Style Adjustments:**
  - Experimented with full-width vs. container-based layouts for the `Home.vue` hero section to improve visual consistency with other page sections.
  - Finalized a hybrid approach: The main content on the homepage remains within a centered container for readability, while the main navigation bar was adjusted to be full-width, allowing its content to align to the far right of the viewport.

- **Development Environment Troubleshooting:**
  - Investigated and resolved an issue where the IDE was incorrectly reporting syntax errors in `.vue` files after more complex logic was added.
  - The root cause was identified as a file corruption issue (a duplicated `<template>` tag) caused by a faulty `replace` tool operation.
  - Corrected the corrupted file using `write_file` and cleaned up unnecessary `tsconfig.json` and `typescript` dependencies that were added during troubleshooting.
  - **Action Item:** Per user instruction, the `replace` tool will be avoided in favor of `write_file` for future file modifications to ensure integrity.