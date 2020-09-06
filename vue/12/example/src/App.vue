<template>
    <div id="app">
        <timeline direction="horizontal" :reverse="true">
            <timeline-item 
                v-for="(item,index) in timelineList" :key="item.type + index"
                :node-type="item.type"
                :node-size="item.size"
                :show-timestamp="true"
                :timestamp="item.timestamp"
                :timestamp-placement="item.stamp"
            >
            {{ item.content }}
            </timeline-item>
        </timeline>
    </div>
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                timelineList:[
                    {
                        timestamp:"2020/9/5",
                        content:"创建成功1",
                        size:"normal",
                        type:"default",
                        placement:"top"
                    },
                    {
                        timestamp:"2020/9/5",
                        content:"创建成功2",
                        size:"large",
                        type:"info",
                        placement:"bottom"
                    },
                    {
                        timestamp:"2020/9/5",
                        content:"创建成功3",
                        size:"normal",
                        type:"primary",
                        placement:"top"
                    },
                    {
                        timestamp:"2020/9/5",
                        content:"创建成功4",
                        size:"large",
                        type:"success",
                        placement:"bottom"
                    },
                    {
                        timestamp:"2020/9/5",
                        content:"创建成功5",
                        size:"normal",
                        type:"warning",
                        placement:"top"
                    },
                    {
                        timestamp:"2020/9/5",
                        content:"创建成功6",
                        size:"normal",
                        type:"error",
                        placement:"bottom"
                    }
                ]
            }
        }
    }
</script>
<style lang="less">
    #app {
        margin: 2em;
    }
</style>