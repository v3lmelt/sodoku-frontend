import { createRouter, createWebHistory } from 'vue-router'
import startPage from "@/views/startPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: startPage,
    }
  ]
})

export default router
