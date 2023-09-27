# Sudoku - Frontend
本前端基于Vue 3制作。
## 说明
由于我们在编码过程中使用了Code With Me功能来实现结对编程，而此功能是共享文档制的，因此没有两个人独立的Commit。
## 运行
在Clone操作之后，打开项目文件夹，执行以下指令。
```
npm install
npm run dev
```
这个时候应该就能打开Vue的开发服务器，并且将在`5928`端口上打开，请注意不要占用此端口。
此项目不能单独运行，请配合后端一同食用。

## 主要的文件说明
```
src
├─ App.vue
├─ assets
│    ├─ base.css
│    ├─ logo.svg
│    └─ main.css
├─ main.js
├─ router
│    └─ index.js
├─ stores
│    └─ dataStore.js
├─ utils
│    ├─ flexible.js // Rem适配
│    ├─ rem.js
│    ├─ request.js
│    └─ sudokuUtil.js // Axios 请求数独数据封装
└─ views
       ├─ navBar.vue // 导航栏
       ├─ selectSudokuPage.vue // 选择大数独界面
       ├─ startPage.vue // 开始界面
       ├─ sudokuPage.vue // 小数独界面 
```
