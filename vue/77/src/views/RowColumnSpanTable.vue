<template>
  <div>
    <element-table
      :column="column"
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    ></element-table>

    <element-table
      :column="column2"
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    ></element-table>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

interface User {
  id: string;
  name: string;
  amount1: string;
  amount2: string;
  amount3: number;
}

interface SpanMethodProps {
  row: User;
  column: TableColumnCtx<User>;
  rowIndex: number;
  columnIndex: number;
}

const arraySpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2];
    } else if (columnIndex === 1) {
      return [0, 0];
    }
  }
};

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      };
    }
  }
};

const column = [
  {
    label: "ID",
    width: 180,
    prop: "id",
  },
  {
    label: "Name",
    prop: "name",
  },
  {
    label: "Amount 1",
    prop: "amount1",
    sortable: true,
  },
  {
    label: "Amount 2",
    prop: "amount2",
    sortable: true,
  },
  {
    label: "Amount 3",
    prop: "amount3",
    sortable: true,
  },
];

const column2 = [
  {
    label: "ID",
    width: 180,
    prop: "id",
  },
  {
    label: "Name",
    prop: "name",
  },
  {
    label: "Amount 1",
    prop: "amount1",
    sortable: true,
  },
  {
    label: "Amount 2",
    prop: "amount2",
    sortable: true,
  },
  {
    label: "Amount 3",
    prop: "amount3",
    sortable: true,
  },
];

const tableData: User[] = [
  {
    id: "12987122",
    name: "Tom",
    amount1: "234",
    amount2: "3.2",
    amount3: 10,
  },
  {
    id: "12987123",
    name: "Tom",
    amount1: "165",
    amount2: "4.43",
    amount3: 12,
  },
  {
    id: "12987124",
    name: "Tom",
    amount1: "324",
    amount2: "1.9",
    amount3: 9,
  },
  {
    id: "12987125",
    name: "Tom",
    amount1: "621",
    amount2: "2.2",
    amount3: 17,
  },
  {
    id: "12987126",
    name: "Tom",
    amount1: "539",
    amount2: "4.1",
    amount3: 15,
  },
];
</script>
