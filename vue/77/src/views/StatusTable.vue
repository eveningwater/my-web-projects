<template>
  <element-table :column="column" :data="data" :row-class-name="tableRowClassName"></element-table>
</template>

<script lang="ts" setup>
const data = [
  {
    date: "2016-05-02",
    name: "王小虎1",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-02",
    name: "王小虎2",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-02",
    name: "王小虎3",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-02",
    name: "王小虎4",
    address: "上海市普陀区金沙江路 1518 弄",
  },
]
const column = [
  {
    prop: "date",
    label: "日期",
  },
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "address",
    label: "地址",
  },
]
function tableRowClassName({ rowIndex }: { rowIndex: number }) {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 3) {
    return "success-row";
  }
  return "";
}
</script>

<style>
.el-table .warning-row {
  background: oldlace !important;
}

.el-table .success-row {
  background: #f0f9eb !important;
}
</style>
