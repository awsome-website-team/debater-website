<template>
  <div class="team-culture-container">
    <!-- Left Column: Scrollable Text Content -->
    <div class="text-column">
      <div class="spacer" style="height: 30vh;"></div>
      <div v-for="(chapter, index) in chapters" :key="index" class="chapter" :ref="el => chapterRefs[index] = el">
        <h3 class="chapter-title">{{ chapter.title }}</h3>
        <p class="chapter-description">{{ chapter.description }}</p>
      </div>
      <div class="spacer" style="height: 40vh;"></div>
    </div>

    <!-- Right Column: Sticky Image Showcase -->
    <div class="gallery-column">
      <div class="sticky-image-wrapper">
        <transition name="fade" mode="out-in">
          <img :key="currentImage" :src="currentImage" alt="Team activity" class="showcase-image">
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- ASSET IMPORTS ---
import teamBuilding01 from '@/assets/family/first-team-building-01.jpg';
import teamBuilding02 from '@/assets/family/first-team-building-02.jpg';
import teamBuilding03 from '@/assets/family/first-team-building-03.jpg';

// --- COMPONENT DATA ---
const chapters = ref([
  {
    title: '第一次团建',
    description: '辩论不仅是赛场上的唇枪舌剑，更是生活中的温暖陪伴。在这里，我们一同分享知识，也一同分享笑语。每一次团建，都是为了让我们的心更近，让团队的凝聚力更强。',
    images: [teamBuilding01, teamBuilding02, teamBuilding03]
  },
  {
    title: '每周例会',
    description: '固定的思维碰撞，是保持锋利最好的方式。我们在这里拆解辩题，构建论点，模拟攻防。这里是我们的思想健身房，汗水与灵感交织，每个人既是学生，也是老师。',
    images: ['https://placehold.co/800x1000/334155/ffffff?text=Meeting+1', 'https://placehold.co/800x1200/475569/ffffff?text=Meeting+2']
  },
  {
    title: '赛后复盘',
    description: '无论胜负，复盘都是最宝贵的财富。我们在这里坦诚地剖析得失，不是为了指责，而是为了共同成长。每一次复盘，都让我们对辩论的理解，更深一层。',
    images: ['https://placehold.co/800x1200/0f172a/ffffff?text=Review+1', 'https://placehold.co/800x1000/1e293b/ffffff?text=Review+2', 'https://placehold.co/800x1200/334155/ffffff?text=Review+3']
  },
  {
    title: '年度大会',
    description: '一年的总结，新篇的序章。我们在这里回顾过去一年的荣耀与汗水，嘉奖优秀的辩手，也为下一年的征程，描绘蓝图，凝聚共识。',
    images: ['https://placehold.co/800x1200/475569/ffffff?text=Annual+1']
  }
]);

// --- INTERACTION LOGIC ---
const chapterRefs = ref([]);
const currentImage = ref(chapters.value[0].images[0]);
const activeChapterIndex = ref(0);
let observer;

const handleScroll = () => {
  const chapterEl = chapterRefs.value[activeChapterIndex.value];
  if (!chapterEl) return;

  const images = chapters.value[activeChapterIndex.value].images;
  if (!images || images.length <= 1) return;

  const rect = chapterEl.getBoundingClientRect();
  
  // Define the "active" zone for scrolling as the element's height, starting from when its top hits the viewport's vertical center.
  const triggerPoint = window.innerHeight * 0.5;
  const scrollDistance = triggerPoint - rect.top;
  const totalScrollHeightForChapter = rect.height;

  // Calculate progress (from 0 to 1)
  let progress = scrollDistance / totalScrollHeightForChapter;
  progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1

  // Map progress to an image index
  const imageCount = images.length;
  const imageIndex = Math.floor(progress * imageCount);
  const clampedIndex = Math.max(0, Math.min(imageCount - 1, imageIndex));

  // Update the current image only if it has changed
  if (currentImage.value !== images[clampedIndex]) {
    currentImage.value = images[clampedIndex];
  }
};

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when the element is at the vertical center of the viewport
    threshold: 0
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = chapterRefs.value.findIndex(ref => ref === entry.target);
        if (index !== -1) {
          activeChapterIndex.value = index;
          // When a new chapter becomes active, immediately set its first image.
          // The scroll handler will manage subsequent images.
          if (chapters.value[index].images && chapters.value[index].images.length > 0) {
            currentImage.value = chapters.value[index].images[0];
          }
        }
      }
    });
  }, options);

  chapterRefs.value.forEach(ref => {
    if(ref) observer.observe(ref);
  });

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if(observer) observer.disconnect();
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.team-culture-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}
.text-column {
  width: 50%;
  padding: 0 4rem;
}
.chapter {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #0f172a;
}
.chapter-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
}
.chapter-description {
  font-family: serif;
  font-size: 1.25rem;
  line-height: 1.75;
  color: #475569;
  max-width: 36rem;
}
.gallery-column {
  width: 50%;
  position: relative;
}
.sticky-image-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}
.showcase-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.team-culture-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}
.text-column {
  width: 50%;
  padding: 0 4rem;
}
.chapter {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #0f172a;
}
.chapter-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
}
.chapter-description {
  font-family: serif;
  font-size: 1.25rem;
  line-height: 1.75;
  color: #475569;
  max-width: 36rem;
}
.gallery-column {
  width: 50%;
  position: relative;
}
.sticky-image-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}
.showcase-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>