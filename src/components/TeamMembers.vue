<template>
  <section id="team" class="team-section">
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title">核心成员</h2>
      <p class="section-subtitle">我们是来自不同年级、不同背景，但对辩论抱有同样热情的思想者。</p>

      <!-- Filter Buttons -->
      <div class="filter-buttons">
        <button 
          v-for="filter in filters" 
          :key="filter" 
          @click="activeFilter = filter"
          :class="['filter-button', { 'active': activeFilter === filter }]">
          {{ filter }}
        </button>
      </div>

      <!-- Members Grid -->
      <transition-group name="list" tag="div" class="members-grid">
        <div v-for="member in filteredMembers" :key="member.id" class="member-card">
          <div class="card-image-wrapper">
            <img :src="member.image" :alt="member.name" class="card-image">
          </div>
          <h3 class="member-name">{{ member.name }}</h3>
          <p class="member-title">{{ member.title }}</p>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const filters = ['全部', '24级', '23级', '22级', '往届荣誉'];
const activeFilter = ref('全部');

const members = ref([
  { id: 1, name: '张三', title: '队长', category: '24级', image: 'https://placehold.co/400x400/1f2937/ffffff?text=Z.S.' },
  { id: 2, name: '李四', title: '一辩', category: '24级', image: 'https://placehold.co/400x400/374151/ffffff?text=L.S.' },
  { id: 3, name: '王五', title: '二辩', category: '23级', image: 'https://placehold.co/400x400/4b5563/ffffff?text=W.W.' },
  { id: 4, name: '赵六', title: '三辩', category: '23级', image: 'https://placehold.co/400x400/6b7280/ffffff?text=Z.L.' },
  { id: 5, name: '孙七', title: '四辩', category: '22级', image: 'https://placehold.co/400x400/9ca3af/ffffff?text=S.Q.' },
  { id: 6, name: '周八', title: '结辩', category: '22级', image: 'https://placehold.co/400x400/d1d5db/111827?text=Z.B.' },
  { id: 7, name: '吴九', title: '荣誉辩手', category: '往届荣誉', image: 'https://placehold.co/400x400/fde68a/111827?text=W.J.' },
  { id: 8, name: '郑十', title: '荣誉辩手', category: '往届荣誉', image: 'https://placehold.co/400x400/fbcfe8/111827?text=Z.S.' },
]);

const filteredMembers = computed(() => {
  if (activeFilter.value === '全部') {
    return members.value;
  }
  return members.value.filter(member => member.category === activeFilter.value);
});
</script>

<style scoped>
.team-section { background-color: #111827; padding: 6rem 2rem; color: #f9fafb; }
.container { max-width: 1280px; margin: 0 auto; text-align: center; }
.section-title { font-size: 3rem; font-weight: 800; }
.section-subtitle { font-size: 1.125rem; color: #9ca3af; margin-top: 1rem; max-width: 42rem; margin-left: auto; margin-right: auto; }
.filter-buttons { display: flex; justify-content: center; gap: 0.75rem; margin-top: 3rem; margin-bottom: 3rem; }
.filter-button { padding: 0.5rem 1.25rem; border: 1px solid #374151; border-radius: 9999px; font-weight: 600; transition: all 0.2s ease; background-color: transparent; color: #d1d5db; cursor: pointer; }
.filter-button:hover { background-color: #374151; color: #ffffff; }
.filter-button.active { background-color: #ffffff; color: #111827; border-color: #ffffff; }
.members-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
@media (min-width: 768px) { .members-grid { grid-template-columns: repeat(4, 1fr); gap: 2.5rem; } }
.member-card { text-align: center; }
.card-image-wrapper { width: 100%; padding-bottom: 100%; position: relative; border-radius: 9999px; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.card-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
.member-name { font-size: 1.25rem; font-weight: 700; }
.member-title { color: #9ca3af; }

/* Transition-group styles */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.list-leave-active {
  position: absolute;
}
</style>