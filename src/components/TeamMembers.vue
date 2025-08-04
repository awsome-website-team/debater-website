<template>
  <section id="team" class="team-section">
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title">核心成员 & 团队荣誉</h2>
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

      <!-- Conditional Rendering: Members Grid OR Honors List -->
      <div class="content-wrapper">
        <!-- 1. Members Grid -->
        <transition-group v-if="activeFilter !== '荣誉'" name="list" tag="div" class="members-grid">
          <div v-for="member in filteredMembers" :key="member.id" class="member-card">
            <div class="card-image-wrapper">
              <img :src="member.image" :alt="member.name" class="card-image">
            </div>
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-title">{{ member.title }}</p>
          </div>
        </transition-group>

        <!-- 2. Honors List -->
        <transition-group v-else name="list" tag="div" class="honors-list">
          <div v-for="honor in honors" :key="honor.id" class="honor-card">
            <span class="honor-year">{{ honor.year }}</span>
            <span class="honor-title">{{ honor.title }}</span>
          </div>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const filters = ['全部', '24级', '23级', '22级', '往届', '荣誉'];
const activeFilter = ref('全部');

// --- DATA SOURCES ---

const members = ref([
  // 24级 (8 members)
  { id: 1, name: '张三', title: '队长', category: '24级', image: 'https://placehold.co/400x400/1f2937/ffffff?text=Z.S.' },
  { id: 2, name: '李四', title: '一辩', category: '24级', image: 'https://placehold.co/400x400/374151/ffffff?text=L.S.' },
  { id: 3, name: '王五', title: '二辩', category: '24级', image: 'https://placehold.co/400x400/4b5563/ffffff?text=W.W.' },
  { id: 4, name: '赵六', title: '三辩', category: '24级', image: 'https://placehold.co/400x400/6b7280/ffffff?text=Z.L.' },
  { id: 5, name: '队员A', title: '资料组', category: '24级', image: 'https://placehold.co/400x400/1f2937/ffffff?text=A' },
  { id: 6, name: '队员B', title: '资料组', category: '24级', image: 'https://placehold.co/400x400/374151/ffffff?text=B' },
  { id: 7, name: '队员C', title: '陪练', category: '24级', image: 'https://placehold.co/400x400/4b5563/ffffff?text=C' },
  { id: 8, name: '队员D', title: '陪练', category: '24级', image: 'https://placehold.co/400x400/6b7280/ffffff?text=D' },

  // 23级 (8 members)
  { id: 9, name: '孙七', title: '副队长', category: '23级', image: 'https://placehold.co/400x400/9ca3af/ffffff?text=S.Q.' },
  { id: 10, name: '周八', title: '结辩', category: '23级', image: 'https://placehold.co/400x400/d1d5db/111827?text=Z.B.' },
  { id: 11, name: '队员E', title: '一辩', category: '23级', image: 'https://placehold.co/400x400/9ca3af/ffffff?text=E' },
  { id: 12, name: '队员F', title: '二辩', category: '23级', image: 'https://placehold.co/400x400/d1d5db/111827?text=F' },
  { id: 13, name: '队员G', title: '三辩', category: '23级', image: 'https://placehold.co/400x400/9ca3af/ffffff?text=G' },
  { id: 14, name: '队员H', title: '四辩', category: '23级', image: 'https://placehold.co/400x400/d1d5db/111827?text=H' },
  { id: 15, name: '队员I', title: '资料组', category: '23级', image: 'https://placehold.co/400x400/9ca3af/ffffff?text=I' },
  { id: 16, name: '队员J', title: '陪练', category: '23级', image: 'https://placehold.co/400x400/d1d5db/111827?text=J' },
  
  // 22级 (8 members)
  { id: 17, name: '吴九', title: '前队长', category: '22级', image: 'https://placehold.co/400x400/fde68a/111827?text=W.J.' },
  { id: 18, name: '郑十', title: '前副队', category: '22级', image: 'https://placehold.co/400x400/fbcfe8/111827?text=Z.S.' },
  { id: 19, name: '队员K', title: '一辩', category: '22级', image: 'https://placehold.co/400x400/fde68a/111827?text=K' },
  { id: 20, name: '队员L', title: '二辩', category: '22级', image: 'https://placehold.co/400x400/fbcfe8/111827?text=L' },
  { id: 21, name: '队员M', title: '三辩', category: '22级', image: 'https://placehold.co/400x400/fde68a/111827?text=M' },
  { id: 22, name: '队员N', title: '四辩', category: '22级', image: 'https://placehold.co/400x400/fbcfe8/111827?text=N' },
  { id: 23, name: '队员O', title: '资料组', category: '22级', image: 'https://placehold.co/400x400/fde68a/111827?text=O' },
  { id: 24, name: '队员P', title: '陪练', category: '22级', image: 'https://placehold.co/400x400/fbcfe8/111827?text=P' },

  // 往届
  { id: 25, name: '传奇学长', title: '创始人', category: '往届', image: 'https://placehold.co/400x400/a7f3d0/111827?text=S' },
  { id: 26, name: '传奇学姐', title: '创始人', category: '往届', image: 'https://placehold.co/400x400/bfdbfe/111827?text=S' },
]);

