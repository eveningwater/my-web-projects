import { defineComponent } from "vue";
import TableColumn from "./table-column";
import { MergeTableProps, MethodNameType, tableProps } from "./tableProps";
export default defineComponent({
  name: "ElementTable",
  props: {
    ...(tableProps as MergeTableProps),
  },
  components: { TableColumn },
  setup(props, { slots,attrs }) {
    const { data, column, align } = props;
    return () => (
      <div class="element-table">
        <el-table
          data={data}
          ref="elTableRef"
          {...attrs }
          v-slots={{
            append: () => slots.append && slots.append(),
            empty: () => slots.empty && slots.empty(),
          }}
        >
          <table-column column={column} align={align} v-slots={slots}></table-column>
        </el-table>
      </div>
    );
  },
  mounted(){
      this.injectTablePrimaryMethods();
  },
  methods:{
    injectTablePrimaryMethods(){
       const _self = this as any;
       const elTableRef = _self['$refs']['elTableRef'];
       const tableMethodNameList: MethodNameType [] = [
        "clearSelection",
        "toggleRowSelection",
        "toggleAllSelection",
        "toggleRowExpansion",
        "setCurrentRow",
        "clearSort",
        "clearFilter",
        "doLayout",
        "sort",
      ];

      for (const name of tableMethodNameList) {
        if(!(_self[name])){
          _self[name] = elTableRef?.[name];
        }
      }
    }
  }
});
