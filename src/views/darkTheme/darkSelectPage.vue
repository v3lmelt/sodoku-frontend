
<script>
import { ref } from 'vue'
import {getSudokuUtil} from "@/utils/sudokuUtil";
export default {
  data() {
    return {
      refreshButtonDisable: false,
      loading: true,
      dynamicHTML: '',
      selectedDifficulty: '',
      selectedAPI: '',
      showAnswer: false,
    };
  },
  mounted() {
    // 先获取难度
    let diff = localStorage.getItem("difficulty")
    // 用户不主动点击刷新数独的情况下，数独只从后台获取一次
    if (!localStorage.getItem("sudokuArray")) {
      // 从后端获取数独
      getSudokuUtil().then(
          (res) => {
            // 拿到的数据保存在localStorage中
            localStorage.setItem("sudokuArray", JSON.stringify(res.sudoku));
            localStorage.setItem("sudokuAnswer", JSON.stringify(res.answer));
            localStorage.setItem("sudokuVerify", JSON.stringify(res.sudoku));
            this.generateSudoku();
            this.animation();
          }
      )
    } else {
      this.generateSudoku();
      this.refreshAnimation();
    }

    // 用户选择的难度应当在难度选项卡上反应出来
    this.selectedDifficulty = localStorage.getItem("difficulty") || "easy";

    // 用户选择生成的API应当在API选项卡上反应出来
    this.selectedAPI = localStorage.getItem("APISetting") || "FAST";

    window.jumpPage = (ID) => {
      this.$router.push({name: 'darkSudokuPage', params: {'sudokuID': ID}});
    }
  },
  methods: {
    //生成数独界面
    generateSudoku() {
      let sudokuArrays = JSON.parse(localStorage.getItem("sudokuArray"))
      //循环动态生成html代码
      let dynamicHTML = '';
      //两个for循环生成九个小正方形作为九宫
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          //fake-small-square是背景
          dynamicHTML += `<div class="fake-small-square" style="transform: scale(1.5); opacity: 0;">`;
          //real-small-square是真正的宫
          let sudokuID = i * 3 + j;
          dynamicHTML += `<div class="real-small-square" onclick="jumpPage(${sudokuID})" >`;
          //每个宫内有两个for循环生成81个小方格作为数独预览
          for (let m = 0; m < 9; m++) {
            for (let n = 0; n < 9; n++) {

              // 根据 i 和 j 的值选择相应的数独预览数据数组，并获取数据
              let value = sudokuArrays[i * 3 + j][m % 9][n % 9];
              // 如果值为 0 则代表该空格挖空了
              dynamicHTML += `<span class="cell">${value === 0 ? '' : value}</span>`;
            }
          }
          dynamicHTML += `</div></div>`;
        }
      }
      this.dynamicHTML = dynamicHTML;
    },

    /**
     * 数独动画
     */

    animation() {
      //生成九个数独图形的动画，每个数独先后生成，从1.5倍到原大小，透明度由0到1
      setTimeout(() => {
        let divs = document.querySelectorAll(".fake-small-square");

        for (let k = 0; k < divs.length; k++) {
          setTimeout(() => {
            //设置初始样式
            divs[k].style.transform = "scale(1.5)";
            divs[k].style.opacity = 0.0;
            divs[k].style.pointerEvents = 'none';
            setTimeout(() => {
              //最终样式
              divs[k].style.transition = "all .5s ease-out";
              divs[k].style.transform = "scale(1)";
              divs[k].style.opacity = 1;
            }, 100);
            setTimeout(() => {
              divs[k].style.pointerEvents = 'auto';
            }, 150 * (9 - k));
          }, 100 * k);
        }
      }, 1);
    },

    /**
     * 已存在数独用户再点击刷新时则不再播放动画
     */

    refreshAnimation() {
      //从本地拿数据生成，不再播放动画
      setTimeout(() => {
        let divs = document.querySelectorAll(".fake-small-square");
        for (let k = 0; k < divs.length; k++) {
          //最终样式
          divs[k].style.transform = "scale(1)";
          divs[k].style.opacity = 1;
          divs[k].style.pointerEvents = 'auto';
        }
      }, 1);
    },

    /**
     * 刷新生成的数独
     */

    refreshSudoku() {
      // 禁用用户再点击刷新按钮，防止频繁向服务器发送请求
      this.refreshButtonDisable = true;
      // 修改加载界面
      this.loading = true;
      // 修改localStorage中的难度设置
      localStorage.setItem("difficulty", this.selectedDifficulty);
      // 修改localStorage里的API设置
      localStorage.setItem("APISetting", this.selectedAPI);
      getSudokuUtil().then(
          (res) => {
            // 拿到的数据保存在localStorage中
            localStorage.setItem("sudokuAnswer", JSON.stringify(res.answer));
            localStorage.setItem("sudokuArray", JSON.stringify(res.sudoku));
            localStorage.setItem("sudokuVerify", JSON.stringify(res.sudoku));
            this.generateSudoku();
            this.animation();
            this.loading = false;
            this.refreshButtonDisable = false;
          }
      )
      //刷新后计时器归0
      const timerCount = new Array(9).fill(0);
      localStorage.setItem('timerCount', JSON.stringify(timerCount));
    },
    displayAnswer() {
      // 如果showAnswer = false, 则显示答案
      if (!this.showAnswer) {
        // 显示答案，必须是存在数独数组和数独答案的情况下
        if (localStorage.getItem("sudokuArray") && localStorage.getItem("sudokuAnswer")) {
          // 缓冲区
          let arr = localStorage.getItem("sudokuArray");
          let ans = localStorage.getItem("sudokuAnswer");
          localStorage.setItem("buffer", arr);
          localStorage.setItem("sudokuArray", ans);
          // 禁用按钮，防止用户在显示答案的时候刷新数独
          this.refreshButtonDisable = true;
          this.showAnswer = true;
          // 如果showAnswer = true, 则禁用答案
          this.generateSudoku();
          this.animation();
        }
      }else{
        if (localStorage.getItem("buffer")){
          // 将原来数组还原即可
          let buf = localStorage.getItem("buffer");
          localStorage.setItem("sudokuArray", buf);
          localStorage.removeItem("buffer");
          this.refreshButtonDisable = false;
          this.showAnswer = false;
          this.generateSudoku();
          this.animation();
        }
      }
    }
  }
}

