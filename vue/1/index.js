Vue.component('base-select', {
    template: "#template",
    props: {
        isSearch: {
            type: Boolean,
            default: false
        }, //是否开启搜索
        list: {
            type: Array,
            default: () => {
                return [{
                    text: "html"
                },
                {
                    text: "css"
                },
                {
                    text: "JavaScript"
                }
                ]
            }
        }, //下拉列表数据
        keyName: {
            type: String,
            default: "text"
        }, //下拉列表显示所绑定的字段名
    },
    data() {
        return {
            showSelectPanel: false,
            selectIcon: "down",
            selectValue: "",
            selectData: [],
            inputFlag: false
        }
    },
    created() {
        this.selectData = this.list;
    },
    methods: {
        // 失去焦点是关闭下拉列表
        searchBlur() {
            this.$nextTick(() => {
                if (this.showSelectPanel) {
                    // 这个处理总还是不好的
                    setTimeout(() => {
                        this.showSelectPanel = false;
                    }, 200);
                }
            })
        },
        //显示下拉列表
        showSelect() {
            this.showSelectPanel = !this.showSelectPanel;
        },
        // 点击选择
        selectItem(item) {
            this.selectValue = item[this.keyName];
            this.showSelectPanel = false;
            this.$emit('change', item);
        },
        // 输入搜索
        searchSelect(value) {
            if (this.inputFlag) return;
            this.searchSuccess(value);
        },
        // 搜索成功
        searchSuccess(value) {
            this.selectData = this.list.reduce((c, v) => {
                if (v[this.keyName].indexOf(value) > -1) {
                    c.push(v);
                }
                return c;
            }, []);
            this.showSelectPanel = this.selectData.length;
        }
    },
    watch: {
        // 监听下拉列表面板是否显示从而改变下拉箭头的方向
        'showSelectPanel': {
            handler(val) {
                this.selectIcon = val ? 'up' : 'down';
            },
            deep: true
        },
        'selectValue': {
            handler(val) {
                this.searchSelect(val);
            },
            deep: true
        }
    }
})
var vm = new Vue({
    el: "#demo",
    data() {
        return {
            selectList: [{
                id: 1,
                value: "海贼王"
            },
            {
                id: 2,
                value: "火影忍者"
            },
            {
                id: 3,
                value: "名侦探柯南"
            },
            {
                id: 4,
                value: "犬夜叉"
            }
            ]
        }
    },
    methods: {
        selectContent(value) {
            console.log('选中了', value);
        }
    }
})