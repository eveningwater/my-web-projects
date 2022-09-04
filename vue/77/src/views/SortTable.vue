<template>
  <element-table
    :data="tableData"
    :column="column"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  ></element-table>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

interface User {
  date: string;
  name: string;
  address: string;
}
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address;
};

const column = [
  {
    prop: "date",
    label: "Date",
    width: 120,
    sortable: true,
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
];

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
