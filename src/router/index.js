import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/views/Home.vue'),
  },
  {
    name: 'List',
    path: '/list',
    component: () => import('@/views/List.vue'),
  },
  {
    name: 'Cart',
    path: '/cart',
    component: () => import('@/views/Cart.vue'),
  },
  {
    name: 'Mine',
    path: '/mine',
    component: () => import('@/views/Mine.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
