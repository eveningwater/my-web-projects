<template>
  <el-radio-group v-model="tableLayout">
    <el-radio-button label="fixed"></el-radio-button>
    <el-radio-button label="auto"></el-radio-button>
  </el-radio-group>
  <element-table
    :column="column"
    :data="tableData"
    :table-layout="tableLayout"
  ></element-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tableLayout = ref<"fixed" | "auto">("fixed");

const column = [
  {
    prop: "date",
    label: "Date",
  },
  {
    prop: "name",
    label: "Name",
  },
  {
    prop: "address",
    label: "Address",
  },
];

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
