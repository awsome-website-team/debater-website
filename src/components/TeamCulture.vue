<template>
  <section id="culture" class="team-culture-section">
    <div class="grid-container">
      <!-- Left Column: Sticky Text Content -->
      <div class="text-column">
        <div class="text-content">
          <Transition name="fade" mode="out-in">
            <div :key="activeChapterIndex">
              <h2 class="chapter-title">{{ chapters[activeChapterIndex].title }}</h2>
              <p class="chapter-description">{{ chapters[activeChapterIndex].description }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Right Column: Scrolling Image Gallery -->
      <div class="gallery-column">
        <div v-for="(chapter, index) in chapters" :key="index" class="image-group">
          <!-- Visible Sentinel element for debugging -->
          <div class="sentinel" :data-index="index"></div>
          
          <div v-for="image in chapter.images" :key="image" 
               class="image-placeholder" 
               :style="{ backgroundImage: `url('${image}')` }">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeChapterIndex = ref(0);

const chapters = [
  {
    title: '第一章：日常训练',
    description: '每周的例会，不仅是唇枪舌战的演练场，更是逻辑思维的健身房。我们在这里剖析辩题，打磨论点，学习如何清晰而有力地表达。',
    images: [
      'https://placehold.co/600x800/374151/ffffff?text=Training+1',
      'https://placehold.co/600x800/4b5563/ffffff?text=Training+2'
    ]
  },
  {
    title: '第二章：赛场风云',
    description: '从校内赛到国际赛，每一次登台都是一次蜕变。我们享受思维碰撞的火花，也珍视团队协作的力量。',
    images: [
      'https://placehold.co/600x800/6b7280/ffffff?text=Competition+1',
      'https://placehold.co/600x800/1f2937/ffffff?text=Competition+2'
    ]
  },
  {
    title: '第三章：生活点滴',
    description: '辩论之外，我们是会一起聚餐、出游、分享生活的朋友。这份情谊，是辩论带给我们最宝贵的财富之一。',
    images: [
      'https://placehold.co/600x800/9ca3af/ffffff?text=Leisure+1',
      'https://placehold.co/600x800/d1d5db/111827?text=Leisure+2',
      'https://placehold.co/600x800/4b5563/ffffff?text=Leisure+3'
    ]
  }
];

let observer;

onMounted(() => {
  const sentinels = document.querySelectorAll('.sentinel');
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index, 10);
          activeChapterIndex.value = index;
        }
      });
    },
    {
      // This rootMargin creates a "trigger zone" in the middle of the screen.
      // When a sentinel enters this zone, the callback fires.
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }
  );

  sentinels.forEach((sentinel) => {
    observer.observe(sentinel);
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.team-culture-section { padding: 6rem 0; background-color: #f3f4f6; color: #111827; }
.grid-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
.text-column { position: relative; }
.text-content { position: sticky; top: 8rem; height: 50vh; display: flex; flex-direction: column; justify-content: center; }
.chapter-title { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
.chapter-description { font-size: 1.125rem; color: #4b5563; max-width: 32rem; }
.gallery-column { display: flex; flex-direction: column; gap: 2rem; }
.image-group { display: flex; flex-direction: column; gap: 2rem; position: relative; }

/* --- DEBUG STYLE --- */
.sentinel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: red;
  z-index: 10;
}

.image-placeholder { width: 100%; padding-bottom: 125%; background-size: cover; background-position: center; border-radius: 0.75rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
