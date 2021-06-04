const tableData = [
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }
];
Vue.component('ElMakeTable',ElTable);
const app = new Vue({
    data(){
        return {
            tableData:tableData,
            columnList:[
                {
                    prop:"name",
                    label:"姓名"
                },
                {
                    prop:"date",
                    label:"日期"
                },
                {
                    prop:"address",
                    label:"地址",
                    render:(h,params) => {
                        return h('span',params.row.address + '-'+params.row.date)
                    }
                }
            ]
        }
    }
});
app.$mount("#app");