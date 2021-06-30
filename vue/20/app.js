Vue.component('ElContentDate',ELContentDate);
const app = new Vue({
    data(){
        return {
            currentMonthText:[
                {
                    day:1,
                    dayMessage:"已满"
                },
                {
                    day:2,
                    dayMessage:"剩余1间"
                },
                {
                    day:3,
                    dayMessage:"剩余2间"
                },
                {
                    day:4,
                    dayMessage:"剩余2间"
                },
                {
                    day:5,
                    dayMessage:"剩余2间"
                },
                {
                    day:6,
                    dayMessage:"已满"
                },
                {
                    day:7,
                    dayMessage:"剩余2间"
                }
            ],
            value:new Date(),
            num:0,
            max:10
        }
    },
    methods:{
        addNum(){
            if(this.num <= this.max){
                this.num++;
                // this.$refs.contentDate.createVue();
            }
        }
    }
});
app.$mount("#app");