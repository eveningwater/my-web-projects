<template>
  <element-table
    ref="singleTableRef"
    :data="tableData"
    :column="column"
    highlight-current-row
    style="width: 100%"
    @current-change="handleCurrentChange"
  ></element-table>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
    <el-button @click="setCurrent()">Clear selection</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { ElTable } from "element-plus";
const column = [
  {
    type: "index",
    width: 50,
  },
  {
    prop: "date",
    label: "Date",
    width: 120,
  },
  {
    prop: "name",
    label: "Name",
    width: 120,
  },
  {
    prop: "address",
    label: "Address",
  },
];

interface User {
  date: string;
  name: string;
  address: string;
}

const currentRow = ref();
const singleTableRef = ref<InstanceType<typeof ElTable>>();

const setCurrent = (row?: User) => {
  singleTableRef.value!.setCurrentRow(row);
};
const handleCurrentChange = (val: User | undefined) => {
  currentRow.value = val;
};
const tableData: User[] = [
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
