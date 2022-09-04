<template>
  <element-table border :column="column" :data="tableData" />
</template>

<script setup lang="tsx">
const handleClick = () => {
  console.log("click");
};
const column = [
  {
    prop: "date",
    fixed: true,
    width: 150,
    label: "Date",
  },
  {
    prop: "name",
    label: "Name",
    width: 120,
  },
  {
    prop: "state",
    label: "State",
    width: 120,
  },
  {
    prop: "city",
    label: "City",
    width: 120,
  },
  {
    prop: "address",
    label: "Address",
    width: 360,
  },
  {
    prop: "zip",
    label: "Zip",
    width: 180,
  },
  {
    label: "Operations",
    width: 200,
    fixed: "right",
    render() {
      return (
        <>
          <el-button type="text" size="small" onClick={handleClick}>
            Detail
          </el-button>
          <el-button type="text" size="small">
            Edit
          </el-button>
        </>
      );
    },
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
