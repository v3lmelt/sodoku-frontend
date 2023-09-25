<script>
export default {
  data() {
    return {
      smallSquares: []
    };
  },
  mounted() {
    const sudoku = JSON.parse(localStorage.getItem("sudokuArray"))[this.$route.params.sudokuID]

    console.log(sudoku)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let smallSquares = { cells: [] };
        for (let m = i * 3; m < i * 3 + 3; m++) {
          for (let n = j * 3; n < j * 3 + 3; n++) {
            let cells = {
              rowIndex: m,
              colIndex: n,
              squareIndex: i + j * 3,
              valueIndex:sudoku[m][n],
              cellIndex: m * 9 + n,
              value: sudoku[m][n] || null
            };
            smallSquares.cells.push(cells);
          }
        }
        this.smallSquares.push(smallSquares);
      }
    }
  },
  methods: {
    // 自定义比较函数，根据 cellIndex 属性从大到小排序
    highlightCells(cellIndex) {
      let cells = document.querySelectorAll('.cells');
      cells.forEach((cells) => {
        cells.classList.remove('highlight');
        cells.classList.remove('highlight2');
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
      const targetCells = document.querySelectorAll(
          `.cells[data-row-index="${rowIndex}"], .cells[data-col-index="${colIndex}"], .cells[data-square-index="${squareIndex}"]`
      );
      if(valueIndex != "0" ){
        const sameValueCells = document.querySelectorAll(
            `.cells[data-value-index="${valueIndex}"]`
        )
        sameValueCells.forEach((cells) => {
          cells.classList.add('highlight2');
        });
      }

      targetCells.forEach((cells) => {
        cells.classList.add('highlight');
      });


      targetCell.classList.add('highlight2');
    }
  }
}
</script>
<template>
  <div>
    <!-- 界面顶部栏：返回、标题、帮助按钮 -->
    <!-- <div class="top-bar">
      <el-page-header :icon="ArrowLeft" @back="() => {this.$router.push({name: 'selectSudokuPage'})}" >
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
    </div> -->

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
        >
          {{ cells.value }}
        </span>
      </div>
    </div>
  </div>
</template>
<style>

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
  width: 33.3%;
  height: 33.3%;
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
  width: 33.3%;
  height: 33.3%;
  background-color: rgb(255, 255, 255);
  opacity: 0.9;
  border-style: outset;
  border-width: 1px;
  border-radius: 3px;
  font-size: 1rem;
}

.serial-number {
  color: rgba(17, 25, 72, 0.897);
  font-size: 100px;
  font-weight: 900;
}

.highlight {
  background-color: rgb(224, 233, 241) !important;
  border-color: #000 !important;
}

.highlight2 {
  background-color: rgb(186, 220, 249) !important;
  border-color: #000 !important;
}
</style>
