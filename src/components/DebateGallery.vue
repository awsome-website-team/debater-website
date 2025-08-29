<template>
  <div ref="galleryWrapper" class="gallery-wrapper">
    <div class="sticky-container">
      
      <!-- Static Header Content -->
      <div class="header-content">
        <div class="header-left">
          <h2 class="main-heading">为什么辩论?</h2>
        </div>
        <div class="header-right">
          <router-link to="/why-we-debate" class="sub-heading-link">
            <p class="sub-heading">
              柏拉图在《申辩篇》中记载，苏格拉底认为自己唯一的智慧便是知道自己一无所知。与赛场上的针锋相对不同，每个辩论片段带给我们的都是虔诚的谦卑
            </p>
            <span class="read-more">深入阅读 &rarr;</span>
          </router-link>
        </div>
      </div>

      <!-- Scrolling Album Cards -->
      <div ref="scrollContent" class="scroll-content">
        <div v-for="(album, index) in albums" :key="album.id" class="card">
          <div class="card-background" :style="{ backgroundImage: `url(${album.image})` }"></div>
          <div class="card-content">
            <button v-if="album.audio" @click="togglePlay(album.id, index)" class="play-button">
              <svg v-if="isPlaying && currentlyPlayingId === album.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <h3 class="title">{{ album.title }}</h3>
            <p class="subtitle">{{ album.subtitle }}</p>
            <PlayingIcon v-if="isPlaying && currentlyPlayingId === album.id" class="playing-indicator" />
          </div>
          <audio :ref="el => audioRefs[index] = el" :src="album.audio" preload="none"></audio>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';
import PlayingIcon from './PlayingIcon.vue';

import moneyDebateImg from '@/assets/debategallery/money-debate.png';
import moneyDebateAudio from '@/assets/debategallery/money-debate.mp3';
import loveDebateImgeImg from '@/assets/debategallery/love-debate.png';
import loveDebateAudio from '@/assets/debategallery/love-debate.MP3';
import lonelyDebateImgeImg from '@/assets/debategallery/lonely-debate.png';
import lonelyDebateAudio from '@/assets/debategallery/lonely-debate.MP3';
import sociableDebateImgeImg from '@/assets/debategallery/sociable-debate.png';
import socibaleDebateAudio from '@/assets/debategallery/sociable-debate.MP3';

const albums = ref([
  { id: 1, title: '如果有超能力让你喜欢的人爱上你，你会不会使用', subtitle:'', image: loveDebateImgeImg, audio: loveDebateAudio},
  { id: 2, title: '金钱是不是万恶之源', subtitle: '', image: moneyDebateImg, audio: moneyDebateAudio },
  { id: 3, title: '人终将孤独还是不孤独', subtitle: '', image: lonelyDebateImgeImg , audio: lonelyDebateAudio},
  { id: 4, title: '我更愿意当一个合群/不合群的大人', subtitle: '', image: sociableDebateImgeImg , audio: socibaleDebateAudio},
  { id: 5, title: '教育辩', subtitle: '通才教育还是专才教育更重要', image: 'https://placehold.co/600x600/6b7280/ffffff?text=Edu', audio: null },
  { id: 6, title: '艺术辩', subtitle: '艺术是否应该有道德底线', image: 'https://placehold.co/600x600/9ca3af/ffffff?text=Art', audio: null },
  { id: 7, title: '历史辩', subtitle: '时势造英雄还是英雄造时势', image: 'https://placehold.co/600x600/d1d5db/111827?text=History', audio: null },
  { id: 8, title: '未来辩', subtitle: '人工智能能否拥有真正的创造力', image: 'https://placehold.co/600x600/fde68a/111827?text=Future', audio: null },
]);

const audioRefs = ref([]);
const currentlyPlayingId = ref(null);
const isPlaying = ref(false);

const togglePlay = (id, index) => {
  const audio = audioRefs.value[index];
  if (!audio) return;
  if (currentlyPlayingId.value !== null && currentlyPlayingId.value !== id) {
    const oldIndex = albums.value.findIndex(a => a.id === currentlyPlayingId.value);
    const oldAudio = audioRefs.value[oldIndex];
    if (oldAudio) { oldAudio.pause(); oldAudio.currentTime = 0; }
  }
  if (isPlaying.value && currentlyPlayingId.value === id) {
    audio.pause(); isPlaying.value = false;
  } else {
    audio.play(); isPlaying.value = true; currentlyPlayingId.value = id;
  }
};

