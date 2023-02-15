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
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Mlogin.vue'),
  },
  {
    name: 'Forgot',
    path: '/forgot',
    component: () => import('@/views/Forgot.vue'),
  },
  {
    name: 'Search',
    path: '/search',
    component: () => import('@/views/Search.vue'),
    children: [
      {
        name: 'Skey',
        path: '',
        component: () => import('@/views/Skey.vue'),
      },
      {
        name: 'Slist',
        path: ':product',
        component: () => import('@/views/Slist.vue'),
      },
    ],
  },
  {
    name: 'Detail',
    path: '/detail',
    component: () => import('@/views/Detail.vue'),
  },
  { path: '/:notFound(.*)*', redirect: '/home' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
