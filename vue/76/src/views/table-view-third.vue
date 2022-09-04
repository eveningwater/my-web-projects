<template>
  <element-table :data="tableData" :column="columnList" :total="tableTotal" :pageSize="pageParam.pageSize"
    :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
    :pageSizeList="[4, 8, 12, 16]" isFilterData indexShow selectionShow @on-selection="onSelection"
    @on-sort-change="onSortHandler"></element-table>
</template>

<script>
import { createUUID } from '@/utils/util'
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'TableViewThird',
  setup() {
    const instance = getCurrentInstance()
    const $request = instance.appContext.config.globalProperties.$request
    const state = reactive({
      tableData: [],
      columnList: [
        {
          prop: 'index',
          label: '序号',
          render(h,params) {
            return h('span', null, { default: () => params.index + 1})
          },
        },
        {
          prop: 'id',
          label: 'id',
        },
        {
          prop: 'name',
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
          sortable: true,
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
    const loadTableData = (prop = 'status', order) => {
      $request({ url: '/src/assets/data.json', method: 'get' }).then(
        (res) => {
          const { currentPage, pageSize } = state.pageParam
          const data = res.map((item) => ({ ...item, id: createUUID() }))
          state.tableTotal = res.length
          state.tableData = data.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
          if (prop && order) {
            state.tableData = [
              ...state.tableData.sort((a, b) => {
                if (order !== 'descending') {
                  return a[prop] - b[prop]
                } else {
                  return b[prop] - a[prop]
                }
              }),
            ]
          }
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
      onSelection(keys) {
        console.log('选中的项', keys)
      },
      onSortHandler(options) {
        // console.log(options)
        const { column, prop, order } = options
        console.log(prop)
        // console.log(column,prop,order)
        loadTableData(prop, order)
      },
    }
    loadTableData()
    return {
      ...toRefs(state),
      ...methods
    }
  }
})
</script>
