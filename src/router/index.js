import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home, // Specify the default layout
      meta: { layout: 'default' },
    },
    {
      path: '/about',
      name: 'about',
    },
  ],
})

export default router
