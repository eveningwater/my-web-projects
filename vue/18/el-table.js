const TableColumnSlot = {
    functional:true,
    props:{
        row:Object,
        render:Function,
        index:Number,
        column:{
            type:Object,
            default:null
        }
    },
    render:(h,vm) => {
        const params = {
            row:vm.props.row,
            index:vm.props.index
        };
        if(vm.props.column)params.column = vm.props.column;
        return vm.props.render(h,params);
    }
}
const ElTable = {
    inheritAttrs:false,
    components:{ TableColumnSlot },
    template:`
        <div class="el-make-table">
            <el-table :data="data">
                <el-table-column v-for="(col,index) in header" :key="col + index" :label="col.label">
                    <template slot-scope="scope">
                        <table-column-slot 
                            v-if="col.render" 
                            :render="col.render" 
                            :row="scope.row" 
                            :column="col" 
                            :index="scope.$index"
                        ></table-column-slot>
                        <template v-else>
                            <slot name="column-content">{{ scope.row[col.prop] }}</slot>
                        </template>
                    </template>
                </el-table-column>
                <slot name="column"></slot>
            </el-table>
            <slot></slot>
            <div class="el-make-pagination-container">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="getCurrentPage"
                    :page-sizes="pageSizeList"
                    :page-size="getCurrentPageSize"
                    :layout="pageLayout"
                    :total="getTotal"
                    v-if="hasPage"
                >
                </el-pagination>
            </div>
        </div>
    `,
    props:{
        header:{
            type:Array,
            default:() => ([])
        },
        data:{
            type:Array,
            default:() => ([])
        },
        hasPage:{
            type:Boolean,
            default:true
        },
        pageLayout:{
            type:String,
            default:"total, sizes, prev, pager, next, jumper"
        },
        pageSizeList:{
            type:Array,
            default:() => ([10, 20, 30, 40])
        },
        total:{
            type:Number,
            default:0
        },
        currentPage:{
            type:Number,
            default:1
        },
        pageSize:{
            type:Number,
            default:10
        }
    },
    computed:{
        getTotal(){
            return this.total;
        },
        getCurrentPage(){
            return this.currentPage;
        },
        getCurrentPageSize(){
            return this.pageSize;
        }
    },
    methods:{
        handleSizeChange(pageSize){
            this.$emit('on-size-change',pageSize);
        },
        handleCurrentChange(page){
            this.$emit('on-current-change',page);
        }
    }
}