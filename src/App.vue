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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 min-h-[calc(100vh-6rem)] items-center">
        <div class="lg:col-span-3 ">
          <img src="./assets/log.png" class="h-56 w-auto"></img>
          <!-- <h1 class="text-6xl lg:text-8xl font-extrabold tracking-tighter leading-tight">
            思想的棱镜
          </h1> -->
        </div>
        <div class="lg:col-span-2 flex flex-col items-end pt-4">
          <p class="text-gray-400 max-w-sm text-right font-serif text-lg leading-relaxed">
            欢迎来到信息学院辩论队官方网站，希望能在这趟短短的旅程中，将辩队内部最真实的温暖与感动带给你
          </p>
        </div>
        <div class="lg:col-span-5  self-end w-full">
          <div class="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src="./assets/主视觉图.jpg" 
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

    <!-- 6. Join Us Section -->
    <JoinUs />

  </div>
</template>

<script setup>
import DebateGallery from './components/DebateGallery.vue';
import TeamCulture from './components/TeamCulture.vue';
import TeamMembers from './components/TeamMembers.vue';
import JoinUs from './components/JoinUs.vue';
</script>

<style>
/* Ensure smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
</style>