import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    component: () => import('@/views/Welcome.vue')
  },
  {
    path: '/instructions',
    component: () => import('@/views/Instructions.vue')
  },
  {
    path: '/excercises',
    component: () => import('@/views/Excercises.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
