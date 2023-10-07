<script>
import {ref} from "vue";
import {saveSudokuToLocalstorage, sudokuJSONParser} from "@/utils/sudokuUtil";

export default {
  data() {
    let timerCount = JSON.parse(localStorage.getItem("timerCount"))[this.$route.params.sudokuID]
    //sudokuVerify
    const originSudoku = JSON.parse(localStorage.getItem("sudokuVerify"))[this.$route.params.sudokuID]
    return {
      smallSquares: [],
      sudoku: ref(JSON.parse(localStorage.getItem("sudokuArray"))[this.$route.params.sudokuID]),
      originSudoku,
      sudokuId:this.$route.params.sudokuID,
      col:-1,//列
      row:-1,//行
      square:-1,//宫
      showMessage:false,
      timerEnabled:false,
      timerCount
    };
  },
  mounted() {
    this.buttonEvent()
    console.log(this.sudoku)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let smallSquares = { cells: [] };
        //小正方形
        for (let m = i * 3; m < i * 3 + 3; m++) {
          for (let n = j * 3; n < j * 3 + 3; n++) {
            let cells = {
              rowIndex: m,
              colIndex: n,
              squareIndex: i + j * 3,
              valueIndex:Number(this.sudoku[m][n]),
              cellIndex: m * 9 + n,
              value: this.sudoku[m][n] || null
            };
            smallSquares.cells.push(cells);
          }
        }
        this.smallSquares.push(smallSquares);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.buttonEvent()
    next();
  },
  methods: {
    // 自定义比较函数，根据 cellIndex 属性从大到小排序
    highlightCells(cellIndex) {
      let cells = document.querySelectorAll('.cells');
      cells.forEach((cells) => {
        cells.classList.remove('highlight');
        cells.classList.remove('highlight2');
        cells.classList.remove('error-high-light');
      });
      // 将 NodeList 转换为数组
      let cellsArray = Array.from(cells);
      // 自定义比较函数，根据 cellIndex 属性从大到小排序
      function compare(a, b) {
        const cellIndexA = parseInt(a.dataset.cellIndex);
        const cellIndexB = parseInt(b.dataset.cellIndex);
        if (cellIndexA > cellIndexB) {
          return 1;
        } else if (cellIndexA < cellIndexB) {
          return -1;
        } else {
          return 0;
        }
      }
      // 对数组进行排序
      cellsArray.sort(compare);
      const targetCell = cellsArray[cellIndex];
      const { rowIndex, colIndex, squareIndex, valueIndex } = targetCell.dataset;
      this.row = rowIndex
      this.col = colIndex
      this.square = squareIndex
      const targetCells = document.querySelectorAll(
          `.cells[data-row-index="${rowIndex}"], .cells[data-col-index="${colIndex}"], .cells[data-square-index="${squareIndex}"]`
      );
      if(valueIndex !== "0" ){
        const sameValueCells = document.querySelectorAll(
            `.cells[data-value-index="${valueIndex}"]`
        )
        sameValueCells.forEach((cells) => {
          cells.classList.add('highlight2');
        });
      }
      targetCells.forEach((cells) => {
        cells.classList.add('highlight');
        cells.row
      });
      targetCell.classList.add('highlight2');
    },
    errorHighLight(row,col,square,num){
      let cells = document.querySelectorAll('.cells');
      cells.forEach((cells) => {
        cells.classList.remove('error-high-light');
      });
      const targetCells = Array.from(document.querySelectorAll('.cells')).filter(cell => {
        //找出同行、同列、同3X3内数值相同且不是自身的格子
        const rowIndex = cell.getAttribute('data-row-index');
        const colIndex = cell.getAttribute('data-col-index');
        const squareIndex = cell.getAttribute('data-square-index');
        const valueIndex = cell.getAttribute('data-value-index');
        return (rowIndex === row || colIndex === col || squareIndex === square) && valueIndex == Number(num)
            && !(rowIndex === row && colIndex === col && squareIndex === square);
      });
      //如果非0才标红
      if(num){
        //标红找出来的格子，代表这个空填错了
        targetCells.forEach((cells) => {
          cells.classList.add('error-high-light');
        });
      }
      //如果没有找到，代表当前位置填的数符合数独规则（但不一定是正确的
      //找出当前格子并修改data-value-index作为之后的标记
      if(targetCells.length == 0 || num == 0){
        const targetCell = Array.from(document.querySelectorAll('.cells')).filter(cell => {
          const rowIndex = cell.getAttribute('data-row-index');
          const colIndex = cell.getAttribute('data-col-index');
          const squareIndex = cell.getAttribute('data-square-index');
          return rowIndex === row && colIndex === col && squareIndex === square;
        });
        targetCell.forEach((cells) => {
          cells.setAttribute('data-value-index', Number(num));
        });
      }
      //返回是否错误
      return targetCells.length > 0 ? 1 : 0;
    },
    inputNum(num){
      //原本数独中为0的位置才能填空
      if(this.row >= 0 &&this.col >= 0 && !this.originSudoku[this.row][this.col]){
        //填上数字
        this.sudoku[this.row][this.col]=num
        const flag = this.errorHighLight(this.row,this.col,this.square,num)
        if(!flag){
          saveSudokuToLocalstorage(this.sudokuId, this.sudoku)
        }else{
          this.sudoku[this.row][this.col]=0
          saveSudokuToLocalstorage(this.sudokuId, this.sudoku)
        }
      }
      //每次填入数字后检测是否填完了
      if(this.checkSudoku()){
        console.log("done")
        this.showMessage = true;
      }
    },
    checkSudoku() {
      // 检查每一行
      for (let i = 0; i < 9; i++) {
        const row = this.sudoku[i];
        if (!this.checkArray(row)) {
          return false;
        }
      }
      // 检查每一列
      for (let i = 0; i < 9; i++) {
        const col = [];
        for (let j = 0; j < 9; j++) {
          col.push(this.sudoku[j][i]);
        }
        if (!this.checkArray(col)) {
          return false;
        }
      }
      // 检查每个宫内
      for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
          const square = [];
          for (let m = i; m < i + 3; m++) {
            for (let n = j; n < j + 3; n++) {
              square.push(this.sudoku[m][n]);
            }
          }
          if (!this.checkArray(square)) {
            return false;
          }
        }
      }
      return true;
    },
    checkArray(arr) {
      const tempArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
          // 数组中存在 0，直接返回 false
          return false;
        }
        if (tempArr[arr[i]]) {
          // 数组中存在重复数字
          return false;
        }
        tempArr[arr[i]] = true;
      }
      return true;
    },
    buttonEvent(){
      console.log(this.timerCount)
      this.timerEnabled = !this.timerEnabled;
    }
  }
}
</script>
<template>
  <div>
    <div class="sudoku-square">
      <div v-for="(smallSquares, index) in smallSquares" :key="index" class="small-square">
        <span
            v-for="(cells, cellIndex) in smallSquares.cells"
            :key="cellIndex"
            class="cells"
            :data-row-index="cells.rowIndex"
            :data-col-index="cells.colIndex"
            :data-square-index="cells.squareIndex"
            :data-cell-index="cells.cellIndex"
            :data-value-index="cells.valueIndex"
            @click="highlightCells(cells.cellIndex)"
            :class="{'player-num': this.originSudoku[cells.rowIndex][cells.colIndex] === 0}"
        >
          <template v-if="this.sudoku[cells.rowIndex][cells.colIndex]">
            {{ this.sudoku[cells.rowIndex][cells.colIndex] }}
          </template>

        </span>
      </div>
    </div>
    <div class="select-button">
      <el-button type="info" @click="inputNum(1)">1</el-button>
      <el-button type="info" @click="inputNum(2)">2</el-button>
      <el-button type="info" @click="inputNum(3)">3</el-button>
      <el-button type="info" @click="inputNum(4)">4</el-button>
      <el-button type="info" @click="inputNum(5)">5</el-button>
      <el-button type="info" @click="inputNum(6)">6</el-button>
      <el-button type="info" @click="inputNum(7)">7</el-button>
      <el-button type="info" @click="inputNum(8)">8</el-button>
      <el-button type="info" @click="inputNum(9)">9</el-button>
      <el-button type="info" @click="inputNum(0)">删除</el-button>
    </div>
    <div class="timer">
      <div>目前花费时间：</div>
      <sudoku-timer :enabled="timerEnabled" :time="timerCount" :sudokuId="this.$route.params.sudokuID"></sudoku-timer>
    </div>
    <el-dialog
          v-model="showMessage"
          width="30%"
          class="message-box"
          center
          align-center
      >
        <span class="message">恭喜你，成功完成本数独</span>
      </el-dialog>
  </div>

