<script>
import {ref} from 'vue'
import router from "@/router";
export default {
  data() {
    return {
      delays: [],
    };
  },
  methods: {
    //生成随机数，模拟背景元素的散乱分布
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    generateSquares() {
      const totalSquares = 50; // 总共要生成的 square1 元素数量
      const windowHeight = window.innerHeight;
      const squareHeight = 2;
      const batchCount = 5; // 分批生成的批次数量
      const delayPerBatch = 100; // 每批次生成的延迟时间

      let currentDelay = delayPerBatch;
      //分两次生成，避免两次animation循环之间有过大空隙
      setTimeout(()=>{
        for (let i = 0; i < batchCount; i++) {
          setTimeout(() => {
            for (let j = 0; j < totalSquares / batchCount; j++) {
              const currentIndex = i * (totalSquares / batchCount) + j;
              let topValue = (windowHeight / totalSquares) * currentIndex;
              topValue -= (windowHeight / totalSquares) / 2; // 居中偏移量
              topValue += squareHeight / 2; // 考虑元素的高度
              let random = this.randomNum(10, 100);
              this.delays.push({ delay: random, top: topValue });
            }
          }, currentDelay);
          currentDelay += delayPerBatch;
        }
      },1000)
      for (let i = 0; i < batchCount; i++) {
        setTimeout(() => {
          for (let j = 0; j < totalSquares / batchCount; j++) {
            const currentIndex = i * (totalSquares / batchCount) + j;
            let topValue = (windowHeight / totalSquares) * currentIndex;
            topValue -= (windowHeight / totalSquares) / 2;
            topValue += squareHeight / 2;
            let random = this.randomNum(10, 100);
            this.delays.push({ delay: random, top: topValue });
          }
        }, currentDelay);
        currentDelay += delayPerBatch;
      }
    },
    getSquareStyle(index) {
      const { delay, top } = this.delays[index];
      const topValue = `${top}px`;
      const durationValue = `${7 - delay / 30}s`;
      const delayValue = `${delay / 50}ms`;

      return {
        top: topValue,
        animationDuration: durationValue,
        animationDelay: delayValue,
      };
    },
  },
  setup(){
    /**
     * 函数
     */
    /**
     * consoleText: 提供终端样式的文本
     * @param words 需要显示的终端样式文本
     * @param id
     * @param colors 颜色
     */
    function consoleText(words, id, colors) {
      if (colors === undefined) colors = ['#fff'];
      var visible = true;
      var con = document.getElementById('console');
      var letterCount = 1;
      var x = 1;
      var waiting = false;
      var target = document.getElementById(id)
      target.setAttribute('style', 'color:' + colors[0])
      window.setInterval(function() {

        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount)
          window.setTimeout(function() {
            var usedColor = colors.shift();
            colors.push(usedColor);
            var usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0])
            letterCount += x;
            waiting = false;
          }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function() {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000)
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount)
          letterCount += x;
        }
      }, 120)
      window.setInterval(function() {
        if (visible === true) {
          con.className = 'console-underscore hidden'
          visible = false;

        } else {
          con.className = 'console-underscore'

          visible = true;
        }
      }, 400)
    }

    /**
     * 设置数独难度，传入的difficulty的值应当为"easy", "normal", "hard"
     * @param difficulty
     */
    function setDifficulty(difficulty){
      if(difficulty === "easy" || difficulty === "normal" || difficulty === "hard"){
        localStorage.setItem("difficulty", difficulty)
      }else{
        // 如果填入的是无效值，那么默认简单难度
        localStorage.setItem("difficulty", 'easy')
      }

      // 清除原先有的数独数据
      if(localStorage.getItem("sudokuArray")){
        localStorage.removeItem("sudokuArray");
      }

      // 选择后跳转至9宫格界面
      router.push({name: 'selectSudokuPage'})
    }
    /**
     * 变量
     */
    const isDialogVisible = ref(false);


    return {consoleText,setDifficulty,isDialogVisible}
  },
  mounted() {
    this.consoleText(['Multithread Sudoku', '多线程数独'], 'text',['tomato','rebeccapurple','lightblue']);
    this.generateSquares();
  }

}
</script>

<template>
  <!-- 终端文本特效与开始按钮 -->

  <div class="background"></div>
  <div v-for="(delay, index) in delays" :key="index" class="square1" :style="getSquareStyle(index)">
    <!-- 可添加需要插入的内容 -->
  </div>
  <div class='console-container'><span id='text'></span><div class='console-underscore' id='console'>&#95;</div></div>
  <el-button class="start-button" size="large" @click="isDialogVisible = true">开始</el-button>

  <!-- 难度选择对话框 -->

  <el-dialog
      v-model="isDialogVisible"
      title="请选择难度"
      width="50%"
      style="opacity: 0.9"
  >
    <span slot="footer" >
      <el-row justify="space-around">
        <el-col :span="8" class="button-group">
          <el-button size="large" type="primary" @click="setDifficulty('easy')">
          <span slot="default" style="font-size: 30px">
            简单
          </span>
          </el-button></el-col>
        <el-col :span="8" class="button-group">
          <el-button size="large" type="primary" @click="setDifficulty('normal')">
          <span slot="default" style="font-size: 30px">
            中等
          </span>
        </el-button></el-col>
        <el-col :span="8" class="button-group">
          <el-button size="large" type="primary" @click="setDifficulty('hard')">
          <span slot="default" style="font-size: 30px">
            困难
          </span>
        </el-button></el-col>
    </el-row>
    </span>
  </el-dialog>

</template>

<style scoped lang="less">
@import url(https://fonts.googleapis.com/css?family=Khula:700);
.square1 {
  width: 40px;
  height: 2px;
  background-color: rgb(253, 253, 253);
  background-image: linear-gradient(to bottom right, rgb(0, 0, 0), rgb(255, 255, 255));
  position: absolute;
  left: calc(50% - 20px); // 水平居中
  animation-name: example;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  z-index: 0;
  opacity: 0;
  filter: blur(1px);
}

@keyframes example {
  0%{
    background-color: white;
    left: -10rem;
    opacity: 0.3;
  }
  90% {
    background-color: rgb(159, 159, 159);
    left: 87vw;
    opacity: 1;
  }
  100%{
    background-color: rgb(159, 159, 159);
    left: 100vw - 5px;
    opacity: 0;
  }

}

.background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  animation-timing-function: linear;
  z-index: 0;
}
.content{
  background: rgba(40, 40, 40, 0.98);
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
.hidden {
  opacity:0;
}
.console-container {

  font-family:Khula,serif;
  font-size:4em;
  text-align:center;
  height:200px;
  width:600px;
  display:block;
  position:absolute;
  color:white;
  top:20%;
  left:0;
  right:0;
  margin:auto;
}
.console-underscore {
  display:inline-block;
  position:relative;
  top:-0.14em;
  left:10px;
}
.start-button{
  position: absolute;
  top:50%;
  left:0;
  right:0;
  margin:auto;
}
.button-group{
  margin-top: 15%;
  height: 15em;
  text-align: center;
  .el-button{
    --el-button-size: 60px;
  }

}

</style>