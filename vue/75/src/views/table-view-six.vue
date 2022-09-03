<template>
    <element-table 
        :data="tableData" 
        :column="columnList" 
        :total="tableTotal" 
        :pageSize="pageParam.pageSize"
        :currentPage="pageParam.currentPage" 
        @on-size-change="onSizeChange" 
        @on-current-change="onCurrentChange" 
        :pageSizeList="[4,8,12,16]"
        isFilterData
        row-key="_id"
    ></element-table>
</template>
<script>
export default {
    name: "TableViewSix",
    data() {
        return {
            tableData: [],
            columnList: [
                {
                    prop: "_id",
                    label: "id"
                },
                {
                    prop: "menuName",
                    label: "姓名",
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
                    }
                },
                {
                    prop: "address",
                    label: "地址",
                    render: (h, params) => {
                        return h('span', params.row.address)
                    }
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
        loadTableData() {
            this.$request({ url: "/src/assets/data1.json", method: "get" }).then(res => {
                const { currentPage, pageSize } = this.pageParam;
                this.tableTotal = res.length;
                this.tableData = res.slice((currentPage - 1) * pageSize, currentPage * pageSize)
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