</template>
<style scoped>
.timer{
  display: flex;
  position: absolute;
  top: 12%;
  left: 40vw;
  width: 20vw;
  font-size: 2vw;
  color:white;
}

.sudoku-square {
  position: fixed;
  left: 0;
  right:0;
  top:5%;
  width: 75vmin;
  height: 75vmin;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-style: solid;
  border-width: 0.05rem;
  background-color: #e0e0e0;
}

.small-square {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 33.333%;
  height: 33.333%;
  background-color: #fdfdfd;
  border-style: solid;
  border-color: rgb(52, 71, 96);
  border-width: 0.01rem;
  font-size: 5rem;
}

.cells {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.333%;
  height: 33.333%;
  background-color: rgb(129, 129, 129);
  opacity: 0.9;
  border-style: outset;
  border-color: rgb(52, 71, 96);
  border-width: 1px;
  font-size: 1rem;
}
.player-num{
  border-color: rgb(52, 71, 96);
  color: #009de1;
}

.serial-number {
  color: rgba(17, 25, 72, 0.897);
  font-size: 100px;
  font-weight: 900;
}

.highlight {
  background-color: rgb(169, 169, 169) !important;
  border-color: #000 !important;
}

.highlight2 {
  background-color: rgb(209, 209, 209) !important;
  border-color: #000 !important;
}
.error-high-light{
  background-color: #f5cdd4 !important;
  border-color: #000 !important;
}
.select-button{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  left: 0;
  right:0;
}
.message-box{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .el-dialog__header {
    display: none;
  }
}
.message{
  font-size: 0.5rem;
}
</style>
