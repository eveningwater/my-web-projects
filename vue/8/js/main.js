var vm = new Vue({
    el: '#container',
    data() {
        return {
            rightItems: [],
            leftList: [],
            seachlist: [],
            scrollHeight: 0,
            defaultData: true,
            person: {
                name: "",
                position: ""
            },
            search_name: ''
        }
    },
    mounted: function () {
        this.getRightMenu();
    },
    methods: {
        // 加载右侧菜单
        getRightMenu: function () {
            var _self = this;
            this.request('./testdata.json', null, 'GET').then(function (data) {
                _self.rightItems = data.data.leftvalue;
                _self.leftList = data.data.data;
            });
        },
        toDetailData: function (it) {
            this.leftList.forEach((item, index) => {
                // 匹配字母从而计算高度值
                if (item.title === it.name) {
                    let totalHeight = 0;
                    if (index === 0) {
                        totalHeight = 0;
                    } else {
                        for (let i = 0; i < index; i++) {
                            totalHeight += this.$refs.listitem[i].clientHeight;
                        }
                    }
                    this.scrollHeight = totalHeight;
                }
            });
        },
        addPhonePerson: function () {
            this.defaultData = false;
        },
        cancelAdd: function () {
            this.defaultData = true;
        },
        loadPerson: function (item, idx) {
            this.seachlist = [];
            this.search_name = item.name;
        },
        suresearch: function () {
            if (this.search_name) {
                this.leftList.forEach((item, index) => {
                    item.content.forEach((inner, idx) => {
                        if (inner.value === this.search_name) {
                            let totalHeight = 0;
                            if (index === 0) {
                                totalHeight = 0;
                            } else {
                                for (let i = 0; i < index; i++) {
                                    totalHeight += this.$refs.listitem[i].clientHeight;
                                }
                            }
                            this.scrollHeight = totalHeight;
                        }
                    })
                })
            }
        },
        searchName: function (e) {
            this.search_name = e.target.value;
            let value = e.target.value, match = '';
            if (/[a-z|A-Z]/g.test(value.slice(0, 1))) {
                match = value.slice(0, 1);
            } else {
                match = getPinYin(value.slice(0, 1));
            }
            this.leftList.forEach((data, index) => {
                if (data.title === match.toUpperCase()) {
                    this.seachlist = [];
                    data.content.forEach((inner, idx) => {
                        this.seachlist.push({
                            name: inner.value
                        })
                    })
                }
            })
        },
        inputName: function (e) {
            this.person.name = e.target.value;
        },
        inputPosition: function (e) {
            this.person.position = e.target.value;
        },
        sureAdd: function () {
            if (!this.person.name) {
                alert('请输入姓名!');
            } else if (!this.person.position) {
                alert('请输入职位!');
            } else {
                let firstName = this.person.name.slice(0, 1);
                console.log(this.leftList);
                if (/[a-z|A-Z]/g.test(firstName)) {
                    this.leftList.forEach((item, index) => {
                        if (firstName.toUpperCase() === item.title) {
                            item.content.push({
                                header: "",
                                value: this.person.name,
                                position: this.person.position
                            });
                        } else {
                            this.leftList[this.leftList.length] = { title: firstName.toUpperCase(), content: [] };
                        }
                    });
                    alert('添加成功!');
                    this.defaultData = true;
                } else if (/\s|[0-9]/g.test(firstName)) {
                    alert('姓名不对!')
                } else {
                    this.leftList.forEach((item, index) => {
                        if (getPinYin(firstName).toUpperCase() === item.title) {
                            item.content.push({
                                header: "",
                                value: this.person.name,
                                position: this.person.position
                            })
                        } else {
                            this.leftList.forEach((item, index) => {
                                if (item.title === getPinYin(firstName).toUpperCase().slice(0, 1)) {
                                    item.content.push({
                                        header: "",
                                        value: this.person.name,
                                        position: this.person.position
                                    })
                                }
                            })
                        }
                    });
                    alert('添加成功!');
                    this.defaultData = true;
                }
            }
            this.person.name = '';
            this.person.position = '';
        }
    },
    watch: {
        'scrollHeight': {
            handler: function (val) {
                // 监听滚动高度值的改变
                document.getElementById('content').scrollTop = parseInt(val);
            },
            deep: true
        }
    }
})