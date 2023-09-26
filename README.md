# Sudoku - Frontend
本前端基于Vue 3制作。

## 构建并运行
在Clone操作之后，打开项目文件夹，执行以下指令。
```
npm install
npm run dev
```
这个时候应该就能打开Vue的开发服务器，并且将在`5928`端口上打开，请注意不要占用此端口。
此项目不能单独运行，请配合后端一同食用。

## 主要的文件说明
```
/src
|-/views
navBar.vue // 前端的导航栏功能
selectSudokuPage.vue // 从9个数独中选择的界面
startPage.vue // 开始界面
sudokuPage.vue // 单个数独显示的界面
|-/utils
flexible.js // rem适配的两个js文件
rem.js
request.js // Axios封装
sudokuUtil.js // 统一的数独请求接口
```
