<template>
  <element-table border :column="column" :data="tableData" />
</template>

<script lang="ts" setup>
import { ElTableColumnProps } from '../components/tableProps';
const column: ElTableColumnProps[] = [
  {
    prop: "date",
    width: 120,
    label: "Date",
  },
  {
    label: "Delivery Info",
    children: [
      {
        prop: "name",
        label: "Name",
      },
      {
        label: "Address Info",
        children: [
          {
            prop: "state",
            label: "State",
          },
          {
            prop: "city",
            label: "City",
            width: 120,
          },
          {
            prop: "address",
            label: "Address",
          },
          {
            prop: "zip",
            width: 120,
            label: "Zip",
          },
        ],
      },
    ],
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
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];
</script>
