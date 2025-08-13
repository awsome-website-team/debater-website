import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import WhyWeDebate from '@/views/WhyWeDebate.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/why-we-debate',
    name: 'WhyWeDebate',
    component: WhyWeDebate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // This will scroll to the top on every route change
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
