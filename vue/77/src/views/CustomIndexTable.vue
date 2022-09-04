<template>
  <element-table :column="column" :data="tableData" style="width: 100%"></element-table>
</template>

<script lang="ts" setup>
const indexMethod = (index: number) => {
  return index * 2;
};
const column = [
  {
    type: "index",
    index: indexMethod,
  },
  {
    prop: "date",
    label: "Date",
    width: 180,
  },
  {
    prop: "name",
    label: "Name",
    width: 180,
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
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];
</script>
