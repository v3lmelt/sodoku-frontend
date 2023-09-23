import { createRouter, createWebHistory } from 'vue-router'
import startPage from "@/views/startPage.vue";
import selectSudokuPage from "@/views/selectSudokuPage.vue"
import  test from  "@/views/test.vue"
import sudokuPage from "@/views/sudokuPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: startPage,
    },
    {
      path:'/selectSudokuPage',
      name:'selectSudokuPage',
      component:selectSudokuPage,
    },
    {
      path:'/test',
      name:'test',
      component:test,
    },
    {
      path:'/sudokuPage',
      name:'sudokuPage',
      component:sudokuPage,
    },

  ]
})

export default router
