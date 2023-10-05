<script>
import sudokuTimer from "@/components/sudokuTimer.vue";
import SudokuTimer from "@/components/sudokuTimer.vue";

export default {
  name: "timerTest.vue",
  components: {SudokuTimer},
  data(){
    return{
      timerEnabled: false,
      timerCount: 0,
    }
  },
  methods:{
    buttonEvent(){
      this.timerEnabled = !this.timerEnabled;
    }
  }
}
</script>

<template>
  <div>
    <el-button @click="buttonEvent"> 点我关闭时钟 </el-button>
    <sudoku-timer :enabled="timerEnabled" :time="timerCount"></sudoku-timer>
  </div>

</template>

<style scoped>

</style>