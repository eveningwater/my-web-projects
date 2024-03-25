import { defineComponent, ref, watch } from "vue";
import { ElTableColumnProps, MergeTableProps, ScopeType, SlotsType, tableProps } from "./tableProps";

export type ColumnTypeProps = Pick<MergeTableProps,'column' | 'align'>;

const columnProps = { column:tableProps.column,align:tableProps.align };
const isSameArray = <T extends unknown,U extends unknown>(a: T [],b: U []) => {
    if(!Array.isArray(a) || !Array.isArray(b)){
       return false;
    }
    if(a.length !== b.length){
       return false;
    }
    const len = a.length;
    for(let i = 0;i < len;i++){
       if(!Object.is(a[i],b[i])){
         return false;
       }
    }
    return true;
}
const TableColumn = defineComponent({
  props: {
    ...(columnProps as ColumnTypeProps),
  },
  setup(props, { slots }) {
    const column = ref<ElTableColumnProps []>(props.column);
    const align = ref(props.align);
    watch(() => props.column,() => {
        if(isSameArray(column.value,props.column)){
           column.value = props.column;
        }
    })
    const renderColumn = (columnDict: Record<string, any>, index: number) => {
      const { render, slotName, headerSlot, children, ...rest } = columnDict;
      const vSlots:SlotsType = {};
      if (typeof render === "function") {
        vSlots.default = (scope) => {
          if (rest.prop) {
            return render(scope.row[rest.prop], scope);
          }
          return render(scope);
        };
      }

      if (slotName && typeof slots[slotName] === "function") {
        const defaultSlotName = slots[slotName] as ScopeType;
        vSlots.default = scope => defaultSlotName(scope);
      }

      if (headerSlot && slots[headerSlot]) {
        const headerSlotName = slots[headerSlot] as ScopeType;
        vSlots.header = scope => headerSlotName(scope);
      }

      if (children?.length > 0) {
        vSlots.default = () => children.map(renderColumn);
      }
      return (
        <el-table-column
          key={index}
          align={align.value}
          { ...rest }
          v-slots={vSlots}
        />
      );
    };
    const columnsSlots = column.value.map(renderColumn);
    return () => <>{columnsSlots}</>;
  },
});

export default TableColumn