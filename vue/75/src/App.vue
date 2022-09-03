<template>
    <div id="app" class="app">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tabList" :key="item.name + index" :label="item.label"
                :name="item.name"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "App",
    data() {
        return {
            tabList: [
                {
                    label: "固定最后一列",
                    name: "first"
                },
                {
                    label: "多组按钮",
                    name: "second"
                },
                {
                    label: "多选与排序",
                    name: "third"
                },
                {
                    label: "分页",
                    name: "fourth"
                },
                {
                    label: "嵌套table",
                    name: "fifth"
                },
                {
                    label: "树形表格",
                    name: "six"
                }
            ],
            activeName: "first"
        }
    },
    methods: {
        handleClick(tab) {
            this.$router.push(tab.name)
        }
    },
    watch:{
        '$route':{
            handler(val){
                this.activeName = val.path.slice(1) || 'first'
            },
            immediate:true
        }
    }
}
</script>
<style lang="less">
</style>