<script>
import { ref } from 'vue'
import {RouterView} from "vue-router";
import {ArrowLeft} from "@element-plus/icons-vue";


export default {
  computed: {
    ArrowLeft() {
      return ArrowLeft
    }
  },
  components: {RouterView},
  data(){
    const drawer = ref(false)
    return{drawer}
  },
  methods:{

  },
  mounted() {
    console.log(window.location.pathname)
  }
}
</script>

<template>
  <div>
  <div class="background"></div>
  <div class="head">
    <el-page-header :icon="ArrowLeft" @back="() => {this.$router.go(-1)}" >
        <template #content>
          <span class="title"> {{$route.meta.title}} </span>
        </template>
        <template #extra>
          <el-button class="help-button" @click="drawer = true">帮助</el-button>
        </template>
      </el-page-header>
      <el-divider />
  </div>
  <el-drawer v-model="drawer" :show-close="false" style="background-color: gray ">
    <template #header>
      数独帮助
    </template>
    <h2>基本规则</h2>
    <el-divider></el-divider>
    <li>数独网格由 9x9 个空格组成。</li>
    <li>您只能使用数字 1 到 9。</li>
    <li>每个 3×3 宫只能包含数字 1 到 9。</li>
    <li>每一列只能包含数字 1 到 9。</li>
    <li>每一行只能包含数字 1 到 9。</li>
    <li>每个 3×3 宫、每一列或每一行中的每个数字只能使用一次。</li>
    <li>当所有数独网格都填入正确的数字时，游戏结束。</li>
    <h2 style="margin-top: 1rem">难度设置</h2>
    <el-divider></el-divider>
    <li>简单：你的谜题里将会有25个空格。</li>
    <li>中等：你的谜题里将会有40个空格。</li>
    <li>困难：你的谜题里将会有64个空格。</li>
  </el-drawer>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
          <component :is="Component" />
      </transition>
    </router-view>
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
.head{
  position: absolute;
  left: 10vw;
  right:10vw;
  top:1rem;
  color:white;
  
}
.title{
  color: white;
}
.help-button {
  font-size: 0.75rem;
  color: rgb(46, 46, 46);
  border-style: solid ;
  border-color: white;
  opacity: 0.4;
}

li{
  font-size: 0.6rem;
  margin-left: 0.5rem;
}

h2{
  font-size: 0.75rem;
  margin-left: 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>