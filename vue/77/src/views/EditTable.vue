<template>
  <el-button @click="toggleColumnSort">互换姓名与标签的顺序</el-button>
  <element-table :column="column" :data="tableData" />
</template>
<script setup lang="tsx">
import { ref } from 'vue';
import { ElTableColumnProps } from '../components/tableProps';
const handleEdit = (scope: { row: { _pre_data: string; _edit: boolean; }; }) => {
  scope.row._pre_data = JSON.stringify(scope.row);
  scope.row._edit = true;
};
const handleSave = (scope: { row: { _edit: boolean; }; }) => {
  scope.row._edit = false;
};
const handleCancle = (scope: { row: { _pre_data: string; }; }) => {
  Object.assign(scope.row, {
    ...JSON.parse(scope.row._pre_data),
    _edit: false,
    _pre_data: null,
  });
};

const tagOptions = [
  {
    label: '家',
    value: '家',
  },
  {
    label: '公司',
    value: '公司',
  },
];
const column = ref<ElTableColumnProps[]>([
  {
    prop: 'date',
    label: '日期',
    render: (value, scope) =>
      scope.row._edit ?
        <el-date-picker
          model-value={value}
          width={160}
          type='date'
          onUpdate:modelValue={(val: { toLocaleDateString: () => any; }) => {
            scope.row[scope.column.property] = val?.toLocaleDateString();
          }}
          placeholder='Pick a day'
        />
        : value,
  },
  {
    prop: 'name',
    label: '姓名',
    render: (value, scope) =>
      scope.row._edit ? <el-input
        model-value={value}
        onUpdate:modelValue={(val: any) => {
          scope.row[scope.column.property] = val;
        }}
      /> : value,
  },
  {
    prop: 'tag',
    label: '标签',
    render: (value, scope) =>
      scope.row._edit ?
        <el-select
          model-value={value}
          style='width: 120px'
          onUpdate:modelValue={(val: any) => {
            scope.row[scope.column.property] = val;
          }}
        >
          {tagOptions.map((option) => (
            <el-option label={option.label} value={option.value}></el-option>
          ))}
        </el-select>
        : <el-tag type={scope.row.tag === '家' ? 'info' : 'success'}>
          {value}
        </el-tag>,
  },
  {
    label: '操作',
    render: (scope) =>
      scope.row._edit ?
        <div>
          <el-button
            type='primary'
            onClick={() => {
              handleSave(scope);
            }}
          >保存</el-button>
          <el-button
            onClick={() => {
              handleCancle(scope);
            }}
          > 取消</el-button>
        </div> :
        <el-button
          type='primary'
          onClick={function () {
            handleEdit(scope);
          }}
        > 编辑</el-button>
  },
]);

const tableData = ref([
  {
    date: '2016/5/1',
    name: '王小虎1',
    tag: '家',
  },
  {
    date: '2016/5/2',
    name: '王小虎2',
    tag: '公司',
  },
  {
    date: '2016/5/3',
    name: '王小虎3',
    tag: '公司',
  },
]);

const toggleColumnSort = () => {
  column.value = [...column.value.slice(0, 1), column.value[2], column.value[1], ...column.value.slice(3)];
};
</script>
