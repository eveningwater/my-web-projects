<template>
  <div class="el-table-container">
    <el-table :data="data" ref="elementTable" v-loading="loading" :border="border" :fit="fit"
      @selection-change="onSelectionChangeHandle" @sort-change="onSortHandler" @filter-change="onFilterHandler"
      :default-sort="defaultSort" :expand-row-keys="expandRowKeys" :row-key="getRowKey" :tree-props="treeProps">
      <slot name="prefixColumn"></slot>
      <el-table-column type="expand" v-if="expandShow">
        <template v-slot="slotProps">
          <slot name="expand" :row="slotProps.row"></slot>
        </template>
      </el-table-column>
      <el-table-column v-if="selectionShow" :selectable="checkSelectable" type="selection" width="50" align="center"
        :reserve-selection="reserveSelection" />
      <el-table-column v-if="indexShow" type="index" :index="typeIndex" label="序号" width="50" align="center"
        :sortable="indexSortable" />
      <el-table-column v-for="(col, index) in column" :key="col + index" :label="col.label" :fixed="col.fixed"
        :show-overflow-tooltip="
          typeof col.tooltip === 'boolean' ? col.tooltip : true
        " :class-name="col.className" :align="col.align || 'center'" :width="col.width" :min-width="col.minWidth"
        :sortable="col.sortable" :column-key="col.columnKey" :type="col.type">
        <template v-slot="scope">
          <table-column-slot v-if="col.render" :render="col.render" :row="scope.row" :column="col"
            :index="scope.$index">
          </table-column-slot>
          <template v-else>
            <slot name="column-content">
              <slot v-if="col.type == 'slot'" :name="col.prop" :row="scope.row" />
              <template v-else-if="col.type == 'button'">
                <template v-for="(o, i) in col.actions" :key="o.type">
                  <el-button v-if="o.isHide || true" :type="o.type || 'text'" :size="o.size"
                    @click="o.onClick(scope.row)" @mousedown="() => o.mousedown && o.mousedown(scope.row, $event)">
                    {{ o[actionKey] }}
                  </el-button>
                </template>
              </template>
              <router-link v-else-if="col.type == 'router'" :to="{ path: col.path, query: col.query(scope.row) }">
                <span :class="
                  typeof col.itemClassName == 'function'
                    ? col.itemClassName(scope.row)
                    : col.itemClassName
                " v-html="handleFilterData(scope.row[col.prop])" />
              </router-link>
              <el-input v-else-if="
                typeof col.type == 'function'
                  ? col.type(scope.row) == 'input'
                  : col.type == 'input'
              " v-model:value="scope.row[col.prop]" @keyup.enter="col.change && col.change(scope.row)" />
              <el-switch v-else-if="col.type == 'switch'" v-model:value="scope.row[col.prop]"
                :active-color="col.activeColor || '#13ce66'" :inactive-color="col.inactiveColor || '#ff4949'"
                :active-value="1" :inactive-value="0" @change="col.handelChange(scope.row, $event)" />
              <span v-else :class="
                typeof col.itemClassName == 'function'
                  ? col.itemClassName(scope.row)
                  : col.itemClassName
              " v-html="handleFilterData(scope.row[col.prop])" />
            </slot>
          </template>
        </template>
      </el-table-column>
      <slot name="suffixColumn"></slot>
    </el-table>
    <slot></slot>
    <div class="el-pagination-container" :class="{ [pagePosition]: true }">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="getCurrentPage" :page-sizes="pageSizeList" :page-size="getCurrentPageSize" :layout="pageLayout"
        :total="getTotal" v-if="hasPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from "vue";
import TableColumnSlot from "./table-column-slot";
export default defineComponent({
  components:{TableColumnSlot},
  props: {
    column: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    border: {
      type: Boolean,
      default: true,
    },
    hasPage: {
      type: Boolean,
      default: true,
    },
    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    pageSizeList: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pagePosition: {
      type: String,
      default: 'center',
      validator: (value) => {
        return ['left', 'center', 'right'].includes(value)
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fit: {
      type: Boolean,
      default: true,
    },
    isFilterData: {
      type: Boolean,
      default: false,
    },
    filterText: {
      type: String,
      default: '-',
    },
    actionKey: {
      type: String,
      default: 'name',
    },
    indexShow: {
      type: Boolean,
      default: false,
    },
    indexSortable: {
      type: Boolean,
      default: false,
    },
    selectionShow: {
      type: Boolean,
      default: false,
    },
    reserveSelection: {
      type: Boolean,
      default: true,
    },
    selectable: Function,
    tooltipEffect: {
      type: String,
      validator: (v) => {
        return ['dark', 'light'].includes(v)
      },
      default: 'dark',
    },
    defaultSort: {
      type: Object,
    },
    expandShow: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type:[String,Function],
      default: '',
    },
    expandRowKeys: Array,
    treeProps: {
      type: Object,
      default: () => ({ children: 'children', hasChildren: 'hasChildren' }),
    },
  },
  emits: [
    'on-size-change',
    'on-current-change',
    'on-selection',
    'on-sort-change',
    'on-filter',
  ],
  setup(props, { emit }) {
    const getTotal = computed(() => props.total)
    const getCurrentPage = computed(() => props.currentPage)
    const getCurrentPageSize = computed(() => props.pageSize)
    const handleFilterData = v => props.isFilterData ? (v || props.filterText) : v
    const elementTable = ref(null)
    const typeIndex = index => (props.currentPage - 1) * props.pageSize + index + 1
    const handleSizeChange = (pageSize) => {
      emit('on-size-change', pageSize)
    }
    const handleCurrentChange = (page) => {
      emit('on-current-change', page)
    }
    const clearSelection = () => {
      elementTable.clearSelection()
    }
    const onSelectionChangeHandle = (val) => {
      emit('on-selection', val)
    }
    const checkSelectable = () => {
      if (typeof props.selectable === 'function') {
        return props.selectable
      } else {
        return true
      }
    }
    const onSortHandler = (sort) => {
      emit('on-sort-change', sort)
    }
    const onFilterHandler = (filters) => {
      emit('on-filter', filters)
    }
    const getRowKey = (row) => {
      return typeof props.rowKey === 'function'
        ? row[props.rowKey()]
        : typeof props.rowKey === 'string' && props.rowKey
          ? row[props.rowKey]
          : row.id
    }
    return {
      getTotal,
      getCurrentPage,
      getCurrentPageSize,
      typeIndex,
      handleSizeChange,
      handleCurrentChange,
      clearSelection,
      onSelectionChangeHandle,
      checkSelectable,
      onSortHandler,
      onFilterHandler,
      getRowKey,
      handleFilterData
    }
  }
})
</script>
<style lang="scss" scoped>
.el-table-container {
  .el-pagination-container {
    margin-top: 20px;
    display: flex;

    &.left {
      justify-content: left;
    }

    &.center {
      justify-content: center;
    }

    &.right {
      justify-content: right;
    }
  }
  :deep(.el-table .el-table__expanded-cell.el-table__cell) {
    padding: 12px;
  }
}
</style>