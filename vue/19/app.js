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
    },
    computed:{
        getSelectFormLabel(){
            const { single,more } = this.selectForm;
            const singleLabelItem = data.find(i => i.value === single);
            const moreLabelItem = data.reduce((res,item) => {
                if(more.indexOf(item.value) > -1){
                    res.push(item.label);
                }
                return res;
            },[]);
            return {
                single:singleLabelItem && singleLabelItem['label'],
                more:moreLabelItem.join(",")
            }
        }
    }
});
app.$mount("#app");