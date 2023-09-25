import { createRouter, createWebHistory } from 'vue-router'
import startPage from "@/views/startPage.vue";
import selectSudokuPage from "@/views/selectSudokuPage.vue"
import  test from  "@/views/test.vue"
import sudokuPage from "@/views/sudokuPage.vue";
import detailSudoku from "@/views/datailSudoku.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: startPage,
    },
    {
      path:'/detailSudoku',
      name:'detailSudoku',
      component:detailSudoku,
      children:[
        {
          path:'/selectSudokuPage',
          name:'selectSudokuPage',
          component:selectSudokuPage,
          meta: {
            title: '选择数独'
          }
        },
        {
          path:'/test',
          name:'test',
          component:test,
        },
        {
          path:'/sudokuPage/:sudokuID',
          name:'sudokuPage',
          component:sudokuPage,
          meta: {
            title: `数独`
          }
        },
      ]
    }
  ]
})

export default router
