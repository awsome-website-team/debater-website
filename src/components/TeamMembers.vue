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

// --- ASSET IMPORTS ---
// 24级
import bbgImg from '@/assets/members/bbg.jpg';
import shitouImg from '@/assets/members/shitou.jpg';
import chaoziImg from '@/assets/members/chaozi.jpg';
import lujiepngImg from '@/assets/members/lujiepng.jpg';
import yushengImg from '@/assets/members/yusheng.png';
import ruiziImg from '@/assets/members/ruizi.png';
import yzyImg from '@/assets/members/yzy.png';
import taoziImg from '@/assets/members/yangtao.png';
// 23级
import liaoImg from '@/assets/members/liao.jpg';
import taiyuanjiejpgImg from '@/assets/members/taiyuan.png';
import paiImg from '@/assets/members/pai.jpg';
import yizhujieImg from '@/assets/members/yizhujie.jpg';
import yuxinImg from '@/assets/members/yuxin.png';
import tianqiImg from '@/assets/members/tianqi.jpg';
import xingjiajieImg from '@/assets/members/xingjia.png';
import lliImg from '@/assets/members/lli.jpg';
// 22级
import yiyijieImg from '@/assets/members/yiyijie.jpg';
import coconutImg from '@/assets/members/coconut.jpg';
import sxImg from '@/assets/members/sx.jpg';
import qiulanImg from '@/assets/members/qiulan.jpg';
import gengqingjieImg from '@/assets/members/gengqingjie.jpg';
import OOImg from '@/assets/members/OO.jpg';
import xianhaoImg from '@/assets/members/xianhao.jpg';
// 往届
import yinijieImg from '@/assets/members/yinijie.jpg';
import yixuanjieImg from '@/assets/members/yixuanjie.jpg';
import wenyunjieImg from '@/assets/members/wenyunjie.jpg';
import dashiImg from '@/assets/members/dashi.jpg';


const filters = ['全部', '24级', '23级', '22级', '往届', '荣誉'];
const activeFilter = ref('全部');

// --- DATA SOURCES ---

const members = ref([
  // 24级 (8 members)
  { id: 1, name: '林钰泽', title: '现任队长', category: '24级', image: bbgImg },
  { id: 2, name: '龙晓磊', title: '队员', category: '24级', image: shitouImg },
  { id: 3, name: '赵煦超', title: '队员', category: '24级', image: chaoziImg },
  { id: 4, name: '揭丽璐', title: '队员', category: '24级', image: lujiepngImg },
  { id: 5, name: '吴宇升', title: '队员', category: '24级', image: yushengImg },
  { id: 6, name: '吴杨蕊瑞', title: '队员', category: '24级', image: ruiziImg },
  { id: 7, name: '阳泽怡', title: '队员', category: '24级', image: yzyImg },
  { id: 8, name: '杨涛', title: '队员', category: '24级', image: taoziImg },

  // 23级 (8 members)
  { id: 9, name: '廖羿杰', title: '前队长', category: '23级', image: liaoImg },
  { id: 10, name: '吴太源', title: '队员', category: '23级', image: taiyuanjiejpgImg },
  { id: 11, name: '颜宏斌', title: '队员', category: '23级', image: paiImg },
  { id: 12, name: '王艺竹', title: '队员', category: '23级', image: yizhujieImg},
  { id: 13, name: '刘雨欣', title: '队员', category: '23级', image: yuxinImg },
  { id: 14, name: '蔡天琪', title: '队员', category: '23级', image: tianqiImg },
  { id: 15, name: '周欣佳', title: '队员', category: '23级', image: xingjiajieImg },
  { id: 16, name: '冯立佳', title: '队员', category: '23级', image: lliImg },
  
  // 22级 (8 members)i
  { id: 17, name: '郑伊依', title: '前队长', category: '22级', image: yiyijieImg },
  { id: 18, name: '张潇', title: '队员', category: '22级', image: coconutImg },
  { id: 19, name: '杨帅祥', title: '队员', category: '22级', image: sxImg },
  { id: 20, name: '黄秋岚', title: '队员', category: '22级', image: qiulanImg },
  { id: 21, name: '杨益', title: '队员', category: '22级', image: 'https://placehold.co/400x400/fde68a/111827?text=M' },
  { id: 22, name: '耿晴', title: '队员', category: '22级', image: gengqingjieImg },
  { id: 23, name: '郑媛元', title: '队员', category: '22级', image: OOImg },
  { id: 24, name: '荆显皓', title: '队员', category: '22级', image: xianhaoImg },

  // 往届
  { id: 25, name: '蒋怡宁', title: '创始人', category: '往届', image: yinijieImg },
  { id: 26, name: '王怡萱', title: '创始人', category: '往届', image: yixuanjieImg },
  { id: 27, name: '徐文韵', title: '创始人', category: '往届', image: wenyunjieImg },
  { id: 28, name: '黄浩真', title: '创始人', category: '往届', image: dashiImg },
]);

const honors = ref([
  { id: 100, year: '2025', title: '厦门大学“校赛” 八强' },
  { id: 101, year: '2024', title: '厦门大学“校赛” 八强' },
  { id: 102, year: '2023', title: '厦门大学“新生赛” 八强' },
  { id: 103, year: '2022', title: '厦门大学“新生赛” 四强' },
  { id: 104, year: '2020', title: '厦门大学“新生赛” 亚军' },
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
