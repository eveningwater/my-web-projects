
<template>
  <div>
    <desc>
      如果使用render函数， 该列指定了prop属性的话，render的第一个参数是该列对应数据项，第二个参数才是scope配置项
    </desc>
    <element-table :column="column" :data="tableData" />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { ElTableColumnProps } from '../components/tableProps';
const column: ElTableColumnProps[] = [
  {
    type: "index",
    width: "60px",
    label: "序号",
  },
  {
    label: "名字",
    prop: "name",
    render: (data, scope) => {
      const { row, column } = scope;
      const propKey = column.property;
      return h('div', null, { default: () => `render 结果 -- ${row[propKey]}== ${data}` })
    },
  },
  {
    prop: "date",
    label: "日期",
  },
  {
    prop: "address",
    label: "地址",
  },
];
const tableData = [
  {
    date: "2016-05-02",
    name: "佘太君",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王小帅",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "王小呆",
    address: "上海市普陀区金沙江路 1516 弄",
  },
];
</script>

<style lang="scss" scoped>
</style>
