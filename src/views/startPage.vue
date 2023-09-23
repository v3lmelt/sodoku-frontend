<script>
import {ref} from 'vue'
export default {
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
     * 变量
     */
    const isDialogVisible = ref(false);
    return {consoleText,isDialogVisible}
  },
  mounted() {
    this.consoleText(['Multithread Sudoku', '多线程数独'], 'text',['tomato','rebeccapurple','lightblue'])
  }

}
</script>

<template>
  <!-- 终端文本特效与开始按钮 -->

  <div class="content"></div>
  <div class='console-container'><span id='text'></span><div class='console-underscore' id='console'>&#95;</div></div>
  <el-button class="start-button" size="large" @click="isDialogVisible = true">开始</el-button>

  <!-- 对话框 -->

  <el-dialog
      v-model="isDialogVisible"
      title="请选择难度"
      width="50%"
      style="opacity: 0.9"
  >
    <span slot="footer" >
      <el-row justify="space-around">
        <el-col :span="8" class="button-group"><el-button size="large" type="primary">
          <span slot="default" style="font-size: 30px">
            简单
          </span>
          </el-button></el-col>
        <el-col :span="8" class="button-group"><el-button size="large" type="primary">
          <span slot="default" style="font-size: 30px">
            中等
          </span>
        </el-button></el-col>
        <el-col :span="8" class="button-group"><el-button size="large" type="primary">
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