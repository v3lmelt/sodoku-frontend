<script>
import router from "@/router";
import request from '../utils/request'
import selectSudokuPage from "@/views/selectSudokuPage.vue";
export default {
  methods:{

  },
  mounted() {
    console.log(window.location.pathname)
  }
}
</script>

<template>
  <div class="head">
    <el-page-header :icon="ArrowLeft" @back="() => {this.$router.go(-1)}" >
        <template #content>
          <span class="title"> {{$route.meta.title}} </span>
        </template>
        <template #extra>
          <el-button class="help-button">帮助</el-button>
        </template>
      </el-page-header>
      <el-divider />
  </div>

  <div>
    <router-view></router-view>
  </div>

</template>

<style scoped>
.head{
  position: absolute;
  left: 10vw;
  right:10vw;
  top:1rem;
}

.help-button {
  font-size: 0.75rem;
  color: black;
  border-style: solid ;
  border-color: white;
}
</style>