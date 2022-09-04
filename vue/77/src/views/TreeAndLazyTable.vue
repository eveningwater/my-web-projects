<template>
  <div>
    <element-table
      :column="column"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    ></element-table>

    <element-table
      :column="column2"
      :data="tableData1"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
    </element-table>
  </div>
</template>
<script lang="ts" setup>
interface User {
  id: number;
  date: string;
  name: string;
  hasChildren?: boolean;
  children?: User[];
}

const load = (row: User, treeNode: unknown, resolve: (date: User[]) => void) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: "2016-05-01",
        name: "wangxiaohu",
      },
      {
        id: 32,
        date: "2016-05-01",
        name: "wangxiaohu",
      },
    ]);
  }, 1000);
};
const column = [
  {
    label: "Date",
    prop: "date",
    sortable: true,
    width: 180,
  },
  {
    label: "Name",
    prop: "name",
    sortable: true,
    width: 180,
  },
];
const column2 = [
  {
    label: "Date",
    prop: "date",
    width: 180,
  },
  {
    label: "Name",
    prop: "name",
    width: 180,
  },
];
const tableData: User[] = [
  {
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu",
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "wangxiaohu",
  },
  {
    id: 3,
    date: "2016-05-01",
    name: "wangxiaohu",
    children: [
      {
        id: 31,
        date: "2016-05-01",
        name: "wangxiaohu",
      },
      {
        id: 32,
        date: "2016-05-01",
        name: "wangxiaohu",
      },
    ],
  },
  {
    id: 4,
    date: "2016-05-03",
    name: "wangxiaohu",
  },
];

const tableData1: User[] = [
  {
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu",
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "wangxiaohu",
  },
  {
    id: 3,
    date: "2016-05-01",
    name: "wangxiaohu",
    hasChildren: true,
  },
  {
    id: 4,
    date: "2016-05-03",
    name: "wangxiaohu",
  },
];
</script>
