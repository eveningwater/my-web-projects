var vm = new Vue({
    el: "#app",
    data() {
        return {
            timeList: [
                {
                    start: "2019-10-29 13:52:00",
                    end: "2019-10-31 16:52:00",
                    goodsName: "第一个商品",
                    result: "",
                    timer: null,
                    src: "https://www.eveningwater.com/test/random/image/1.jpg"
                },
                {
                    start: "2019-10-29 16:00:00",
                    end: "2019-10-29 18:00:00",
                    goodsName: "第二个商品",
                    result: "",
                    timer: null,
                    src: "https://www.eveningwater.com/test/random/image/2.jpg"
                },
                {
                    start: "2019-10-29 15:00:00",
                    end: "2019-10-29 16:00:00",
                    goodsName: "第三个商品",
                    result: "",
                    timer: null,
                    src: "https://www.eveningwater.com/test/random/image/3.jpg"
                },
                {
                    start: "2019-10-29 17:00:00",
                    end: "2019-10-30 16:00:00",
                    goodsName: "第四个商品",
                    result: "",
                    timer: null,
                    src: "https://www.eveningwater.com/test/random/image/4.jpg"
                },
                {
                    start: "2019-10-31 17:00:00",
                    end: "2019-11-01 16:00:00",
                    goodsName: "第五个商品",
                    result: "",
                    timer: null,
                    src: "https://www.eveningwater.com/test/random/image/5.jpg"
                }
            ]
        }
    },
    mounted() {
        this.timeList.map((t) => {
            this.countDown(t);
        })
    },
    methods: {
        formatTime(time) {
            return [
                Math.floor(time / 1000 / 60 / 60 / 24),
                Math.floor(time / 1000 / 60 / 60 % 24),
                Math.floor(time / 1000 / 60 % 60),
                Math.floor(time / 1000 % 60)
            ]
        },
        countDown(item) {
            let _start = new Date(item.start), //活动开始时间
                _end = new Date(item.end); //活动结束时间
            let _start_seconds = _start.getTime(), //活动开始时间秒数
                _end_seconds = _end.getTime(); //活动结束时间秒数
            let _time = () => {
                let current_time = new Date(); //当前时间
                let now_seconds = current_time.getTime(); //当前时间秒数
                //时间差
                let end_diff = _end_seconds - now_seconds, //结束时间差
                    start_diff = _start_seconds - now_seconds; //开始时间差
                //倒计时结果字符串
                let result = '';
                //倒计时天小时分钟秒
                let day, hour, minute, second;
                let bool = false;
                //当开始时间差大于等于0则进入距离活动开始倒计时
                if (start_diff >= 0) {
                    let time = this.formatTime(start_diff);
                    day = time[0]; //计算天数 
                    hour = time[1]; //取余数计算剩余的小时
                    minute = time[2]; //取余数计算剩余的分钟
                    second = time[3]; //取余数计算剩余的秒数
                    result = '距离活动开始:' + day + '天' + hour + '小时' + minute + '分钟' + second + '秒';
                    bool = false;
                    //当结束时间差大于等于0则进入距离活动结束倒计时
                } else if (end_diff >= 0) {
                    let time = this.formatTime(end_diff);
                    day = time[0]; //计算天数 
                    hour = time[1]; //取余数计算剩余的小时
                    minute = time[2]; //取余数计算剩余的分钟
                    second = time[3]; //取余数计算剩余的秒数
                    result = '距离活动结束:' + day + '天' + hour + '小时' + minute + '分钟' + second + '秒';
                    bool = false;
                } else {
                    //此时活动已经结束
                    day = 00; //计算天数 
                    hour = 00; //取余数计算剩余的小时
                    minute = 00; //取余数计算剩余的分钟
                    second = 00; //取余数计算剩余的秒数
                    result = '活动已经结束!';
                    bool = true;
                }
                if (!bool) {
                    item.itemer = setTimeout(_time, 1000);
                } else {
                    if (item.timer) clearTimeout(item.timer);
                }
                this.$set(item, 'result', result);
            }
            _time();
        }
    }
})