new Vue({
    el: "#app",
    data() {
        return {
            dataList: [
                {
                    label: "测试1",
                    value: "1"
                },
                {
                    label: "测试2",
                    value: "2"
                },
                {
                    label: "测试3",
                    value: "3"
                },
                {
                    label: "测试4",
                    value: "4"
                }
            ],
            selectData: []
        }
    },
    methods: {
        onChange(data) {
            console.log('选择的数据', data);
        }
    }
})