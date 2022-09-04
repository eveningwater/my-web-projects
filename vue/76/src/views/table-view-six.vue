<template>
  <element-table :data="tableData" :column="columnList" :total="tableTotal" :pageSize="pageParam.pageSize"
    :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
    :pageSizeList="[4, 8, 12, 16]" isFilterData row-key="_id"></element-table>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from "vue"

export default defineComponent({
  name: 'TableViewSix',
  setup() {
    const instance = getCurrentInstance()
    const $request = instance.appContext.config.globalProperties.$request
    const state = reactive({
      tableData: [],
      columnList: [
        {
          prop: '_id',
          label: 'id',
        },
        {
          prop: 'menuName',
          label: '姓名',
        },
        {
          prop: 'title',
          label: '标题',
        },
        {
          prop: 'content',
          label: '内容',
        },
        {
          prop: 'date',
          label: '日期',
        },
        {
          prop: 'label',
          label: '分类',
        },
        {
          prop: 'remark',
          label: '备注',
        },
        {
          prop: 'status',
          label: '状态',
          render(h, params) {
            let text = ''
            switch (params.row.status) {
              case 1:
                text = '待发布'
                break
              case 2:
                text = '已发布'
                break
              case 3:
                text = '待审核'
                break
              case 4:
                text = '审核中'
                break
              case 5:
                text = '已审核'
                break
              default:
                text = '未确定'
                break
            }
            return h('span', null, text)
          },
        },
        {
          prop: 'address',
          label: '地址',

          render(h, params) {
            return h('span', params.row.address)
          },
        },
      ],
      tableTotal: 0,
      pageParam: {
        pageSize: 4,
        currentPage: 1,
      },
    })
    const loadTableData = () => {
      $request({ url: '/src/assets/data1.json', method: 'get' }).then(
        (res) => {
          const { currentPage, pageSize } = state.pageParam
          state.tableTotal = res.length
          state.tableData = res.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        }
      )
    }
    const methods = {
      onSizeChange(pageSize) {
        state.pageParam['pageSize'] = pageSize
        loadTableData()
      },
      onCurrentChange(page) {
        state.pageParam['currentPage'] = page
        loadTableData()
      },
    }
    loadTableData()
    return {
      ...toRefs(state),
      ...methods,
    }
  }
})
</script>

