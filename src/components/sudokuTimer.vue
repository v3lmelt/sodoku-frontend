<script>
export default {

  /**
   * enabled: 计时器是否开启
   * time: 双向绑定，取计时器的数值
   * key: 当前数组编号，不同数组计时器不同
   */

  name: "sudokuTimer",
  props: ['enabled', 'time','sudokuId' ],
  emits: ['update:time'],
  data(){
    return{
      totalSec: 0,
      intervalFlag:null,
    }
  },
  mounted() {
    const timerArr = JSON.parse(localStorage.getItem("timerCount"));
    this.totalSec = timerArr[this.sudokuId];
  },
  computed:{
    formattedSec(){
      return this.totalSec % 60;
    },
    formattedMin(){
      return Math.floor(this.totalSec / 60);
    }
  },
  methods:{
    timerControl(){
      this.totalSec += 1;
    },
    timerEnable(){
      this.intervalFlag = setInterval(this.timerControl, 1000);
    },
  },
  watch:{
    enabled(newVal, oldVal){
      if(oldVal === false && newVal === true){
        // 清空原来的事件
        if(this.intervalFlag){
          clearInterval(this.intervalFlag);
        }
        // 开始新的计时
        this.timerEnable();
      }else{
        // 关闭计时器
        if (this.intervalFlag) {
          clearInterval(this.intervalFlag);
        }
        // 保存计时器的值到 localStorage
        const timerArr = JSON.parse(localStorage.getItem("timerCount"));
        timerArr[this.sudokuId] = this.totalSec;
        localStorage.setItem("timerCount", JSON.stringify(timerArr));
      }
    }
  }
}
</script>

<template>
  <div>{{formattedMin}} : {{formattedSec.toString().padStart(2, '0')}}</div>
</template>

<style scoped>

</style>