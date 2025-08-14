<template>
  <div class="team-culture-container">
    <!-- Left Column: Sticky Text Content -->
    <div class="text-column">
      <div class="sticky-text-wrapper">
        <transition name="fade" mode="out-in">
          <div :key="activeChapterIndex">
            <h3 class="chapter-title">{{ chapters[activeChapterIndex].title }}</h3>
            <p class="chapter-description">{{ chapters[activeChapterIndex].description }}</p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Right Column: Scrollable Image Gallery -->
    <div class="gallery-column">
      <div v-for="(chapter, index) in chapters" :key="index" class="image-chapter" :ref="el => chapterRefs[index] = el">
        <img v-for="(image, imgIndex) in chapter.images" :key="imgIndex" :src="image" :alt="`${chapter.title} image ${imgIndex + 1}`" class="gallery-image">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- ASSET IMPORTS ---
import teamBuilding01 from '@/assets/family/第一次团建01.jpg';
import teamBuilding02 from '@/assets/family/第一次团建02.jpg';
import teamBuilding03 from '@/assets/family/第一次团建03.jpg';

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
const activeChapterIndex = ref(0);
let observer;

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when the element is in the vertical center
    threshold: 0
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = chapterRefs.value.indexOf(entry.target);
        activeChapterIndex.value = index;
      }
    });
  }, options);

  chapterRefs.value.forEach(ref => {
    if(ref) observer.observe(ref);
  });
});

onUnmounted(() => {
  if(observer) observer.disconnect();
});
</script>

<style scoped>
.team-culture-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc; /* slate-50 */
}

/* --- Left Sticky Column --- */
.text-column {
  width: 50%;
  position: relative; /* For child positioning */
}

.sticky-text-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4rem; /* 64px */
  color: #0f172a; /* slate-900 */
}

.chapter-title {
  font-size: 3rem; /* text-5xl */
  font-weight: 800;
  margin-bottom: 2rem; /* 32px */
}

.chapter-description {
  font-family: serif;
  font-size: 1.25rem; /* text-xl */
  line-height: 1.75;
  color: #475569; /* slate-600 */
  max-width: 36rem; /* 576px */
}

/* --- Right Scrolling Column --- */
.gallery-column {
  width: 50%;
}

.image-chapter {
  padding: 5vh 2rem; /* Add some vertical and horizontal space */
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Space between images in a chapter */
}

.gallery-image {
  width: 100%;
  height: auto;
  border-radius: 0.75rem; /* 12px */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* --- Transition Styles --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
