<template>
  <div ref="galleryWrapper" class="gallery-wrapper">
    <div class="sticky-container">
      <div ref="scrollContent" class="scroll-content">
        
        <!-- Album Cards -->
        <div v-for="(album, index) in albums" :key="album.id" class="card">
          <div class="card-background" :style="{ backgroundImage: `url(${album.image})` }"></div>
          <div class="card-content">
            <!-- Play/Pause Button -->
            <button v-if="album.audio" @click="togglePlay(album.id, index)" class="play-button">
              <!-- Pause Icon -->
              <svg v-if="isPlaying && currentlyPlayingId === album.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              <!-- Play Icon -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>

            <h3 class="title">{{ album.title }}</h3>
            <p class="subtitle">{{ album.subtitle }}</p>
          </div>
          <!-- Hidden Audio Element -->
          <audio :ref="el => audioRefs[index] = el" :src="album.audio" preload="none"></audio>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';

// --- ASSET IMPORTS ---
import moneyDebateImg from '@/assets/debategallery/金钱辩.png';
import moneyDebateAudio from '@/assets/debategallery/金钱辩.aac';

// --- DATA ---
const albums = ref([
  { id: 1, title: '金钱辩', subtitle: '金钱是否把人异化了', image: moneyDebateImg, audio: moneyDebateAudio },
  { id: 2, title: '科技辩', subtitle: '科技发展是否会取代人类思考', image: 'https://placehold.co/600x600/1f2937/ffffff?text=Tech', audio: null },
  // ... other placeholders
  { id: 3, title: '人性辩', subtitle: '人性本善还是性本恶', image: 'https://placehold.co/600x600/374151/ffffff?text=Humanity', audio: null },
  { id: 4, title: '环保辩', subtitle: '环保是个人责任还是政府责任', image: 'https://placehold.co/600x600/4b5563/ffffff?text=Eco', audio: null },
  { id: 5, title: '教育辩', subtitle: '通才教育还是专才教育更重要', image: 'https://placehold.co/600x600/6b7280/ffffff?text=Edu', audio: null },
  { id: 6, title: '艺术辩', subtitle: '艺术是否应该有道德底线', image: 'https://placehold.co/600x600/9ca3af/ffffff?text=Art', audio: null },
  { id: 7, title: '历史辩', subtitle: '时势造英雄还是英雄造时势', image: 'https://placehold.co/600x600/d1d5db/111827?text=History', audio: null },
  { id: 8, title: '未来辩', subtitle: '人工智能能否拥有真正的创造力', image: 'https://placehold.co/600x600/fde68a/111827?text=Future', audio: null },
]);

// --- AUDIO LOGIC ---
const audioRefs = ref([]);
const currentlyPlayingId = ref(null);
const isPlaying = ref(false);

const togglePlay = (id, index) => {
  const audio = audioRefs.value[index];
  if (!audio) return;

  // If clicking a different album
  if (currentlyPlayingId.value !== null && currentlyPlayingId.value !== id) {
    const oldIndex = albums.value.findIndex(a => a.id === currentlyPlayingId.value);
    const oldAudio = audioRefs.value[oldIndex];
    if (oldAudio) {
      oldAudio.pause();
      oldAudio.currentTime = 0;
    }
  }

  // Toggle play/pause for the clicked album
  if (isPlaying.value && currentlyPlayingId.value === id) {
    audio.pause();
    isPlaying.value = false;
  } else {
    audio.play();
    isPlaying.value = true;
    currentlyPlayingId.value = id;
  }
};

// --- SCROLLING LOGIC ---
const galleryWrapper = ref(null);
const scrollContent = ref(null);
let lenis;

onMounted(() => {
  // Attach 'ended' event listeners to reset state
  audioRefs.value.forEach((audio, index) => {
    if (audio) {
      audio.onended = () => {
        isPlaying.value = false;
        currentlyPlayingId.value = null;
      };
    }
  });

  const wrapper = galleryWrapper.value;
  const content = scrollContent.value;
  if (!wrapper || !content) return;

  const setHeight = () => {
    if (content.scrollWidth > window.innerWidth) {
      wrapper.style.height = `${content.scrollWidth * 0.7}px`; 
    } else {
      wrapper.style.height = `100vh`;
    }
  };
  setHeight();
  window.addEventListener('resize', setHeight);

  lenis = new Lenis();
  lenis.on('scroll', ({ scroll }) => {
    const rect = wrapper.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    const scrollableDistance = wrapper.scrollHeight - window.innerHeight;
    const maxTranslate = content.scrollWidth - window.innerWidth;
    const progress = (scroll - wrapper.offsetTop) / scrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    content.style.transform = `translateX(-${clampedProgress * maxTranslate}px)`;
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  onUnmounted(() => {
    window.removeEventListener('resize', setHeight);
    lenis.destroy();
    lenis = null;
  });
});
</script>

<style scoped>
.gallery-wrapper { position: relative; background-color: #111827; }
.sticky-container { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; align-items: center; }
.scroll-content { display: flex; align-items: center; gap: 4rem; padding: 0 8rem; }

.card { position: relative; flex-shrink: 0; width: 24rem; height: 24rem; border-radius: 0.75rem; overflow: hidden; color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
.card-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.6s ease; }
.card:hover .card-background { transform: scale(1.05); }

.card-content { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; background-color: rgba(0, 0, 0, 0.5); transition: background-color 0.4s ease; }
.card:hover .card-content { background-color: rgba(0, 0, 0, 0.2); }

.title { font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; }
.subtitle { font-family: serif; font-size: 1.125rem; color: #d1d5db; }

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 5rem; /* 80px */
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: all 0.4s ease;
}
.card:hover .play-button {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
.play-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%) scale(1.1);
}
.play-button svg {
  width: 2.5rem; /* 40px */
  height: 2.5rem;
  margin-left: 5px; /* Optical alignment for play icon */
}
.play-button:hover svg {
  filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));
}
</style>
