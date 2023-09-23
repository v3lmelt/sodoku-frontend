<script>
export default {
  data() {
    return {
      smallSquares: []
    };
  },
  mounted() {
    const sudoku = [
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

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let smallSquares = { cells: [] };
        for (let m = i * 3; m < i * 3 + 3; m++) {
          for (let n = j * 3; n < j * 3 + 3; n++) {
            let cells = {
              rowIndex: m,
              colIndex: n,
              squareIndex: i + j * 3,
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
      const { rowIndex, colIndex, squareIndex } = targetCell.dataset;
      const targetCells = document.querySelectorAll(
          `.cells[data-row-index="${rowIndex}"], .cells[data-col-index="${colIndex}"], .cells[data-square-index="${squareIndex}"]`
      );

      targetCells.forEach((cells) => {
        cells.classList.add('highlight');
      });

      targetCell.classList.add('highlight2');
    }
  }
};
</script>
<template>
  <div>
    <div class="help-button">帮助</div>
    <div class="large-square">
      <div v-for="(smallSquares, index) in smallSquares" :key="index" class="small-square">
        <span
            v-for="(cells, cellIndex) in smallSquares.cells"
            :key="cellIndex"
            class="cells"
            :data-row-index="cells.rowIndex"
            :data-col-index="cells.colIndex"
            :data-square-index="cells.squareIndex"
            :data-cell-index="cells.cellIndex"
            @click="highlightCells(cells.cellIndex)"
        >
          {{ cells.cellIndex }}
        </span>
      </div>
    </div>
  </div>
</template>
<style>
.background {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgb(193, 191, 191);
}

.help-button {
  font-size: 40px;
  color: rgb(0, 120, 120);
}
.large-square {
  width: 75vmin;
  height: 75vmin;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.small-square {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  width: calc(32%);
  height: calc(32%);
  background-image: linear-gradient(to bottom right, rgb(219, 248, 251), rgb(160, 240, 237));
  border-style: solid;
  border-color: rgb(105, 201, 169);
  border-width: 0.3vmin;
}

.cells {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(33.3% - 2px);
  height: calc(33.3% - 2px);
  background-color: rgb(255, 255, 255);
  opacity: 0.9;
  border-style: outset;
  border-width: 1px;
  border-radius: 3px;
  font-size: 1em;
}

.serial-number {
  color: rgba(17, 25, 72, 0.897);
  font-size: 100px;
  font-weight: 900;
}

.highlight {
  background-color: rgb(207, 207, 207) !important;
  border-color: #000 !important;
}

.highlight2 {
  background-color: rgb(177, 177, 177) !important;
  border-color: #000 !important;
}
</style>
