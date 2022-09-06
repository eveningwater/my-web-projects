<template>
    <el-dialog title="高级查询" custom-class="form-tree-dialog" :visible.sync="dialogVisible">
        <el-tree :data="testTreeData" node-key="id" :props="defaultProps" class="custom-tree" ref="customTree">
            <span class="custom-tree-node" slot-scope="{ node,data }">
                <div class="flex-around">
                    <el-radio-group v-model="node.logic">
                        <el-radio
                            v-for="(item,index) in radioList"
                            :key="item.value + index"
                            :label="item.value"
                        >{{ item.label }}</el-radio>
                    </el-radio-group>
                    <el-button-group>
                        <el-button type="text" @click="addDataGroup($event, data)">
                            <i class="el-icon-plus"></i>分组
                        </el-button>
                        <el-button type="text" @click="addDataCondition($event, data)">
                            <i class="el-icon-plus"></i>条件
                        </el-button>
                    </el-button-group>
                    <el-button
                        v-if="data.showDel"
                        size="mini"
                        class="del-btn"
                        @click="deleteDataGroup($event, data, node)"
                    >
                        <i class="el-icon-minus"></i>
                    </el-button>
                </div>
                <div class="custom-form-container" v-for="(row,index) in data.formComponentData" :key="row.data.toString() + index">
                    <component
                        v-for="(item,formIndex) in row.data"
                        :key="item.elementType + formIndex"
                        :is="item.elementType"
                        v-bind="getNeedProp(item)"
                        @[item.eventName]="changeHandler($event,item)"
                        v-model="item.modelValue"
                    >
                        <template v-show="item.elementType==='el-select'">
                            <el-option
                                v-for="(selectItem,selectIndex) in item.selectList"
                                :key="selectItem.value + selectIndex"
                                :value="selectItem.value"
                                :label="selectItem.label"
                            ></el-option>
                        </template>
                        <template v-show="item.elementType==='el-button'">
                            <span v-html="item.text"></span>
                        </template>
                    </component>
                    <el-button
                        size="mini"
                        class="del-btn"
                        @click="deleteDataCondition($event,index,data.formComponentData)"
                    >
                        <i class="el-icon-minus"></i>
                    </el-button>
                </div>
            </span>
        </el-tree>
        <span class="dialog-footer" slot="footer">
            <div class="footer-container">
                <el-button type="primary" @click="resetTreeDataHandler">重置</el-button>
                <div>
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onQueryHandler">查询</el-button>
                </div>
            </div>
        </span>
    </el-dialog>
</template>
<script>
import { formData } from "./condition";
const isObject = obj => typeof obj === "object" && !!obj;
const deepCopy = (function f(obj) {
    if (!isObject(obj)) return;
    let cloneObj = Array.isArray(obj) ? [] : {};
    for (let k in obj) {
        cloneObj[k] = isObject(obj[k]) ? f(obj[k]) : obj[k];
    }
    return cloneObj;
});
const initData = {
    "id": "1",
    "logic": "Or",
    "children": [],
    "formComponentData":[
        {
            "data":deepCopy(formData)
        }
    ]
};
export default {
    name: "Form-tree",
    model:{
        event:"on-change",
        prop:"visible"
    },
    props: {
        treeData: {
            type: Array,
            default: () => ([])
        },
        visible:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            testTreeData: [deepCopy(initData)],
            radioList: [
                {
                    label: "并且",
                    value: "And"
                },
                {
                    label: "或者",
                    value: "Or"
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'logic'
            },
            dialogVisible: false
        }
    },
    computed:{
        getNeedProp(){
            return data => {
                let newData = {};
                this.getKeys(data).forEach(key => newData[key] = data[key]);
                return newData;
            }
        }
    },
    methods: {
        addDataGroup(e, data) {
            e.stopPropagation();
            let index = data.children.length;
            data.children.push({
                logic: "Or",
                showDel: true,
                id: data.id + "-" + (index + 1),
                formComponentData:[],
                children:[]
            });
        },
        deleteDataGroup(e, data, node) {
            const currentId = data.id;
            const children = node.parent.data.children;
            e.stopPropagation();
            if (children.length) {
                children.forEach((child, index) => {
                    if (child.id === currentId) {
                        children.splice(index, 1);
                    }
                })
            }
        },
        addDataCondition(e,data) {
            e.stopPropagation();
            data.formComponentData.push({
                data:deepCopy(formData)
            })
        },
        deleteDataCondition(e,index,data){
            e.stopPropagation();
            data.splice(index,1);
        },
        onQueryHandler(){
            console.log(this.$refs.customTree.getCurrentNode())
        },
        resetTreeDataHandler(){
            this.$set(this,"testTreeData",[deepCopy(initData)]);
            // console.log(this.testTreeData)
        },
        getKeys(item){
            return Object.keys(item).filter(key => ["elementType","selectList","modelValue","eventName","eventHandler"].indexOf(key) === -1);
        },
        changeHandler($event,item){
            item.eventHandler($event,item,this)
        }
    },
    watch:{
        treeData:{
            handler(val){
                if(Array.isArray(val) && val.length){
                    this.testTreeData = [...val];
                }
            },
            deep:true,
            immediate:true
        },
        dialogVisible(val){
            this.$emit("on-change",val);
        },
        visible:{
            handler(val){
                if(typeof val === "boolean"){
                    this.dialogVisible = val;
                    this.$emit("on-change",this.dialogVisible);
                }
            },
            deep:true,
            immediate:true
        }
    }
}
</script>
<style lang="less" scoped>
.form-tree-dialog {
    .footer-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .flex-around {
        display: flex;
        align-items: center;
        .el-button-group {
            margin-left: 15px;
            display: inline-flex;
            align-items: center;
            .el-button.el-button--text {
                margin-left: 6px;
            }
        }
        .del-btn {
            margin-left: 5px;
        }
    }
    .custom-tree {
        /deep/ .el-tree-node .el-tree-node__content {
            height: auto;
            justify-content: flex-start;
            .custom-form-container {
                 margin-left: 15px;
                 padding: 8px 0;
                 .el-select {
                     margin-right: 10px;
                 }
            }
        }
    }
}
</style>