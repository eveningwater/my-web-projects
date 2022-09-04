<template>
  <element-table :column="column" :data="tableData">
    <template #name="{ row }">
      <div>
        <ButtonNumber />
        <span>
          <code>name</code>
          插槽--{{ row.name }}
        </span>
      </div>
    </template>
    <template #default>
      <div>
        <span>
          默认插槽名字为
          <strong>default</strong>
        </span>
      </div>
    </template>
  </element-table>
</template>
<script setup lang="ts">
const column = [
  {
    type: "index",
    width: "60px",
    label: "序号",
  },
  {
    label: "具名插槽",
    slotName: "name",
  },
  {
    label: "默认插槽",
    slotName: "default",
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
