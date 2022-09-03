<template>
    <el-row>
        <el-col :span="24" class="mb-10">
            <element-table :data="tableData" :column="columnFirst" :total="tableTotal" :pageSize="pageParam.pageSize"
            :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
            :pageSizeList="[5, 10, 15, 20]" :hasPage="false" isFilterData filterText="no value"></element-table>
        </el-col>
        <el-col :span="24">
            <element-table :data="tableData" :column="columnSecond" :total="tableTotal" :pageSize="pageParam.pageSize"
            :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
            :pageSizeList="[5, 10, 15, 20]" isFilterData actionKey="label" :hasPage="false"></element-table>
        </el-col>
    </el-row>
</template>
<script>
import { createUUID } from "@/utils/util"
export default {
    name: "TableViewSecond",
    data() {
        return {
            tableData: [],
            columnList: [
                {
                    prop: "id",
                    label: "id",
                    tooltip:false
                },
                {
                    prop: "name",
                    label: "姓名"
                },
                {
                    prop: "title",
                    label: "标题"
                },
                {
                    prop: "content",
                    label: "内容"
                },
                {
                    prop: "date",
                    label: "日期"
                },
                {
                    prop: "label",
                    label: "分类"
                },
                {
                    prop: "remark",
                    label: "备注"
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
                },
                {
                    prop: "address",
                    label: "地址",
                    render: (h, params) => {
                        return h('span', params.row.address)
                    },
                },

            ],
            tableTotal: 0,
            pageParam: {
                pageSize: 5,
                currentPage: 1
            }
        }
    },
    computed: {
        columnFirst() {
            return this.columnList.slice().concat({
                prop: "action",
                label: "操作",
                render: (h, params) => {
                    return h("div", null, [
                        h('el-button', { props: { type: "primary",size:"mini" },on:{ click:(e) => console.log(params.row,e)} }, "编辑"),
                        h('el-button', { props: { type: "danger",size:"mini" },on:{ click:(e) => console.log(params.row,e)} }, "删除"),
                    ])
                }
            })
        },
        columnSecond(){
            return this.columnList.slice().concat({
                prop: "action",
                label: "操作",
                type:"button",
                actions:[
                    { type:"primary",onClick:(row) => { console.log('clicked',row)},label:"编辑",size:"mini"},
                    { type:"danger",onClick:(row) => { console.log('clicked',row)},label:"删除",size:"mini"},
                ]
            })
        }
    },
    created() {
        this.loadTableData()
    },
    methods: {
        loadTableData() {
            this.$request({ url: "/src/assets/data.json", method: "get" }).then(res => {
                const { currentPage, pageSize } = this.pageParam;
                const data = res.map(item => ({ ...item, id: createUUID() }))
                this.tableTotal = res.length;
                this.tableData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            })
        },
        onSizeChange(pageSize) {
            this.$set(this.pageParam, 'pageSize', pageSize)
            this.loadTableData();
        },
        onCurrentChange(page) {
            this.$set(this.pageParam, 'currentPage', page);
            this.loadTableData();
        }
    }
}
</script>
<style lang="less">
</style>