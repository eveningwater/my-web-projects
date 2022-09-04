import { defineComponent } from "vue";
import { MergeTableProps, ScopeType, SlotsType, tableProps } from "./tableProps";

export type ColumnTypeProps = Pick<MergeTableProps,'column' | 'align'>;

const columnProps = { column:tableProps.column,align:tableProps.align };

const TableColumn = defineComponent({
  props: {
    ...(columnProps as ColumnTypeProps),
  },
  setup(props, { slots }) {
    const { column,align } = props;
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
          align={align}
          { ...rest }
          v-slots={vSlots}
        />
      );
    };
    const columnsSlots = column.map(renderColumn);
    return () => <>{columnsSlots}</>;
  },
});

export default TableColumn