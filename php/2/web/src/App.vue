<template>
  <div id="app">
    <HTMLExam/>
  </div>
</template>

<script>
import HTMLExam from './view/exam.vue'

export default {
  name: 'app',
  components: {
    HTMLExam
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif,'Avenir', Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  font-style: normal;
}
</style>
