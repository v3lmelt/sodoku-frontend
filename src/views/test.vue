<template>
  <div>
    <div class="help-button">帮助</div>
    <div class="large-square">
      <div v-html="dynamicHTML"></div>
    </div>
    <div style="margin-top: 30px;">虽然这些正方形是看起来一个一个生成的，但是看代码就知道确实也算是一个一个生成的</div>
    <div>不过生成数独是交给后端完成的，那一部分是并行生成，这里只是一个动画效果而已</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicHTML: ''
    };
  },
  mounted() {
    this.generateSudoku();
  },
  methods: {
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

      let dynamicHTML = '';

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          dynamicHTML += `<div class="fake-small-square" style="transform: scale(1.5); opacity: 0;">`;
          dynamicHTML += `<div class="real-small-square">`;

          for (let m = 0; m < 9; m++) {
            for (let n = 0; n < 9; n++) {
              let value = sudoku[m % 9][n % 9];
              dynamicHTML += `<span class="cell">${value === 0 ? '' : value}</span>`;
            }
          }

          dynamicHTML += `</div></div>`;
        }
      }

      this.dynamicHTML = dynamicHTML;

      setTimeout(() => {
        let divs = document.querySelectorAll(".fake-small-square");

        for (let k = 0; k < divs.length; k++) {
          setTimeout(() => {
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


<style>

</style>
