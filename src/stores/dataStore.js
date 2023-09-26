import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const dataStore = defineStore('globalData', () => {
  const sudokuArray = ref([])
  const difficulty = ref("")


  // 设置难度
  function setDifficulty(diff){
    difficulty.value = diff;
  }

  // 设置数独数组
  function setSudokuArray(arr){
    sudokuArray.value = arr;
  }



  return {sudokuArray, difficulty, setDifficulty, setSudokuArray}
})
