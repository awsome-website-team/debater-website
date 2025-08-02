<template>
  <!--导航栏-->
  <nav class="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-30 shadow-lg flex justify-end gap-x-6 items-center z-30 p-4">
    <a href="#why-debate" class="text-white hover:text-gray-300 transition">为何辩论</a>
    <a href="#culture" class="text-white hover:text-gray-300 transition">团队文化</a>
    <a href="#team" class="text-white hover:text-gray-300 transition">核心成员</a>
    <a href="#join" class="px-5 py-2 bg-white text-black rounded-md text-sm font-semibold hover:bg-gray-200 transition">立即报名</a>
  </nav>

  <div class="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
    <!-- Hero Section -->
    <h1 class="text-6xl font-bold mb-6 text-center animate-fade-in-down">
      欢迎加入信息学院辩论队
    </h1>
    <p class="text-lg text-gray-600 mb-8 text-center max-w-2xl animate-fade-in-up">
      这里是思维碰撞的舞台，锻炼你的逻辑与表达。快来报名吧！
    </p>

    <!-- Call to Action Button -->
    <a
      href="#join"
      class="px-6 py-3 bg-black text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-800 transition animate-fade-in-up"
    >
      立即报名
    </a>
  </div>
</template>

<script setup>
// This script is cleaned up and ready for future logic.
</script>

<style scoped>
/* Styles from the original hero section, kept for the animations. */
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease forwards;
}

/* Added for a modern, semi-transparent navbar effect */
nav {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>