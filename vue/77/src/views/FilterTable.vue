<template>
  <el-button @click="resetDateFilter">reset date filter</el-button>
  <el-button @click="clearFilter">reset all filters</el-button>
  <element-table
    :column="column"
    ref="tableRef"
    row-key="date"
    :data="tableData"
    style="width: 100%"
  >
    <template #default="scope">
      <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>
        {{ scope.row.tag }}
      </el-tag>
    </template>
  </element-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import type { ElTable } from "element-plus";

interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}

const tableRef = ref<InstanceType<typeof ElTable>>();

const resetDateFilter = () => {
  tableRef.value!.clearFilter(["date"]);
};
// TODO: improvement typing when refactor table
const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value!.clearFilter();
};
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address;
};
const filterTag = (value: string, row: User) => {
  return row.tag === value;
};
const filterHandler = (value: string, row: User, column: TableColumnCtx<User>) => {
  const property = column["property"] as keyof User;
  return row[property] === value;
};

const column = [
  {
    type: "index",
    width: 50,
  },
  {
    prop: "date",
    label: "Date",
    sortable: true,
    width: 180,
    "column-key": "date",
    filters: [
      { text: "2016-05-01", value: "2016-05-01" },
      { text: "2016-05-02", value: "2016-05-02" },
      { text: "2016-05-03", value: "2016-05-03" },
      { text: "2016-05-04", value: "2016-05-04" },
    ],
    "filter-method": filterHandler,
  },
  {
    prop: "name",
    label: "Name",
    width: 120,
  },
  {
    prop: "address",
    label: "Address",
    formatter,
  },
  {
    prop: "tag",
    label: "Tag",
    filters: [
      { text: "Home", value: "Home" },
      { text: "Office", value: "Office" },
    ],
    "filter-method": filterTag,
    "filter-placement": "bottom-end",
    slotName: "default",
  },
];

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
];
</script>
