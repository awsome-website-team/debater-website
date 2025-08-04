<template>
  <div ref="galleryWrapper" class="gallery-wrapper">
    <div class="sticky-container">
      <div ref="scrollContent" class="scroll-content">
        
        <!-- Card 1 -->
        <div class="card">
          <div class="image-container"><img src="https://placehold.co/400x600/1f2937/e5e7eb?text=Debater+1" alt="Debater 1"></div>
          <h3>黄执中</h3>
          <p class="year">(2003)</p>
          <p class="quote">“人能幸福，在于他有能力不幸。”</p>
        </div>

        <!-- Card 2 -->
        <div class="card">
          <div class="image-container"><img src="https://placehold.co/400x600/1f2937/e5e7eb?text=Debater+2" alt="Debater 2"></div>
          <h3>马薇薇</h3>
          <p class="year">(2014)</p>
          <p class="quote">“需要爱的人，才谈得上自由。”</p>
        </div>

        <!-- Card 3 -->
        <div class="card">
          <div class="image-container"><img src="https://placehold.co/400x600/1f2937/e5e7eb?text=Debater+3" alt="Debater 3"></div>
          <h3>周玄毅</h3>
          <p class="year">(2015)</p>
          <p class="quote">“你以为你是在表达自己，其实你是在消费符号。”</p>
        </div>

        <!-- Card 4 -->
        <div class="card">
          <div class="image-container"><img src="https://placehold.co/400x600/1f2937/e5e7eb?text=Debater+4" alt="Debater 4"></div>
          <h3>詹青云</h3>
          <p class="year">(2018)</p>
          <p class="quote">“趁着年轻，我偏要勉强。”</p>
        </div>
        
        <!-- Card 5-8 (Duplicates) -->
        <div class="card">
          <div class="image-container"><img src="https://placehold.co/400x600/1f2937/e5e7eb?text=Debater+5" alt="Debater 5"></div>
          <h3>黄执中</h3>
          <p class="year">(2003)</p>
          <p class="quote">“人能幸福，在于他有能力不幸。”</p>
        </div>
        <div class="card">
          <div class="image-container"><img src="https://placehold.co/400x600/1f2937/e5e7eb?text=Debater+6" alt="Debater 6"></div>
          <h3>马薇薇</h3>
          <p class="year">(2014)</p>
          <p class="quote">“需要爱的人，才谈得上自由。”</p>
        </div>
        <div class="card">
          <div class="image-container"><img src="https://placehold.co/400x600/1f2937/e5e7eb?text=Debater+7" alt="Debater 7"></div>
          <h3>周玄毅</h3>
          <p class="year">(2015)</p>
          <p class="quote">“你以为你是在表达自己，其实你是在消费符号。”</p>
        </div>
        <div class="card">
          <div class="image-container"><img src="https://placehold.co/400x600/1f2937/e5e7eb?text=Debater+8" alt="Debater 8"></div>
          <h3>詹青云</h3>
          <p class="year">(2018)</p>
          <p class="quote">“趁着年轻，我偏要勉强。”</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';

const galleryWrapper = ref(null);
const scrollContent = ref(null);
let lenis;

const updateCardEffects = () => {
  if (!scrollContent.value) return;
  const screenCenter = window.innerWidth / 2;
  const cards = scrollContent.value.children;
  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(screenCenter - cardCenter);
    const scale = Math.max(0.8, 1 - (distance / screenCenter) * 0.4);
    const opacity = Math.max(0.4, 1 - (distance / screenCenter) * 0.6);
    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
  }
};

onMounted(() => {
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
    updateCardEffects();
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  updateCardEffects();

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
.card { flex-shrink: 0; width: 20rem; text-align: center; color: white; transition: transform 0.4s ease, opacity 0.4s ease; }
.image-container { width: 12rem; height: 12rem; margin: 0 auto 1.5rem; border-radius: 9999px; overflow: hidden; background-color: #374151; }
.image-container img { width: 100%; height: 100%; object-fit: cover; }
.card h3 { font-size: 1.5rem; font-weight: 700; }
.card .year { color: #9CA3AF; font-size: 0.875rem; margin-bottom: 1rem; }
.card .quote { font-style: italic; color: #D1D5DB; }
</style>
