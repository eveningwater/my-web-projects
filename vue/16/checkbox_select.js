Vue.component('CheckBoxSelect', {
    template: "#checkboxSelect",
    model: {
        prop: "checkSelectValue",
        event: "change"
    },
    props: {
        placeMent: {
            type: String,
            default: "bottom"
        },
        popoverWidth: {
            type: [String, Number],
            default: 240
        },
        defaultProps: {
            type: Object,
            default: () => {
                return {
                    label: "label",
                    value: "value"
                };
            }
        },
        selectPlaceholder: {
            type: String,
            default: "请选择内容"
        },
        selectData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        checkSelectValue: {
            type: Array,
            default: () => {
                return [];
            }
        },
        showAll: {
            type: Boolean,
            default: true
        },
        allProps: {
            type: Object,
            default: () => {
                return {
                    allLabel: "全部",
                    allValue: "全部"
                }
            }
        }
    },
    computed: {
        getLabel() {
            return this.defaultProps.label || "label";
        },
        getValue() {
            return this.defaultProps.value || "value";
        },
        getSelectValue() {
            return this.finallySelectValue.length
                ? this.finallySelectValue.reduce((res, item) => {
                    this.selectData.map(_ => {
                        if (_[this.defaultProps.value] === item) {
                            res.push(_);
                        }
                    });
                    if (item === this.allProps.allValue) {
                        res.unshift({
                            label: this.allProps.allLabel,
                            value: this.allProps.allValue
                        });
                    }
                    return res;
                }, [])
                : [];
        }
    },
    data() {
        return {
            selectValue: [],
            isIndeterminate: false,
            checkAll: false,
            visible: false,
            finallySelectValue: []
        };
    },
    watch: {
        checkSelectValue: {
            handler(val) {
                this.finallySelectValue = val;
                if (val.length) {
                    this.selectValue = val.filter(_ => _ !== this.allProps.allValue);
                } else {
                    this.selectValue = val;
                }
                const checkedCount = this.selectValue.length;
                this.checkAll = checkedCount === this.selectData.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.selectData.length;
            },
            deep: true
        }
    },
    methods: {
        onShow() {
            this.visible = true;
        },
        onHide() {
            this.visible = false;
        },
        onClose(value) {
            if (value === this.allProps.allValue) {
                this.selectValue = this.finallySelectValue = [];
                this.checkAll = false;
                return;
            }
            let index = this.selectValue.indexOf(value);
            let faIndex = this.finallySelectValue.indexOf(value);
            if (index > -1 || faIndex > -1) {
                this.selectValue.splice(index, 1);
                this.finallySelectValue.splice(index, 1);
                this.isIndeterminate = true;
            } else {
                this.selectValue = this.finallySelectValue = [];
                this.checkAll = false;
            }
        },
        handleCheckAllChange(val) {
            this.selectValue = val
                ? this.selectData.reduce((res, item) => {
                    res.push(item[this.getValue]);
                    return res;
                }, [])
                : [];
            this.finallySelectValue = this.checkAll
                ? this.selectValue.concat([this.allProps.allValue])
                : this.selectValue;
            this.$emit("change", this.finallySelectValue);
            this.isIndeterminate = false;
        },
        handleCheckedChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.selectData.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.selectData.length;
            this.finallySelectValue = this.checkAll
                ? this.selectValue.concat([this.allProps.allValue])
                : this.selectValue;
            this.$emit("change", this.finallySelectValue);
        }
    }
})