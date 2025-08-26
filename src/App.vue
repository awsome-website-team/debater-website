<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
    <!-- 1. Navigation Bar -->
    <header 
  class="fixed top-0 left-0 right-0 z-50 transition-colors duration-500 bg-gray-900" style="background-color: rgba(17, 24, 39, 0.7);"
      :class="{ 'text-gray-900': isDarkText, 'text-white': !isDarkText }"
    >
      <nav class="px-6 py-4 flex justify-between items-center">
        <div>
          <router-link to="/" class="hover:opacity-75 transition-opacity duration-300 inline-flex items-center">
            <img src="@/assets/home.svg" alt="首页" class="h-4 w-4 mr-1" />
            首页
          </router-link>
        </div>
        <div class="space-x-6 text-sm flex items-center">
          <router-link to="/#teamculture" class="hover:opacity-75 transition-opacity duration-300">团队文化</router-link>
          <router-link to="/#teammembers" class="hover:opacity-75 transition-opacity duration-300">团队成员</router-link>
          <router-link to="/daily-snapshot" class="hover:opacity-75 transition-opacity duration-300">日常留影</router-link>
          <router-link 
            to="/#joinus" 
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
  // Disconnect previous observer if it exists
  if (observer) {
    observer.disconnect();
  }

  // Query for the light-bg-section which is in the child component
  const lightBgSection = document.querySelector('#light-bg-section');
  
  if (!lightBgSection) {
    isDarkText.value = false; // Default to light text if section not found
    return;
  }

  const options = {
    root: null,
    rootMargin: "-100px 0px 0px 0px", // Trigger when the top of the section is 100px from the top of the viewport
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isDarkText.value = entry.isIntersecting;
    });
  }, options);

  observer.observe(lightBgSection);
};

// Watch for route changes to re-run the observer setup
watch(() => route.path, () => {
  // We need to wait for the new view to be mounted to the DOM
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
