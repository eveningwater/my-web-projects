<template>
  <element-table :column="column" :data="tableData" />
</template>
<script setup lang="ts">
import { ElTableColumnProps } from '../components/tableProps';
/* 引入ElTableColumnProps定义column可获得类型提示 */
const column: ElTableColumnProps[] = [
  {
    type: "index",
    width: "60px",
    label: "序号",
  },
  {
    prop: "name",
    label: "名字",
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
    address: "上海市普陀区金沙江路 1516 弄",
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
