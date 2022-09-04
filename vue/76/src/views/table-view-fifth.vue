<template>
  <el-row>
    <el-col :span="24" class="mb-10">
      <h1>使用提供的expandShow</h1>
      <element-table :data="tableData" :column="columnFirst" :total="tableTotal" :pageSize="pageParam.pageSize"
        :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
        :pageSizeList="[5, 10, 15, 20]" isFilterData actionKey="label" expandShow>
        <template v-slot:expand="expandProps">
          <el-table-column type="expand">
            <template v-slot="props">
              <h2>{{ props.row.title }}</h2>
              <element-table :data="tableData" :column="columnFirst" :total="tableTotal" :pageSize="pageParam.pageSize"
                :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
                :pageSizeList="[5, 10, 15, 20]" isFilterData actionKey="label"></element-table>
            </template>
          </el-table-column>
        </template>
      </element-table>
    </el-col>
    <el-col :span="24" class="mb-10">
      <h1>插槽</h1>
      <element-table :data="tableData" :column="columnSecond" :total="tableTotal" :pageSize="pageParam.pageSize"
        :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
        :pageSizeList="[5, 10, 15, 20]" isFilterData actionKey="label">
        <template v-slot:prefixColumn>
          <el-table-column type="expand">
            <template v-slot="props">
              <h2>{{ props.row.title }}</h2>
              <element-table :data="tableData" :column="columnSecond" :total="tableTotal" :pageSize="pageParam.pageSize"
                :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
                :pageSizeList="[5, 10, 15, 20]" isFilterData actionKey="label"></element-table>
            </template>
          </el-table-column>
        </template>
        <template v-slot:suffixColumn>
          <el-table-column type="expand">
            <template v-slot="props">
              <h2>{{ props.row.title }}</h2>
              <element-table :data="tableData" :column="columnSecond" :total="tableTotal" :pageSize="pageParam.pageSize"
                :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
                :pageSizeList="[5, 10, 15, 20]" isFilterData actionKey="label"></element-table>
            </template>
          </el-table-column>
        </template>
      </element-table>
    </el-col>
    <el-col :span="24">
      <h1>render函数</h1>
      <element-table :data="tableData" :column="columnThird" :total="tableTotal" :pageSize="pageParam.pageSize"
        :currentPage="pageParam.currentPage" @on-size-change="onSizeChange" @on-current-change="onCurrentChange"
        :pageSizeList="[5, 10, 15, 20]" isFilterData actionKey="label"></element-table>
    </el-col>
  </el-row>
</template>

<script>
import { createUUID } from '@/utils/util'
import { ElButton, ElTableColumn } from 'element-plus'
import elementTable from '../components/elementTable.vue'
import { computed, defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'TableViewFifth',
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
      nestColumn: [
        {
          prop: '_id',
          label: 'id',
        },
        {
          prop: 'menuName',
          label: '姓名',
        },
      ],
      nestTableData: [],
    });
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
    const columnThird = computed(() => {
      return [
        {
          type: 'expand',
          render(h, params) {
            return h(elementTable, {
              data: state.tableData,
              column: state.columnList,
              total: state.tableTotal,
              isFilterData: true,
              pageSizeList: [5, 10, 15, 20],
              pageSize: state.pageParam.pageSize,
              currentPage: state.pageParam.currentPage,
              on: {
                'on-size-change': methods.onSizeChange,
                'on-current-change': methods.onCurrentChange,
              },
            },
              {
                default:() => '这是默认的插槽',
                prefixColumn: () => {
                  return h(ElTableColumn, {
                    label: 'id',
                    prop: 'id',
                  },{
                    default:() => '这是默认的插槽',
                  })
                },
                suffixColumn: () => {
                  return h(ElTableColumn, {
                    label: '操作',
                    prop: 'action'
                  }, {
                    default: () => {
                      return h('div', null, [
                        h(ElButton,
                          {
                            type: 'primary', size: 'small',
                            onClick: (e) => console.log(params.row, e),
                          },
                          {
                            default:() => '编辑'
                          }
                        ),
                        h(ElButton,
                          {
                            type: 'danger', size: 'small',
                            onClick: (e) => console.log(params.row, e),
                          },
                          {
                            default: () => '删除'
                          }
                        ),
                      ])
                    },
                  })
                },
              }
            )
          },
        },
        ...state.columnList.slice(),
      ]
    })
    const loadTableData = () => {
      $request({ url: '/src/assets/data.json', method: 'get' }).then(
        (res) => {
          const { currentPage, pageSize } = state.pageParam
          const data = res.map((item) => ({ ...item, id: createUUID() }))
          state.tableTotal = res.length
          state.tableData = data.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        }
      )
    }
    const loadNestTableData = () => {
      $request({ url: '/src/assets/data1.json', method: 'get' }).then(
        (res) => {
          const { currentPage, pageSize } = state.pageParam
          state.tableTotal = res.length
          state.nestTableData = res.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        }
      )
    }

    loadTableData()
    loadNestTableData()
    return {
      ...toRefs(state),
      ...methods,
      columnFirst,
      columnSecond,
      columnThird
    }
  }
})
</script>

