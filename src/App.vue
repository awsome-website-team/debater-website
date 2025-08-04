<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
    <!-- 1. Navigation Bar -->
    <header class="fixed top-0 left-0 right-0 z-50">
      <nav class="container mx-auto px-6 py-4 flex justify-end items-center">
        <div class="space-x-6 text-sm">
          <a href="#culture" class="hover:text-white transition-colors duration-300">文化</a>
          <a href="#team" class="hover:text-white transition-colors duration-300">团队</a>
          <a href="#join" class="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 font-semibold">加入我们</a>
        </div>
      </nav>
    </header>

    <!-- 2. Main Hero Section -->
    <main class="container mx-auto px-6 pt-24">
      <!-- Asymmetrical Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 min-h-[calc(100vh-6rem)]">
        <div class="lg:col-span-3 flex flex-col justify-center">
          <h1 class="text-6xl lg:text-8xl font-extrabold tracking-tighter leading-tight">
            思想的棱镜
          </h1>
        </div>
        <div class="lg:col-span-2 flex flex-col justify-start pt-12">
          <p class="text-gray-400 max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="lg:col-span-5 lg:col-start-2 self-end w-full">
          <div class="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src="https://placehold.co/1280x720/1f2937/e5e7eb?text=Visual+Area" 
              alt="Placeholder for visual content"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- 3. Debate Gallery Section -->
    <DebateGallery />

    <!-- 4. Team Culture Section -->
    <TeamCulture />

    <!-- 5. Team Members Section -->
    <TeamMembers />

  </div>
</template>

<script setup>
import DebateGallery from './components/DebateGallery.vue';
import TeamCulture from './components/TeamCulture.vue';
import TeamMembers from './components/TeamMembers.vue';
</script>

<style>
/* Global styles can be added here if needed */
</style>