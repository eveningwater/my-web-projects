<template>
  <div id="app" class="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabList" :key="item.name + index" :label="item.label" :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      tabList: [
        {
          label: '固定最后一列',
          name: 'first',
        },
        {
          label: '多组按钮',
          name: 'second',
        },
        {
          label: '多选与排序',
          name: 'third',
        },
        {
          label: '分页',
          name: 'fourth',
        },
        {
          label: '嵌套table',
          name: 'fifth',
        },
        {
          label: '树形表格',
          name: 'six',
        },
      ],
      activeName: 'first',
    })
    const router = useRouter()
    const route = useRoute()
    const handleClick = (tab) => {
      router.push('/' + tab.paneName)
    }
    watch(() => route, (val) => {
      state.activeName = val.path.slice(1) || 'first'
    }, { deep: true, immediate: true, })
    return {
      ...toRefs(state),
      handleClick
    }
  },
})
</script>


