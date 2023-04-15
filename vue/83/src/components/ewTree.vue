<template>
    <div>
        <ul class="ew-tree">
            <li class="ew-tree_branch" v-for="item in model" :key="item[dataKey.key]">
                <div class="ew-tree_click">
                    <button type="button" class="ew-tree_children_btn"
                        v-if="Array.isArray(item[dataKey.children]) && item[dataKey.children].length" @click="() => toggle(item)">{{
                            !item[dataKey.isFolder
                            || 'show']
                            ?
                            '-' : '+' }}</button>
                    <button type="button" @click="() => addNode(item)" class="ew-tree-handle-btn" v-if="showAdd">新增</button>
                    <button type="button" @click="() => editNode(item)" class="ew-tree-handle-btn"
                        v-if="showEdit">编辑</button>
                    <button type="button" @click="() => deleteNode(item)" class="ew-tree-handle-btn"
                        v-if="showDelete">删除</button>
                    <span class="ew-folder">{{ item[dataKey.name] }}</span>
                </div>
                <ew-tree v-show="!item[dataKey.isFolder || 'show']"
                    v-if="Array.isArray(item[dataKey.children]) && item[dataKey.children].length"
                    :model="item[dataKey.children]" :dataKey="dataKey"></ew-tree>
            </li>
        </ul>
        <div class="ew-tree-modal" v-if="showNodeModal">
            <div class="ew-tree-modal-content">
                <input type="text" class="ew-tree-modal-input" v-model="nodeName" />
                <button type="button" class="ew-tree-modal-btn" @click="() => sureHandleNode()">确认</button>
                <button type="button" class="ew-tree-modal-btn ew-tree-modal-btn-cancel"
                    @click="() => cancelHandleNode()">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ewTree",
    props: {
        model: {
            type: Array,
            default: () => ([])
        },
        dataKey: {
            type: Object,
            default: () => ({ key: 'id', name: 'name', children: 'children', isFolder: 'show' })
        },
        showAdd: {
            type: Boolean,
            default: true
        },
        showEdit: {
            type: Boolean,
            default: true
        },
        showDelete: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            nodeName: '',
            editNodeData: null,
            showNodeModal: false,
            needAddNode: null
        }
    },
    methods: {
        toggle(item) {
            const isLeaf = this.dataKey.isFolder || 'show';
            const idx = this.model.indexOf(item);
            this.$set(this.model[idx], isLeaf, !item[isLeaf]);
        },
        addNode(item) {
            this.needAddNode = item;
            this.editNodeData = null;
            this.showNodeModal = true;
        },
        editNode(item) {
            this.nodeName = item[this.dataKey.name];
            this.showNodeModal = true;
            this.needAddNode = null;
            this.editNodeData = item;
        },
        deleteNode(item) {
            const res = confirm('确认要删除该节点吗?');
            if (res) {
                const idx = this.model.indexOf(item);
                this.$delete(this.model, idx);
            }
        },
        sureHandleNode() {
            if (!this.needAddNode && !this.editNodeData) {
                return;
            }
            if (!this.nodeName) {
                return alert('请输入节点名');
            }
            const { name, key, children, isFolder } = this.dataKey;
            if (this.needAddNode) {
                const childrenLength = this.needAddNode[children].length;
                const copyNode = { ...this.needAddNode };
                delete copyNode[children];
                delete copyNode[key];
                const nodeData = {
                    ...copyNode,
                    [key]: `${childrenLength + 1}`,
                    [name]: this.nodeName,
                    [isFolder]: false,
                    [children]: null
                }
                const idx = this.model.indexOf(this.needAddNode);
                this.$set(this.model[idx], children, [...this.needAddNode[children], { ...nodeData }]);
                alert('新增成功');
            } else if (this.editNodeData) {
                const idx = this.model.indexOf(this.editNodeData);
                const newEditNode = { ...this.editNodeData, [name]: this.nodeName };
                this.$set(this.model, idx, newEditNode);
                alert('编辑成功');
            }
            // 重置
            this.needAddNode = null;
            this.editNodeData = null;
            this.nodeName = '';
            this.showNodeModal = false;
        },
        cancelHandleNode() {
            this.showNodeModal = false;
        }
    }
}
</script>
<style>
ul,
li {
    list-style: none;
}

.ew-tree-modal {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 2000;
}

.ew-tree-modal-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 300px;
    background-color: #fff;
    padding: 15px;
    border-radius: 5px;
}

.ew-tree-modal-input {
    display: inline-block;
    border: 1px solid #ececec;
    border-radius: 4px;
    outline: none;
    padding: 8px 18px;
    margin-right: 8px;
}

.ew-tree-modal-input:focus {
    border-color: #2396ef;
}

.ew-tree-modal-btn {
    background-color: #2396ef;
    color: #fff;
    display: inline-block;
    padding: 8px 10px;
    cursor: pointer;
    border-radius: 4px;
    border: 0;
    margin-right: 5px;
}

.ew-tree-modal-btn.ew-tree-modal-btn-cancel {
    background-color: #fff;
    color: #535455;
    border: 1px solid #535455;
}

.ew-tree-modal-btn.ew-tree-modal-btn-cancel:hover {
    border-color: #2396ef;
    color: #2396ef;
    background-color: #fff;
}

.ew-tree-modal-btn:hover {
    background-color: #1591ef;
}

.ew-tree-handle-btn {
    background-color: transparent;
    border: 1px solid #8c8c8c;
    font-size: 14px;
    text-align: center;
    color: #5b5a5a;
    padding: 2px 4px;
    outline: none;
    border-radius: 5px;
    margin-left: 5px;
    cursor: pointer;
}

.ew-tree_container {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 3px #ccc;
    margin: 13px;
    position: relative;
}

.ew-tree {
    width: calc(100% - 44px);
    height: 100%;
    padding-left: 42px;
}

.ew-tree_branch {
    width: 100%;
    height: 100%;
    display: block;
    padding: 13px;
    position: relative;
}

.ew-tree_branch .ew-tree_children_btn {
    width: 19px;
    height: 19px;
    background-color: transparent;
    border: 1px solid #8c8c8c;
    font-size: 14px;
    text-align: center;
    color: #5b5a5a;
    outline: none;
    border-radius: 50%;
    cursor: pointer;
}

.ew-folder {
    margin-left: 5px;
}

ul.ew-tree:before {
    content: "";
    border-left: 1px solid #999999;
    height: 100%;
    position: absolute;
    left: 10px;
    top: 0px;
}

.ew-tree .ew-tree_branch:last-child::before {
    content: "";
    width: 3px;
    height: calc(100% - 24px);
    display: block;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    left: -34px;
}

.ew-tree,
.ew-tree_branch {
    position: relative;
}

.ew-tree_branch::after {
    content: "";
    width: 40px;
    height: 0;
    border-bottom: 1px solid #000;
    position: absolute;
    right: calc(100% - 9px);
    top: 23px;
}

.ew-tree_click {
    width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    z-index: 10;
}

.ew-tree_container>.ew-tree::before,
.ew-tree_container>.ew-tree>.ew-tree_branch::after {
    display: none;
}</style>