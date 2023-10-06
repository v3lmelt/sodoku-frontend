import { createRouter, createWebHistory } from 'vue-router'
import startPage from "@/views/startPage.vue";
import selectSudokuPage from "@/views/selectSudokuPage.vue"
import sudokuPage from "@/views/sudokuPage.vue";
import navBar from "@/views/navBar.vue"
import darkStartPage from "@/views/darkTheme/darkStartPage.vue"
import darkNavBar from "@/views/darkTheme/darkNavBar.vue"
import darkSelectPage from "@/views/darkTheme/darkSelectPage.vue"
import darkSudokuPage from "@/views/darkTheme/darkSudokuPage.vue"
import timer from "@/components/sudokuTimer.vue"
import timerTest from "@/views/timerTest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: startPage,
    },
    {
      path: '/darkStartPage',
      name: 'darkStartPage',
      component: darkStartPage,
    },
    {
      path: '/test',
      name: 'testPage',
      component: timerTest,
    },
    {
      path: '/navBar',
      name: 'navBar',
      component: navBar,
      children: [
        {
          path: '/selectSudokuPage',
          name: 'selectSudokuPage',
          component: selectSudokuPage,
          meta: {
            title: '选择数独'
          }
        },
        {
          path: '/sudokuPage/:sudokuID',
          name: 'sudokuPage',
          component: sudokuPage,
          meta: {
            title: `数独`
          }
        },
      ]
    },
    {
      path: '/darkNavBar',
      name: 'darkNavBar',
      component: darkNavBar,
      children: [
        {
          path: '/darkSelectPage',
          name: 'darkSelectPage',
          component: darkSelectPage,
          meta: {
            title: '选择数独'
          }
        },
        {
          path: '/darkSudokuPage/:sudokuID',
          name: 'darkSudokuPage',
          component: darkSudokuPage,
          meta: {
            title: `数独`
          }
        },
      ]
    },
  ]
})

export default router
