<template>
  <element-table
    :column="column"
    :data="tableData"
    border
    show-summary
    style="width: 100%"
  ></element-table>

  <element-table
    :column="column2"
    :data="tableData"
    border
    height="200"
    :summary-method="getSummaries"
    show-summary
    style="width: 100%; margin-top: 20px"
  ></element-table>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

interface Product {
  id: string;
  name: string;
  amount1: string;
  amount2: string;
  amount3: number;
}

interface SummaryMethodProps<T = Product> {
  columns: TableColumnCtx<T>[];
  data: T[];
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "Total Cost";
      return;
    }
    const values = data.map((item) => Number(item[column.property as keyof Product]));
    if (!values.every((value) => isNaN(value))) {
      sums[index] = `$ ${values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0)}`;
    } else {
      sums[index] = "N/A";
    }
  });

  return sums;
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
    label: "Cost 1 ($)",
    prop: "amount1",
  },
  {
    label: "Cost 2 ($)",
    prop: "amount2",
  },
  {
    label: "Cost 3 ($)",
    prop: "amount3",
  },
];

const tableData: Product[] = [
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
