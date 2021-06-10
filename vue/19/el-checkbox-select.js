const ElBoxSelect = {
    inheritAttrs:false,
    template:`
        <el-select 
            v-model="selectValue" 
            :placeholder="placeholder" 
            :multiple="multiple" 
            :collapse-tags="multiple" 
            @remove-tag="removeSelectValue"
            @change="changeSelectValue"
            clearable
        >
            <template v-if="multiple">
                <el-option 
                    v-for="(item,index) in selectData" 
                    :key="item.toString() + index"
                    :label="item[selectProps.label]"
                    :value="item[selectProps.value]"
                >
                    <el-checkbox 
                        :value="item[selectProps.status]" 
                        @change="changeStatus" 
                        :true-label="item[selectProps.value]" 
                        :false-label="item[selectProps.value]"
                    >
                        {{ item[selectProps.label] }}
                    </el-checkbox>
                </el-option>
            </template>
            <template v-else>
                <el-option 
                    v-for="(item,index) in selectData" 
                    :key="item.toString() + index"
                    :label="item[selectProps.label]"
                    :value="item[selectProps.value]"
                >
                    <el-radio v-model="item[selectProps.status]" :label="item[selectProps.value]">
                        <slot>{{ item[selectProps.label] }}</slot>
                    </el-radio>
                </el-option>
            </template>
        </el-select>
    `,
    model:{
        prop:"value",
        event:"change"
    },
    props:{
        selectList:{
            type:Array,
            default:() => ([])
        },
        placeholder:{
            type:String,
            default:"请选择"
        },
        multiple:{
            type:Boolean,
            default:false
        },
        selectProps:{
            type:Object,
            default:() => ({
                label:"label",
                value:"value",
                status:"status"
            })
        }
    },
    data(){
        return {
            selectValue:[],
            selectData:[]
        }
    },
    created(){
        this.selectData = this.selectList;
        this.$watch('selectList',(newVal,oldVal) => {
            if(newVal !== oldVal){
                this.selectData = newVal;
            }
        });
        this.selectValue = this.multiple ? this.formateValue(this.value) : this.value;
        this.$watch(() => this.value,(newVal,oldVal) => {
            if(newVal !== oldVal){
                this.selectValue = this.multiple ? this.formateValue(newVal) : newVal;
            }
        })
    },
    methods:{
        changeStatus(v){
            const { status } = this.selectProps;
            const currentStatus = this.selectData.find(_ => _.value === v);
            if(!currentStatus)return;
            this.$set(currentStatus,status,!currentStatus[status]);
            this.selectValue = this.selectData.reduce((res,item) => {
                if(item.status){
                    res.push(item.value);
                }
                return res;
            },[]);
            this.$emit('change',this.selectValue,this.selectData.filter(_ => _.status));
        },
        formateValue(v){
            return typeof v === 'string' ? v.split(",").filter(i => i) : Array.isArray(v) ? v : [];
        },
        removeSelectValue(item){
            const { label,status } = this.selectProps;
            this.selectData.forEach(data => {
                if(data[label] === item){
                    this.$set(data,status,false);
                }
            })
        },
        changeSelectValue(item){
            const { label,value,status } = this.selectProps;
            const data = this.selectData;
            for(let i = 0,l = data.length;i < l;i++){
                if(this.multiple){
                    data[i][status] = item.indexOf(data[i][value]) > -1;
                }else{
                    data[i][status] = data[i][value] === item ? item : '';
                }
            }
            this.selectData = [...data];
            this.$emit('change',item,this.selectData.filter(_ => _.status));
        }
    }
}