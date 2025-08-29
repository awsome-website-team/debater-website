<template>
  <div ref="galleryWrapper" class="gallery-wrapper">
    <div class="sticky-container">
      
      <!-- Header Content -->
      <div class="header-content">
        <h2 class="main-heading">为什么加入我们</h2>
        <Transition name="fade" mode="out-in">
          <h3 class="chapter-heading" :key="activeChapter.title">{{ activeChapter.title }}</h3>
        </Transition>
      </div>

      <!-- "Next Chapter" Button -->
      <button @click="nextChapter" class="next-chapter-button">
        <span>下一组</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75% 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" /></svg>
      </button>

      <!-- Scrolling Content: Now dynamically displays ONLY the active chapter's images -->
      <div ref="scrollContent" class="scroll-content">
        <div v-for="(imageSrc, index) in activeChapter.images" 
             :key="activeChapter.title + '-' + index" 
             class="card image-card">
          <img :src="imageSrc" alt="Team culture image" class="gallery-image" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import Lenis from 'lenis';

// Image Imports
import teambuilding1 from '@/assets/family/first-team-building-01.jpg'
import teambuilding2 from '@/assets/family/first-team-building-02.jpg'
import teambuilding3 from '@/assets/family/first-team-building-03.jpg'
import competition1 from '@/assets/family/competition/1.jpeg'
import competition2 from '@/assets/family/competition/2.jpg'
import competition3 from '@/assets/family/competition/3.jpeg'
import activity1 from '@/assets/family/activity/1.jpeg'
import activity2 from '@/assets/family/activity/2.jpeg'
import activity3 from '@/assets/family/activity/3.png'

const chapters = [
  { title: '温馨的团队氛围', images: [teambuilding1, teambuilding2, teambuilding3, activity1] },
  { title: '激烈的赛场交锋', images: [competition1, competition2, competition3] },
  { title: '丰富的日常生活', images: [activity2, activity3, teambuilding1] }
];

const currentChapterIndex = ref(0);
const activeChapter = computed(() => chapters[currentChapterIndex.value]);

const galleryWrapper = ref(null);
const scrollContent = ref(null);
let lenis;

// Function to calculate and set the required vertical height for the scroll animation
const setHeight = () => {
  const wrapper = galleryWrapper.value;
  const content = scrollContent.value;
  if (!wrapper || !content) return;

  if (content.scrollWidth > 0) {
    wrapper.style.height = `${content.scrollWidth * 0.8}px`;
  } else {
    wrapper.style.height = `100vh`;
  }
};

// The core function to switch chapters
const nextChapter = () => {
  currentChapterIndex.value = (currentChapterIndex.value + 1) % chapters.length;
};

// Watch for chapter changes to re-calculate height and reset scroll
watch(currentChapterIndex, async () => {
  // Wait for the DOM to update with the new images
  await nextTick();
  
  // --- BUG FIX: More robust reset logic ---
  // 1. Forcefully reset the horizontal transform to 0. This is the key fix.
  if (scrollContent.value) {
    scrollContent.value.style.transform = 'translateX(0px)';
  }

  // 2. Recalculate the wrapper height based on the new content.
  setHeight();

  // 3. Snap the vertical scroll to the top of the component.
  if (lenis && galleryWrapper.value) {
    lenis.scrollTo(galleryWrapper.value.offsetTop, { immediate: true });
  }
});

onMounted(() => {
  const wrapper = galleryWrapper.value;
  const content = scrollContent.value;
  if (!wrapper || !content) return;

  setHeight();
  window.addEventListener('resize', setHeight);

  lenis = new Lenis();
  lenis.on('scroll', ({ scroll }) => {
    const rect = wrapper.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    
    const scrollableDistance = wrapper.scrollHeight - window.innerHeight;
    const maxTranslate = content.scrollWidth - window.innerWidth;
    
    if (scrollableDistance <= 0 || maxTranslate <= 0) {
      content.style.transform = `translateX(0px)`;
      return;
    }
    
    const progress = (scroll - wrapper.offsetTop) / scrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    content.style.transform = `translateX(-${clampedProgress * maxTranslate}px)`;
  });

  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  onUnmounted(() => {
    window.removeEventListener('resize', setHeight);
    if (lenis) { lenis.destroy(); lenis = null; }
  });
});
</script>

<style scoped>
.gallery-wrapper { 
  position: relative; 
  background-color: #111827;
}
.sticky-container { 
  position: sticky; 
  top: 0; 
  height: 100vh; 
  overflow: hidden; 
  display: flex; 
  align-items: flex-start;
  padding-top: 12rem;
  box-sizing: border-box;
}
.header-content { 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  padding: 3rem 4rem; 
  z-index: 10; 
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.main-heading { 
  font-size: 2.25rem; 
  font-weight: 800; 
  color: white; 
}
.chapter-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #9ca3af;
}
.scroll-content { 
  display: flex; 
  align-items: center; 
  gap: 2.5rem; 
  padding: 0 8rem; 
}
.card {
  flex-shrink: 0;
  width: 28rem;
  border-radius: 1.25rem;
  background-color: #1f2937;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}
.card:hover .gallery-image {
  transform: scale(1.05);
}
.next-chapter-button {
  position: absolute;
  bottom: 3rem;
  right: 4rem;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.next-chapter-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
.next-chapter-button svg {
  width: 1.25rem;
  height: 1.25rem;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .sticky-container {
    padding-top: 10rem;
  }
  .header-content { padding: 2rem 1.5rem; }
  .main-heading { font-size: 1.75rem; }
  .chapter-heading { font-size: 1.25rem; }
  .scroll-content { padding: 0 1.5rem; gap: 1.5rem; }
  .card { 
    width: 75vw; 
    border-radius: 1rem; 
  }
  .next-chapter-button { bottom: 2rem; right: 1.5rem; padding: 0.5rem 1rem; font-size: 0.875rem; }
  .next-chapter-button svg { display: none; }
}
</style>
