<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
    <!-- 1. Navigation Bar -->
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      :class="{ 'text-gray-900': isDarkText, 'text-white': !isDarkText }"
    >
      <nav class="px-6 py-4 flex justify-end items-center">
        <div class="space-x-6 text-sm">
          <a @click.prevent="scrollToSection('#culture')" href="#culture" class="hover:opacity-75 transition-opacity duration-300">文化</a>
          <a @click.prevent="scrollToSection('#team')" href="#team" class="hover:opacity-75 transition-opacity duration-300">团队</a>
          <a 
            @click.prevent="scrollToSection('#join')" 
            href="#join"
            class="px-4 py-2 rounded-full transition-colors duration-300 font-semibold"
            :class="{ 
              'bg-gray-800 text-white hover:bg-gray-700': isDarkText, 
              'bg-white text-gray-900 hover:bg-gray-200': !isDarkText 
            }"
          >
            加入我们
          </a>
        </div>
      </nav>
    </header>

    <!-- This is where the routed components will be displayed -->
    <router-view />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isDarkText = ref(false);
const route = useRoute();
const router = useRouter();
let observer;

const scrollToSection = async (hash) => {
  // If we are not on the homepage, navigate there first.
  if (route.path !== '/') {
    await router.push('/');
  }

  // Wait for the DOM to update after the potential route change.
  await nextTick();

  const element = document.querySelector(hash);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const setupObserver = () => {
  if (observer) {
    observer.disconnect();
  }
  // We are looking for a section that is NOT part of the Home.vue
  // but for the sake of the logic, let's assume it's for a different page view.
  // The logic should be tied to a specific view, not globally like this.
  // Let's assume for now it's for a section in a different view.
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
  if (import.meta.env.PROD) {
    const assetModules = import.meta.glob([
      '/src/assets/members/*.{jpg,jpeg,png}',
      '/src/assets/family/**/*.{jpg,jpeg,png}',
    ]);

    for (const path in assetModules) {
      assetModules[path]().then(module => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = module.default;
        document.head.appendChild(link);
      });
    }
  }
};

onMounted(() => {
  setTimeout(setupObserver, 100);
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
/* We removed scroll-behavior: smooth from html tag as it can interfere with programmatic scrolling */
</style>
