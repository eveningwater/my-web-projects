const data = [
    {
        value: '0',
        label: '黄七',
        status:false
    },
    {
        value: '1',
        label: '张三',
        status:false
    },
    {
        value: '2',
        label: '李四',
        status:false
    },
    {
        value: '3',
        label: '王五',
        status:false
    }
];
Vue.component('ElBoxSelect',ElBoxSelect);
const app = new Vue({
    data(){
        return {
            selectSingleData:data.map(i => {
                i.status = '';
                return i;
            }),
            singleProps:{
                label:"label",
                value:"value",
                status:"status"
            },
            selectMoreData:data,
            selectForm:{
                single:"",
                more:[]
            }
        }
    }
});
app.$mount("#app");