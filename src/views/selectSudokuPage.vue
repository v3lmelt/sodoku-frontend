
<script>
import {request} from "axios";

export default {
  data() {
    return {
      dynamicHTML: ''
    };
  },
  mounted() {
    this.generateSudoku();

    // 从后端获取数独
    request.get('/sudoku').then(
        (res) => {
          console.log(res.data)
        }
    )
  },
  methods: {
    //生成数独界面
    generateSudoku() {
      let sudoku = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ];
      //循环动态生成html代码
      let dynamicHTML = '';
      //两个for循环生成九个小正方形作为九宫
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          //fake-small-square是背景
          dynamicHTML += `<div class="fake-small-square" style="transform: scale(1.5); opacity: 0;">`;
          //real-small-square是真正的宫
          dynamicHTML += `<div class="real-small-square">`;
          //每个宫内有两个for循环生成81个小方格作为数独预览
          for (let m = 0; m < 9; m++) {
            for (let n = 0; n < 9; n++) {
              let value = sudoku[m % 9][n % 9];
              //如果值为0则代表该空格挖空了
              dynamicHTML += `<span class="cell">${value === 0 ? '' : value}</span>`;
            }
          }
          dynamicHTML += `</div></div>`;
        }
      }
      this.dynamicHTML = dynamicHTML;
      //生成九个数独图形的动画，每个数独先后生成，从1.5倍到原大小，透明度由0到1
      setTimeout(() => {
        let divs = document.querySelectorAll(".fake-small-square");

        for (let k = 0; k < divs.length; k++) {
          setTimeout(() => {
            //设置初始样式
            divs[k].style.transform = "scale(1.5)";
            divs[k].style.opacity = 0.0;

            setTimeout(() => {
              divs[k].style.transition = "all .5s ease-out";
              divs[k].style.transform = "scale(1)";
              divs[k].style.opacity = 1;

            }, 100);
          }, 100 * k);
        }
      }, 100);
    }
  }
};
</script>
<template>
  <div class="selectSudokuPage">
    <el-page-header :icon="ArrowLeft">
      <template #content>
        <span class="title"> 选择数独 </span>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button class="help-button">帮助</el-button>
        </div>
      </template>
    </el-page-header>
    <el-divider />

      <div class="large-square" v-html="dynamicHTML"></div>
  </div>

</template>



<style>
.selectSudokuPage{
  position: fixed;
  left: 0;
  right:0;
  top:5%;
  padding-left:5em;
  padding-right:5em;
}

.help-button {
  font-size: 3.5vmin;
  color: black;
  border-style: solid ;
  border-color: white;
}
el-page-header{

}


.title {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 3vmin;
}

.large-square {
  width: 80vmin;
  height: 80vmin;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-style: solid;
  border-color: #181818;
  border-width: 1px;
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
  font-size: 1em;
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
</style>
