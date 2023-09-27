<script>
import {ref} from 'vue'
import router from "@/router";
export default {
  data() {
    return {
      numbers: []
    };
  },
  methods: {
    //生成随机数，模拟背景元素的散乱分布
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    createNumber() {
      for (let i = 0; i < 45; i++) {
        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = Math.floor(Math.random() * 9) + 1;
        number.style.position = "absolute"
        number.style.top = this.randomNum(5, 80) + "vh"
        number.style.left = this.randomNum(5, 85) + "vw"
        number.style.animationDuration = this.randomNum(18, 100) + "s";
        number.style.fontSize = this.randomNum(10, 60) + "px";
        document.querySelector('.number').appendChild(number);

        setInterval(function () {
          const currentNumber = parseInt(number.textContent);
          const newNumber = currentNumber % 9 + 1;
          number.textContent = newNumber;
        }, this.randomNum(300, 1000));
      }
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
    this.createNumber();
  }

}
</script>

<template>
  <div>
  <!-- 终端文本特效与开始按钮 -->
      <div class="background"></div>
      <div class="number" style="top: 0;left: 0;"></div>
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
  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Khula:700);
.number-container {

}
.number {
  display: block;
  width: 50px;
  font-size: 22px;
  color: black;
  animation-name: float;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  opacity: 0.5;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  10% {
    transform: translateX(25px);
  }

  20% {
    transform: translateY(25px);
  }

  30% {
    transform: translateX(-26px);
  }

  40% {
    transform: translateY(-23px);
  }

  50% {
    transform: translateX(22px);
  }

  60% {
    transform: translateY(27px);
  }

  70% {
    transform: translateX(-20px);
  }

  80% {
    transform: translateY(-24px);
  }

  90% {
    transform: translateX(-26px);
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
  background-color: white;
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
  left: 0;
  right: 0;
  width: 100px;
  top:50%;
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