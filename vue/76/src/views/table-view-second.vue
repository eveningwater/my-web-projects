<template>
  <el-row>
    <el-col :span="24" class="mb-10">
      <element-table :data="tableData" :column="columnFirst" :total="tableTotal" :pageSize="pageParam.pageSize"
        :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
        :pageSizeList="[5, 10, 15, 20]" :hasPage="false" isFilterData filterText="no value"></element-table>
    </el-col>
    <el-col :span="24">
      <element-table :data="tableData" :column="columnSecond" :total="tableTotal" :pageSize="pageParam.pageSize"
        :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
        :pageSizeList="[5, 10, 15, 20]" isFilterData actionKey="label" :hasPage="false"></element-table>
    </el-col>
  </el-row>
</template>

<script>
import { createUUID } from '@/utils/util'
import { ElButton } from 'element-plus'
import { computed, defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'TableViewSecond',
  setup() {
    const instance = getCurrentInstance()
    const $request = instance.appContext.config.globalProperties.$request
    const state = reactive({
      tableData: [],
      columnList: [
        {
          prop: 'id',
          label: 'id',
          tooltip: false,
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
        pageSize: 5,
        currentPage: 1,
      },
    });
    const columnFirst = computed(() => {
      return state.columnList.slice().concat({
        prop: 'action',
        label: '操作',
        render(h, params) {
          return h('div', null, [
            h(ElButton,
              {
                type: 'primary',
                size: 'small',
                onClick: (e) => console.log(params.row, e)
              },
              {
                default: () => '编辑'
              }
            ),
            h(ElButton,
              {
                type: 'danger', size: 'small',
                onClick: (e) => console.log(params.row, e)
              },
              {
                default: () => '删除'
              }
            ),
          ])
        },
      })
    })
    const columnSecond = computed(() => {
      return state.columnList.slice().concat({
        prop: 'action',
        label: '操作',
        type: 'button',
        actions: [
          {
            type: 'primary',
            onClick: (row) => {
              console.log('clicked', row)
            },
            label: '编辑',
            size: 'small',
          },
          {
            type: 'danger',
            onClick: (row) => {
              console.log('clicked', row)
            },
            label: '删除',
            size: 'small',
          },
        ],
      })
    })
    const loadTableData = () => {
      $request({ url: '/src/assets/data.json', method: 'get' }).then(
        (res) => {
          const { currentPage, pageSize } = state.pageParam
          console.log(res);
          const data = res.map((item) => ({ ...item, id: createUUID() }))
          state.tableTotal = res.length
          state.tableData = data.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        }
      )
    }
    const onSizeChange = (pageSize) => {
      state.pageParam['pageSize'] = pageSize
      loadTableData()
    }
    const onCurrentChange = (page) => {
      state.pageParam['currentPage'] = page
      loadTableData()
    }
    loadTableData()
    return {
      ...toRefs(state),
      columnFirst,
      columnSecond,
      onSizeChange,
      onCurrentChange
    }
  }
})
</script>

