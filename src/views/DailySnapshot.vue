<template>
  <div class="p-4">
    <h1 class="center-title">辩论是工作，辩队才是生活</h1>
    <!-- 图片墙 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="overflow-hidden rounded-lg relative group cursor-pointer"
        @click="openLightbox(index)"
      >
        <img
          :src="image"
          alt="Gallery Image"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg font-semibold"
        >
          查看
        </div>
      </div>
    </div>

    <!-- 弹出层 -->
    <div
      v-if="lightboxVisible"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      @click="closeLightbox"
    >
      <img
        :src="images[currentIndex]"
        alt="Large Image"
        class="max-w-full max-h-full rounded-lg shadow-lg"
        @click.stop
      />
      <!-- 上一张 / 下一张按钮 -->
      <button
        class="absolute left-4 text-white text-3xl font-bold"
        @click.stop="prevImage"
      >
        ‹
      </button>
      <button
        class="absolute right-4 text-white text-3xl font-bold"
        @click.stop="nextImage"
      >
        ›
      </button>
      <!-- 关闭按钮 -->
      <button
        class="absolute top-4 right-4 text-white text-2xl font-bold"
        @click="closeLightbox"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const images = ref([
  "src/assets/members/bbg.jpg",
  "https://picsum.photos/300/400?random=2",
  "https://picsum.photos/300/400?random=3",
  "https://picsum.photos/300/400?random=4",
  "https://picsum.photos/300/400?random=5",
  "https://picsum.photos/300/400?random=6",
  "https://picsum.photos/300/400?random=7",
  "https://picsum.photos/300/400?random=8",
  "https://picsum.photos/300/400?random=9",
  "https://picsum.photos/300/400?random=10",
]);

const lightboxVisible = ref(false);
const currentIndex = ref(0);

function openLightbox(index) {
  currentIndex.value = index;
  lightboxVisible.value = true;
}

function closeLightbox() {
  lightboxVisible.value = false;
}

function prevImage() {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
}

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
}
// ...existing code...
</script>
<style scoped>
.center-title {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin: 64px 0 24px 0;
}
</style>