const honors = ref([
  { id: 101, year: '2022', title: '“思辨之光”全国邀请赛 四强' },
  { id: 102, year: '2021', title: '“信息杯”校内辩论赛 冠军' },
  { id: 103, year: '2020', title: '“新国辩”世界辩论锦标赛 国际季军' },
  { id: 104, year: '2019', title: '“捭阖杯”全国辩论挑战赛 亚军' },
]);

// --- COMPUTED PROPERTIES ---

const filteredMembers = computed(() => {
  if (activeFilter.value === '全部') {
    // Exclude '往届荣誉' as it's not a member category
    return members.value;
  }
  return members.value.filter(member => member.category === activeFilter.value);
});
</script>

<style scoped>
/* General Section Styles */
.team-section { background-color: #111827; padding: 6rem 2rem; color: #f9fafb; }
.container { max-width: 1280px; margin: 0 auto; text-align: center; }
.section-title { font-size: 3rem; font-weight: 800; }
.section-subtitle { font-size: 1.125rem; color: #9ca3af; margin-top: 1rem; max-width: 42rem; margin-left: auto; margin-right: auto; }

/* Filter Buttons */
.filter-buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin-top: 3rem; margin-bottom: 3rem; }
.filter-button { padding: 0.5rem 1.25rem; border: 1px solid #374151; border-radius: 9999px; font-weight: 600; transition: all 0.2s ease; background-color: transparent; color: #d1d5db; cursor: pointer; }
.filter-button:hover { background-color: #374151; color: #ffffff; }
.filter-button.active { background-color: #ffffff; color: #111827; border-color: #ffffff; }

/* Content Wrapper for smooth height transition */
.content-wrapper { min-height: 500px; /* Prevent layout shift during transition */ }

/* Members Grid Styles */
.members-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
@media (min-width: 768px) { .members-grid { grid-template-columns: repeat(4, 1fr); gap: 2.5rem; } }
.member-card { text-align: center; }
.card-image-wrapper { width: 100%; padding-bottom: 100%; position: relative; border-radius: 9999px; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.card-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
.member-name { font-size: 1.25rem; font-weight: 700; }
.member-title { color: #9ca3af; }

/* Honors List Styles */
.honors-list { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.honor-card { display: flex; align-items: baseline; gap: 1.5rem; background-color: #1f2937; padding: 1rem 2rem; border-radius: 0.5rem; width: 100%; max-width: 36rem; }
.honor-year { font-size: 1rem; font-weight: 600; color: #fde68a; /* A gold-like color */ }
.honor-title { font-size: 1.125rem; color: #e5e7eb; text-align: left; }

/* Transition-group styles for both lists */
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
