<script>
export default {

  /**
   * enabled: 计时器是否开启
   * time: 双向绑定，取计时器的数值
   */

  name: "sudokuTimer",
  props: ['enabled', 'time'],
  emits: ['update:time'],
  data(){
    return{
      totalSec: 0,
      intervalFlag:null,
    }
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
      this.$emit('update:time', this.totalSec);
    },
    timerEnable(){
      this.intervalFlag = setInterval(this.timerControl, 1000);
    },
  },
  watch:{
    enabled(newVal, oldVal){
      if(oldVal === false && newVal === true){
        // 初始化计时器
        this.totalSec = 0;
        // 清空原来的事件
        if(this.intervalFlag){
          clearInterval(this.intervalFlag);
        }
        // 开始新的计时
        this.timerEnable();
      }else{
        // 关闭计时器
        if(this.intervalFlag){{
          clearInterval(this.intervalFlag);
        }}
      }
    }
  }
}
</script>

<template>
  <div>{{formattedMin}} : {{formattedSec}} </div>
</template>

<style scoped>

</style>