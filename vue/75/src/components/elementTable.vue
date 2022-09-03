<template>
    <div class="el-table-container">
        <el-table :data="data" ref="elementTable" v-loading="loading" :border="border" :fit="fit"
            @selection-change="onSelectionChangeHandle" @sort-change="onSortHandler"
            @filter-change="onFilterHandler" :default-sort="defaultSort" :expand-row-keys="expandRowKeys" :row-key="getRowKey"
            :tree-props="treeProps"
        >
            <slot name="prefixColumn"></slot>
            <el-table-column type="expand" v-if="expandShow">
                <template slot-scope="slotProps">
                    <slot name="expand" :row="slotProps.row"></slot>
                </template>
            </el-table-column>
            <el-table-column v-if="selectionShow" :selectable="checkSelectable" type="selection" width="50"
                align="center" :reserve-selection="reserveSelection" />
            <el-table-column v-if="indexShow" type="index" :index="typeIndex" label="序号" width="50" align="center"
                :sortable="indexSortable" />
            <el-table-column v-for="(col, index) in column" :key="col + index" :label="col.label" :fixed="col.fixed"
                :show-overflow-tooltip="typeof col.tooltip === 'boolean' ? col.tooltip : true"
                :class-name="col.className" :align="col.align || 'center'" :width="col.width" :min-width="col.minWidth"
                :sortable="col.sortable" :column-key="col.columnKey" :type="col.type">
                <template slot-scope="scope">
                    <table-column-slot v-if="col.render" :render="col.render" :row="scope.row" :column="col"
                        :index="scope.$index">
                    </table-column-slot>
                    <template v-else>
                        <slot name="column-content">
                            <slot v-if="col.type == 'slot'" :name="col.prop" :row="scope.row" />
                            <template v-else-if="col.type == 'button'">
                                <template v-for="(o, i) in col.actions">
                                    <el-button v-if="o.isHide || true" :key="o[actionKey] + i" :type="o.type || 'text'"
                                        :size="o.size" @click="o.onClick(scope.row)"
                                        @mousedown="o.mousedown(scope.row, $event)">
                                        {{ o[actionKey] }}
                                    </el-button>
                                </template>
                            </template>
                            <router-link v-else-if="col.type == 'router'"
                                :to="{ path: col.path, query: col.query(scope.row) }">
                                <span :class="typeof col.itemClassName == 'function'
                                ? col.itemClassName(scope.row) : col.itemClassName"
                                    v-html="handleFilterData(scope.row[col.prop])" />
                            </router-link>
                            <el-input
                                v-else-if="typeof col.type == 'function' ? col.type(scope.row) == 'input' : col.type == 'input'"
                                v-model="scope.row[col.prop]"
                                @keyup.enter.native="col.change && col.change(scope.row)" />
                            <el-switch v-else-if="col.type == 'switch'" v-model="scope.row[col.prop]"
                                :active-color="col.activeColor || '#13ce66'"
                                :inactive-color="col.inactiveColor || '#ff4949'" :active-value="1" :inactive-value="0"
                                @change="col.handelChange(scope.row, $event)" />
                            <span v-else
                                :class="typeof col.itemClassName == 'function' ? col.itemClassName(scope.row) : col.itemClassName"
                                v-html="handleFilterData(scope.row[col.prop])" />
                        </slot>
                    </template>
                </template>
            </el-table-column>
            <slot name="suffixColumn"></slot>
        </el-table>
        <slot></slot>
        <div class="el-pagination-container" :class="{ [pagePosition]: true }">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="getCurrentPage" :page-sizes="pageSizeList" :page-size="getCurrentPageSize"
                :layout="pageLayout" :total="getTotal" v-if="hasPage">
            </el-pagination>
        </div>
    </div>
</template>
<script>
const TableColumnSlot = {
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, vm) => {
        const params = {
            row: vm.props.row,
            index: vm.props.index
        };
        if (vm.props.column) params.column = vm.props.column;
        return vm.props.render(h, params);
    }
}
export default {
    name: "ElementTable",
    inheritAttrs: false,
    components: { TableColumnSlot },
    props: {
        column: {
            type: Array,
            default: () => ([])
        },
        data: {
            type: Array,
            default: () => ([])
        },
        border: {
            type: Boolean,
            default: true
        },
        hasPage: {
            type: Boolean,
            default: true
        },
        pageLayout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        pageSizeList: {
            type: Array,
            default: () => ([10, 20, 30, 40])
        },
        total: {
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pagePosition: {
            type: String,
            default: "center",
            validator: (value) => {
                return ["left", "center", "right"].includes(value)
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        fit: {
            type: Boolean,
            default: true
        },
        isFilterData: {
            type: Boolean,
            default: false
        },
        filterText: {
            type: String,
            default: '-'
        },
        actionKey: {
            type: String,
            default: "name"
        },
        indexShow: {
            type: Boolean,
            default: false
        },
        indexSortable: {
            type: Boolean,
            default: false
        },
        selectionShow: {
            type: Boolean,
            default: false
        },
        reserveSelection: {
            type: Boolean,
            default: true
        },
        selectable: Function,
        tooltipEffect: {
            type: String,
            validator: (v) => {
                return ["dark", "light"].includes(v)
            },
            default: "dark"
        },
        defaultSort: {
            type: Object
        },
        expandShow:{
            type:Boolean,
            default:false
        },
        rowKey:{
            type:String | Function,
            default:''
        },
        expandRowKeys:Array,
        treeProps: {
            type:Object,
            default:() => ({children: 'children', hasChildren: 'hasChildren'})
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        getTotal() {
            return this.total;
        },
        getCurrentPage() {
            return this.currentPage;
        },
        getCurrentPageSize() {
            return this.pageSize;
        },
        handleFilterData() {
            return (v) => {
                return this.isFilterData ? this.filterData(v) : v
            }
        }
    },
    methods: {
        typeIndex(index) {
            return (this.currentPage - 1) * this.pageSize + index + 1
        },
        handleSizeChange(pageSize) {
            this.$emit('on-size-change', pageSize);
        },
        handleCurrentChange(page) {
            this.$emit('on-current-change', page);
        },
        filterData(v) {
            return v || this.filterText;
        },
        clearSelection() {
            this.$refs.elementTable.clearSelection()
        },
        onSelectionChangeHandle(val) {
            this.$emit('on-selection', val)
        },
        checkSelectable() {
            if (typeof this.selectable === "function") {
                return this.selectable;
            } else {
                return true
            }
        },
        onSortHandler(sort) {
            this.$emit("on-sort-change", sort)
        },
        onFilterHandler(filters) {
            this.$emit("on-filter", filters)
        },
        getRowKey(row){
            return typeof this.rowKey === 'function' ? row[this.rowKey()] : typeof this.rowKey === 'string' && this.rowKey ? row[this.rowKey] : row.id;
        }
    }
}
</script>
<style lang="less" scoped>
.el-table-container {
    .el-pagination-container {
        margin-top: 20px;

        &.left {
            text-align: left;
        }

        &.center {
            text-align: center;
        }

        &.right {
            text-align: right;
        }
    }
    /deep/ .el-table .el-table__expanded-cell.el-table__cell {
        padding: 12px;
    }
}
</style>