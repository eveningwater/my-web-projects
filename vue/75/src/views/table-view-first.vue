<template>
    <element-table 
        :data="tableData" 
        :column="columnList" 
        :total="tableTotal" 
        :pageSize="pageParam.pageSize"
        :currentPage="pageParam.currentPage" 
        @on-size-change="onSizeChange" 
        @on-current-change="onCurrentChange" 
        :pageSizeList="[5,10,15,20]"
        isFilterData
    ></element-table>
</template>
<script>
import { createUUID } from "@/utils/util"
export default {
    name: "TableViewFirst",
    data() {
        return {
            tableData: [],
            columnList: [
                {
                    prop: "id",
                    label: "id",
                    width:300
                },
                {
                    prop: "name",
                    label: "姓名",
                    width:100
                },
                {
                    prop: "title",
                    label: "标题",
                    width:200
                },
                {
                    prop: "content",
                    label: "内容",
                    width:600
                },
                {
                    prop: "date",
                    label: "日期",
                    width:100
                },
                {
                    prop: "label",
                    label: "分类",
                    width:100
                },
                {
                    prop: "remark",
                    label: "备注",
                    width:100
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
                    width:300
                },
                {
                    prop: "address",
                    label: "地址",
                    render: (h, params) => {
                        return h('span', params.row.address)
                    },
                    width:350,
                    fixed:"right"
                }
            ],
            tableTotal: 0,
            pageParam: {
                pageSize: 5,
                currentPage: 1
            }
        }
    },
    created() {
        this.loadTableData()
    },
    methods: {
        loadTableData() {
            this.$request({ url: "/src/assets/data.json", method: "get" }).then(res => {
                const { currentPage, pageSize } = this.pageParam;
                const data = res.map(item => ({ ...item,id: createUUID()}))
                this.tableTotal = res.length;
                this.tableData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            })
        },
        onSizeChange(pageSize) {
            this.$set(this.pageParam, 'pageSize', pageSize)
            this.loadTableData();
        },
        onCurrentChange(page){
            this.$set(this.pageParam, 'currentPage', page);
            this.loadTableData();
        }
    }
}
</script>
<style lang="less">
</style>