<template>
    <element-table :data="tableData" :column="columnList" :total="tableTotal" :pageSize="pageParam.pageSize"
        :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
        :pageSizeList="[4, 8, 12, 16]" isFilterData indexShow selectionShow @on-selection="onSelection"
        @on-sort-change="onSortHandler"></element-table>
</template>
<script>
import { createUUID } from "@/utils/util"
export default {
    name: "TableViewThird",
    data() {
        return {
            tableData: [],
            columnList: [
                {
                    prop: "index",
                    label: "序号",
                    render: (h, params) => {
                        return h("span", null, (params.index) + 1)
                    },

                },
                {
                    prop: "id",
                    label: "id",

                },
                {
                    prop: "name",
                    label: "姓名",

                },
                {
                    prop: "title",
                    label: "标题",

                },
                {
                    prop: "content",
                    label: "内容",

                },
                {
                    prop: "date",
                    label: "日期",

                },
                {
                    prop: "label",
                    label: "分类",

                },
                {
                    prop: "remark",
                    label: "备注",

                },
                {
                    prop: "status",
                    label: "状态",
                    render: (h, params) => {
                        let text = "";
                        switch (params.row.status) {
                            case 1:
                                text = '待发布';
                                break;
                            case 2:
                                text = "已发布";
                                break;
                            case 3:
                                text = "待审核";
                                break;
                            case 4:
                                text = "审核中";
                                break;
                            case 5:
                                text = "已审核";
                                break;
                            default:
                                text = "未确定";
                                break;
                        }
                        return h('span', null, text)
                    },
                    sortable:true
                },
                {
                    prop: "address",
                    label: "地址",
                    render: (h, params) => {
                        return h('span', params.row.address)
                    },

                }
            ],
            tableTotal: 0,
            pageParam: {
                pageSize: 4,
                currentPage: 1
            }
        }
    },
    created() {
        this.loadTableData()
    },
    methods: {
        loadTableData(prop = "status", order) {
            this.$request({ url: "/src/assets/data.json", method: "get" }).then(res => {
                const { currentPage, pageSize } = this.pageParam;
                const data = res.map(item => ({ ...item, id: createUUID() }))
                this.tableTotal = res.length;
                this.tableData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                if (prop && order) {
                    this.tableData = [...this.tableData.sort((a, b) => {
                        if (order !== 'descending') {
                            return a[prop] - b[prop];
                        } else {
                            return b[prop] - a[prop];
                        }
                    })]
                }
            })
        },
        onSizeChange(pageSize) {
            this.$set(this.pageParam, 'pageSize', pageSize)
            this.loadTableData();
        },
        onCurrentChange(page) {
            this.$set(this.pageParam, 'currentPage', page);
            this.loadTableData();
        },
        onSelection(keys) {
            console.log("选中的项", keys)
        },
        onSortHandler(options) {
            // console.log(options)
            const { column, prop, order } = options;
            console.log(prop)
            // console.log(column,prop,order)
            this.loadTableData(prop, order)
        }
    }
}
</script>
<style lang="less">
</style>