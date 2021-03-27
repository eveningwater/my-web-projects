<template>
  <Chart :chartOption="chartOption" :noData="noData" />
  <div class="flex-center">
    <button type="button" @click="onLoadChart">加载数据</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
const chartOption = ref(null);
const noData = ref(true);
const requestData = {
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  legend: {
    data: ["销量"],
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};
const onLoadChart = () => {
  noData.value = !requestData.xAxis.data.length;
  chartOption.value = { ...requestData };
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
body,
html,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}
.flex-center > button {
  outline: none;
  display: inline-block;
  padding: 12px 16px;
  background-color: #2396ef;
  border: 1px solid #2396ef;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;
}
.flex-center > button:nth-of-type(2n) {
  margin-left: 15px;
}
.flex-center > button:hover,
.flex-center > button:active {
  background-color: #5fb0ee;
}
</style>