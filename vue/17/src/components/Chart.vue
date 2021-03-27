<template>
  <div class="chart">
    <div
      ref="chartRef"
      :style="{ display: showChart }"
      class="chartInstance"
    ></div>
    <no-data :noDataUrl="noDataImage" v-if="noData">
      该图表暂时无数据!
    </no-data>
  </div>
</template>
<script>
export default {
    name:"Chart"
}
</script>
<script setup>
import noDataImage from "../assets/no_data.jpg";
import {
  computed,
  defineProps,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
const isNotEmptyObject = (obj) =>
  typeof obj == "object" && obj && Object.keys(obj).length;
const props = defineProps({
  chartOption: {
    type: Object,
    default: () => {},
  },
  noData: {
    type: Boolean,
    default: true,
  },
});
const currentInstance = getCurrentInstance();
const createChart =
  currentInstance.appContext.config.globalProperties.$createChart;
const chartRef = ref(null);
const chartInstance = ref(null);
const showChart = computed(() => (!props.noData ? "block" : "none"));
onMounted(() => {
  if (showChart === "block") {
    initChart(chartRef.value);
  }
});
watch(showChart, (val) => {
  if (val === "block") {
    renderChart(props.chartOption);
  }
});
watch(
  () => props.chartOption,
  (val) => {
    renderChart(val);
  }
);
const renderChart = (option) => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  nextTick(() => {
    initChart(chartRef.value);
    setChartOption(option);
  });
};
const initChart = (element) => {
  chartInstance.value = createChart.init(element);
};
const setChartOption = (option) => {
  if (chartInstance.value && isNotEmptyObject(option)) {
    chartInstance.value.setOption(option);
  }
};
</script>
<style scoped>
.chart,
.chart > .chartInstance {
  width: 100%;
}
.chart > .chartInstance {
  height: 250px;
}
</style>