</script>
<template>
  <div>
  <!-- 界面顶部栏：返回、标题、帮助按钮 -->
  <div class="selectSudokuPage">

  <!-- <el-page-header :icon="ArrowLeft">
      <template #content>
        <span class="title"> 选择数独 </span>
      </template>
      <template #extra>
          <el-button class="help-button">帮助</el-button>
          <el-button class="help-button" @click="refreshSudoku()">刷新</el-button>
      </template>
    </el-page-header>
    <el-divider /> -->
      <!-- 生成数独预览 -->
    <div class="select-sudoku-page-content">
      <div class="refresh">
        <!-- 刷新按钮 -->
        <el-button class="refresh-button" @click="refreshSudoku" :disabled="refreshButtonDisable">刷新</el-button>
        <el-button class="refresh-button" @click="displayAnswer">求解</el-button>
        <!-- 单选框 -->
        <el-radio-group class="dark-button" fill="gray" text-color="black" v-model="selectedDifficulty" size="default">
          <el-radio-button label="easy">简单</el-radio-button>
          <el-radio-button label="normal">中等</el-radio-button>
          <el-radio-button label="hard">困难</el-radio-button>
        </el-radio-group>

        <!-- 生成数独使用的API选择 -->
        <el-radio-group fill="gray" v-model="selectedAPI" size="default" style="margin-right: 1rem">
          <el-radio-button label="SLOW">SLOW</el-radio-button>
          <el-radio-button label="FAST">FAST</el-radio-button>
        </el-radio-group>

      </div>
      <div class="large-square" v-loading="loading" style="pointer-events: none" v-html="dynamicHTML"></div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(56, 56, 56);
  animation-timing-function: linear;
  z-index: -1;
}
.selectSudokuPage{
  position: fixed;
  left: 0;
  right:0;
  top:5%;
  margin-top: 8vh;
}
.select-sudoku-page-content{
  height: 1000px;
}
.refresh{
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  padding-top: 0.9rem;
  padding-bottom: 0.5rem;
  .refresh-button{
    margin-left: 1rem;
  }
}
.title {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 3vmin;
}
.dark-button{
  /deep/.el-radio-button__inner:hover {
    color: black
  }
}
.large-square {
  width: 75vmin;
  height: 75vmin;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-style: solid;
  border-color: #181818;
  border-width: 1px;
  opacity: 0.7;
}

.fake-small-square {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(33.33%);
  height: calc(33.33%);
  border-style: solid;
  border-width: 1px;
  background-color: #e0e9f1;
}

.real-small-square {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 90%;
  height: 90%;
  background-color: white;
  box-shadow: 3px 3px 3px 3px #888888;
  transition: transform 0.2s ease-in-out;
  opacity: 0.7;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.11%;
  height: 11.11%;
  font-size: 0.5rem;
  background-color: white;
  border-style: outset;
  border-width: 1px;
  border-color: #bec5d3;
}

.serial-number {
  color: rgba(17, 25, 72, 0.897);
  font-size: 50px;
  font-weight: 900;
}

.real-small-square:hover {
  transform: scale(1.05);
  z-index: 1;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
