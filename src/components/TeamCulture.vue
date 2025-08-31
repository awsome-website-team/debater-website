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

      <!-- Gallery with Navigation Arrows -->
      <div class="gallery-navigation-wrapper">
        <!-- Left Arrow -->
        <button @click="prevChapter" class="gallery-arrow left-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.638l4.132 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.638 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" /></svg>
        </button>

        <!-- Scrolling Content -->
        <div ref="scrollContent" class="scroll-content">
          <div v-for="(imageSrc, index) in activeChapter.images" 
               :key="activeChapter.title + '-' + index" 
               class="card image-card">
            <img :src="imageSrc" alt="Team culture image" class="gallery-image" />
          </div>
        </div>

        <!-- Right Arrow -->
        <button @click="nextChapter" class="gallery-arrow right-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" /></svg>
        </button>
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
import teambuilding4 from '@/assets/family/first-team-building-04.jpg'
import teambuilding5 from '@/assets/family/first-team-building-05.jpg'
import competition1 from '@/assets/family/competition/1.jpeg'
import competition2 from '@/assets/family/competition/2.jpg'
import competition3 from '@/assets/family/competition/3.jpeg'
import competition4 from '@/assets/family/competition/4.png'
import competition5 from '@/assets/family/competition/5.jpg'
import competition6 from '@/assets/family/competition/6.jpg'
import competition7 from '@/assets/family/competition/7.jpg'
import activity1 from '@/assets/family/activity/1.jpeg'
import activity2 from '@/assets/family/activity/2.jpg'
import activity3 from '@/assets/family/activity/3.png'
import activity4 from '@/assets/family/activity/4.jpg'
import activity5 from '@/assets/family/activity/5.jpeg'
import activity6 from '@/assets/family/activity/6.jpg'

const chapters = [
  { title: '温馨的团队氛围', images: [teambuilding1, teambuilding2, teambuilding3, teambuilding4, teambuilding5] },
  { title: '优秀的带赛体系', images: [competition1, competition2, competition3,competition4, competition5, competition6, competition7] },
  { title: '丰富的日常活动', images: [activity1,activity2, activity3, activity4, activity5, activity6 ] }
];

const currentChapterIndex = ref(0);
const activeChapter = computed(() => chapters[currentChapterIndex.value]);

const galleryWrapper = ref(null);
const scrollContent = ref(null);
let lenis;
let rafHandle;

const setFinalHeight = () => {
  const wrapper = galleryWrapper.value;
  const content = scrollContent.value;
  if (!wrapper || !content) return;
  wrapper.style.height = content.scrollWidth > 0 ? `${content.scrollWidth * 0.8}px` : `100vh`;
};

const updateGalleryHeight = () => {
  const wrapper = galleryWrapper.value;
  const content = scrollContent.value;
  if (!wrapper || !content) return;

  // 1. Set a provisional height immediately for instant scroll hijacking
  const numImages = activeChapter.value.images.length;
  // Estimate: average card width of 450px
  wrapper.style.height = `${numImages * 450 * 0.8}px`; 

  // 2. Wait for images to load to calculate the final, accurate height
  nextTick(() => {
    const images = Array.from(content.querySelectorAll('img'));
    if (images.length === 0) {
      setFinalHeight(); // Set to 100vh if no images
      return;
    }

    const imagePromises = images.map(img => 
      new Promise(resolve => {
        if (img.complete) return resolve();
        img.onload = resolve;
        img.onerror = resolve;
      })
    );

    Promise.all(imagePromises).then(() => {
      nextTick(setFinalHeight);
    });
  });
};


const nextChapter = () => {
  currentChapterIndex.value = (currentChapterIndex.value + 1) % chapters.length;
};

const prevChapter = () => {
  currentChapterIndex.value = (currentChapterIndex.value - 1 + chapters.length) % chapters.length;
};

watch(currentChapterIndex, () => {
  nextTick(() => {
    if (scrollContent.value) {
      scrollContent.value.style.transform = 'translateX(0px)';
    }
    updateGalleryHeight();
    if (lenis && galleryWrapper.value) {
      lenis.scrollTo(galleryWrapper.value.offsetTop, { immediate: true });
    }
  });
});

onMounted(() => {
  nextTick(() => {
    const wrapper = galleryWrapper.value;
    const content = scrollContent.value;
    if (!wrapper || !content) return;

    // --- One-time Lenis Initialization ---
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

    function raf(time) {
      lenis.raf(time);
      rafHandle = requestAnimationFrame(raf);
    }
    rafHandle = requestAnimationFrame(raf);
    // --- End of One-time Init ---

    // Initial gallery setup
    updateGalleryHeight();
    window.addEventListener('resize', updateGalleryHeight);
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateGalleryHeight);
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  if (rafHandle) {
    cancelAnimationFrame(rafHandle);
  }
});
</script>

<style scoped>
.gallery-wrapper { 
  position: relative; 
  background-color: #111827;
  /* Add a min-height to prevent collapse before JS runs */
  min-height: 100vh; 
}
.sticky-container { 
  position: sticky; 
  top: 0; 
  height: 100vh; 
  overflow: hidden; 
  display: flex; 
  justify-content: center;
  align-items: center;
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

/* New wrapper for gallery and arrows */
.gallery-navigation-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll-content { 
  display: flex; 
  align-items: center; 
  gap: 2.5rem; 
  padding: 0 8rem; 
  height: 50vh;
}
.card {
  flex-shrink: 0;
  width: auto;
  height: 100%;
  border-radius: 1.25rem;
  background-color: #1f2937;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.gallery-image {
  width: auto;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.card:hover .gallery-image {
  transform: scale(1.05);
}

/* New Arrow Styles */
.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0; /* Hidden by default */
}
.gallery-navigation-wrapper:hover .gallery-arrow {
  opacity: 1; /* Show on wrapper hover */
}
.gallery-arrow:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}
.gallery-arrow.left-arrow { left: 2rem; }
.gallery-arrow.right-arrow { right: 2rem; }
.gallery-arrow svg {
  width: 1.5rem;
  height: 1.5rem;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .header-content { padding: 2rem 1.5rem; }
  .main-heading { font-size: 1.75rem; }
  .chapter-heading { font-size: 1.25rem; }
  .scroll-content { 
    padding: 0 1.5rem; 
    gap: 1.5rem; 
    height: 50vh;
  }
  .card { border-radius: 1rem; }
  
  /* Adjust arrows for mobile */
  .gallery-arrow {
    opacity: 1; /* Always visible on mobile */
    width: 2.5rem;
    height: 2.5rem;
  }
  .gallery-arrow.left-arrow { left: 0.5rem; }
  .gallery-arrow.right-arrow { right: 0.5rem; }
  .gallery-arrow svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
