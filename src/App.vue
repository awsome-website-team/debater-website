<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
    <!-- 1. Navigation Bar -->
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      :class="{ 'text-gray-900': isDarkText, 'text-white': !isDarkText }"
    >
      <nav class="px-6 py-4 flex justify-end items-center">
        <div class="space-x-6 text-sm">
          <router-link to="/#culture" class="hover:opacity-75 transition-opacity duration-300">文化</router-link>
          <router-link to="/#team" class="hover:opacity-75 transition-opacity duration-300">团队</router-link>
          <router-link 
            to="/#join" 
            class="px-4 py-2 rounded-full transition-colors duration-300 font-semibold"
            :class="{ 
              'bg-gray-800 text-white hover:bg-gray-700': isDarkText, 
              'bg-white text-gray-900 hover:bg-gray-200': !isDarkText 
            }"
          >
            加入我们
          </router-link>
        </div>
      </nav>
    </header>

    <!-- This is where the routed components will be displayed -->
    <router-view />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const isDarkText = ref(false);
const route = useRoute();
let observer;

const setupObserver = () => {
  if (observer) {
    observer.disconnect();
  }
  const lightBgSection = document.querySelector('#light-bg-section');
  if (!lightBgSection) {
    isDarkText.value = false;
    return;
  }
  const options = {
    root: null,
    rootMargin: "-100px 0px 0px 0px",
    threshold: 0,
  };
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isDarkText.value = entry.isIntersecting;
    });
  }, options);
  observer.observe(lightBgSection);
};

const preloadAssets = () => {
  // This logic runs only in the production build to avoid spamming the dev server
  if (import.meta.env.PROD) {
    const assetModules = import.meta.glob([
      '/src/assets/members/*.{jpg,jpeg,png}',
      '/src/assets/family/**/*.{jpg,jpeg,png}',
    ]);

    for (const path in assetModules) {
      // Vite's dynamic import returns a function that resolves to the module.
      // We don't need to call it; referencing the path is enough for the prefetch link.
      // However, to be robust, let's resolve the URL properly.
      assetModules[path]().then(module => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = module.default; // module.default contains the final URL
        document.head.appendChild(link);
      });
    }
  }
};

onMounted(() => {
  // Setup the intersection observer for nav text color
  // Use a timeout to ensure the child component's DOM is ready
  setTimeout(setupObserver, 100);
  
  // Preload key assets after the main app is mounted
  preloadAssets();
});

watch(() => route.path, () => {
  setTimeout(setupObserver, 100);
}, { immediate: true });

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style>
/* Ensure smooth scrolling for anchor links on the home page */
html {
  scroll-behavior: smooth;
}
</style>