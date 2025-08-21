<template>
  <section id="culture" class="team-culture-section">
    <div class="grid-container">
      <!-- Left Column: Sticky Text Content -->
      <div class="text-column">
        <div class="text-content-wrapper">
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
        <div class="gallery-content-wrapper">
          <div v-for="(chapter, index) in chapters" :key="index" class="image-group" :data-index="index">
            <img v-for="image in chapter.images" :key="image" 
                 :src="image"
                 alt="Team culture image"
                 class="image-placeholder" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import teambuilding1 from '@/assets/family/first-team-building-01.jpg'
import teambuilding2 from '@/assets/family/first-team-building-02.jpg'
import teambuilding3 from '@/assets/family/first-team-building-03.jpg'

const activeChapterIndex = ref(0);

const chapters = [
  {
    title: '第一章：日常训练',
    description: '每周的例会，不仅是唇枪舌战的演练场，更是逻辑思维的健身房。我们在这里剖析辩题，打磨论点，学习如何清晰而有力地表达。',
    images: [
      teambuilding1,
      teambuilding2,
      teambuilding3
    ]
  },
  {
    title: '第二章：赛场风云',
    description: '从校内赛到国际赛，每一次登台都是一次蜕变。我们享受思维碰撞的火花，也珍视团队协作的力量。',
    images: [
      'https://placehold.co/800x600/6b7280/ffffff?text=Competition+1',
      'https://placehold.co/600x800/1f2937/ffffff?text=Competition+2',
      'https://placehold.co/900x600/4b5563/ffffff?text=Competition+3'
    ]
  },
  {
    title: '第三章：生活点滴',
    description: '辩论之外，我们是会一起聚餐、出游、分享生活的朋友。这份情谊，是辩论带给我们最宝贵的财富之一。',
    images: [
      'https://placehold.co/600x800/9ca3af/ffffff?text=Leisure+1',
      'https://placehold.co/600x400/d1d5db/111827?text=Leisure+2',
      'https://placehold.co/600x900/4b5563/ffffff?text=Leisure+3'
    ]
  }
];

let observer;

function setupClickToScroll() {
  const imageGroups = document.querySelectorAll('.image-group');
  imageGroups.forEach(group => {
    const images = group.querySelectorAll('.image-placeholder');
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        const nextIndex = (index + 1) % images.length;
        const nextImage = images[nextIndex];
        
        // Calculate the scroll position to center the next image
        const scrollLeft = nextImage.offsetLeft - (group.offsetWidth / 2) + (nextImage.offsetWidth / 2);

        group.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      });
    });
  });
}

onMounted(() => {
  // Setup for text content switching
  const imageGroups = document.querySelectorAll('.image-group');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeChapterIndex.value = parseInt(entry.target.dataset.index, 10);
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
  );
  imageGroups.forEach((group) => observer.observe(group));

  // Setup for click-to-scroll functionality
  setupClickToScroll();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.team-culture-section { padding: 8rem 0; background-color: #f3f4f6; color: #111827; }
.grid-container { display: grid; grid-template-columns: repeat(12, 1fr); gap: 2rem; max-width: 1536px; margin: 0 auto; padding: 0; }

/* --- Left Column --- */
.text-column {
  grid-column: 1 / span 5;
  position: relative;
}
.text-content-wrapper {
  position: sticky;
  top: 8rem;
  height: calc(100vh - 16rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
}
.chapter-title { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
.chapter-description { font-size: 1.125rem; color: #4b5563; }

/* --- Right Column --- */
.gallery-column {
  grid-column: 7 / span 6;
}
.gallery-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

/* --- Click-to-Scroll Horizontal Gallery --- */
.image-group {
  position: relative; /* This is the fix! Establishes a new coordinate system. */
  display: flex;
  flex-direction: row;
  gap: 2rem;
  overflow-x: auto;
  /* Hide the scrollbar */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none;  /* For Internet Explorer and Edge */
}
.image-group::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}

.image-placeholder {
  height: 60vh;
  width: auto;
  display: block;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  cursor: pointer; /* Indicate that the image is clickable */
}

/* --- Transition --- */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>