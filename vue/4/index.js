var vue = new Vue({
    el: '#content',
    data: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        oldNum: 0,
        newNum: 0
    },
    created: function created() { },
    mounted: function mounted() { },
    methods: {
        // 记录初始信息
        dragstart: function (value) {
            this.oldNum = value;
        },
        // 做最终操作
        dragend: function (value) {
            if (this.oldNum != this.newNum) {
                let oldIndex = this.items.indexOf(this.oldNum);
                let newIndex = this.items.indexOf(this.newNum);
                let newItems = [...this.items];
                // 删除老的节点
                newItems.splice(oldIndex, 1);
                // 在列表中目标位置增加新的节点
                newItems.splice(newIndex, 0, this.oldNum);
                // this.items一改变，transition-group就起了作用
                this.items = [...newItems];
            }
        },
        // 记录移动过程中信息
        dragenter: function (value) {
            this.newNum = value;
        }
    }
});