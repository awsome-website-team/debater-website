<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
    <!-- 1. Navigation Bar -->
    <header class="fixed top-0 left-0 right-0 z-50">
      <nav class="container mx-auto px-6 py-4 flex justify-end items-center">
        <div class="space-x-6 text-sm">
          <!-- Use router-link for internal navigation -->
          <router-link to="/#culture" class="hover:text-white transition-colors duration-300">文化</router-link>
          <router-link to="/#team" class="hover:text-white transition-colors duration-300">团队</router-link>
          <router-link to="/#join" class="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 font-semibold">加入我们</router-link>
        </div>
      </nav>
    </header>

    <!-- This is where the routed components will be displayed -->
    <router-view />

  </div>
</template>

<script setup>
// No component imports needed here anymore, they are handled by the router.
</script>

<style>
/* Ensure smooth scrolling for anchor links on the home page */
html {
  scroll-behavior: smooth;
}
</style>