const galleryWrapper = ref(null);
const scrollContent = ref(null);
let lenis;

onMounted(() => {
  audioRefs.value.forEach((audio) => {
    if (audio) { audio.onended = () => { isPlaying.value = false; currentlyPlayingId.value = null; }; }
  });

  const wrapper = galleryWrapper.value;
  const content = scrollContent.value;
  if (!wrapper || !content) return;

  const setHeight = () => {
    if (content.scrollWidth > window.innerWidth) { wrapper.style.height = `${content.scrollWidth * 0.7}px`; } 
    else { wrapper.style.height = `100vh`; }
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

  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  onUnmounted(() => {
    window.removeEventListener('resize', setHeight);
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
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
  align-items: center; 
}

/* --- Header Styles --- */
.header-content { 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  padding: 3rem 4rem; 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start; 
  z-index: 10; 
}
.header-left { pointer-events: none; }
.header-right { 
  pointer-events: all; 
  padding-bottom: 2rem; /* Add a buffer to prevent overlap */
}

.main-heading { font-size: 2.25rem; font-weight: 800; color: white; }
.sub-heading-link { text-decoration: none; color: inherit; }
.sub-heading { font-family: serif; font-size: 1.125rem; color: #9ca3af; max-width: 28rem; text-align: right; margin-bottom: 0.5rem; transition: color 0.3s ease; }
.read-more { display: block; text-align: right; font-weight: 600; color: white; opacity: 0.4; transition: opacity 0.3s ease; }
.sub-heading-link:hover .read-more { opacity: 1; }
.sub-heading-link:hover .sub-heading { color: white; }

/* --- Scrolling Content Styles --- */
.scroll-content { display: flex; align-items: center; gap: 4rem; padding: 0 8rem; }
.card { position: relative; flex-shrink: 0; width: 24rem; height: 24rem; border-radius: 0.75rem; overflow: hidden; color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
.card-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.6s ease; }
.card:hover .card-background { transform: scale(1.05); }
.card-content { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; background-color: rgba(0, 0, 0, 0.5); transition: background-color 0.4s ease; }
.card:hover .card-content { background-color: rgba(0, 0, 0, 0.2); }
.title { font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; }
.subtitle { font-family: serif; font-size: 1.125rem; color: #d1d5db; }

/* --- Play Button & Indicator Styles --- */
.play-button { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); width: 5rem; height: 5rem; background-color: rgba(255, 255, 255, 0.2); border-radius: 9999px; border: 2px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; opacity: 0; transition: all 0.4s ease; pointer-events: all; }
.card:hover .play-button { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.play-button:hover { background-color: rgba(255, 255, 255, 0.3); transform: translate(-50%, -50%) scale(1.1); }
.play-button svg { width: 2.5rem; height: 2.5rem; margin-left: 5px; }
.play-button:hover svg { filter: drop-shadow(0 0 5px rgba(255,255,255,0.5)); }
.playing-indicator { position: absolute; bottom: 1.5rem; right: 1.5rem; opacity: 0.7; }

/* --- Responsive Styles for Mobile --- */
@media (max-width: 768px) {
  .sticky-container {
    /* On mobile, we add padding to the top to make space for the header,
       and align-items: flex-start to push the gallery to that space. */
    padding-top: 16rem; /* Generous space for the header */
    align-items: flex-start; /* Align gallery to the top of the remaining space */
  }

  .header-content {
    flex-direction: column; /* Stack header items vertically */
    align-items: flex-start; /* Align to the left */
    padding: 2rem 1.5rem; /* Reduce padding */
    gap: 1rem; /* Add some space between title and subtitle */
  }

  .header-right {
    width: 100%; /* Allow it to take full width */
    padding-bottom: 0; /* Reset padding on mobile */
  }

  .main-heading {
    font-size: 1.75rem; /* Slightly smaller title */
  }

  .sub-heading {
    max-width: 100%; /* Remove max-width constraint */
    text-align: left; /* Align text to the left */
    font-size: 1rem; /* Slightly smaller font */
  }

  .read-more {
    text-align: left; /* Align "read more" to the left */
  }

  .scroll-content {
    padding: 0 1.5rem; /* Reduce padding for the cards container */
    gap: 1.5rem; /* Reduce gap between cards */
  }

  .card {
    width: 18rem; /* Smaller cards */
    height: 18rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>