import type ElTable from "element-plus/lib/components/table";
import type { ElTableColumn } from "element-plus/lib/components/table";
import { PropType } from "vue";

export type ElTableType = InstanceType<typeof ElTable>;
export type ElTableProps = ElTableType["$props"];

export type UserElTableColumnProps = {
  slotName?: string;
  headerSlot?: string;
  render?: (...arg: any[]) => any;
  children?: ElTableColumnProps[];
};

export type EmitKeyMethod = ElementTable.ConditionalKeys<
  ElTableType,
  `on${string}`
>;

export type ElTableColumnProps = InstanceType<typeof ElTableColumn>["$props"] &
  UserElTableColumnProps;

export type OmitTableProp = Required<
  Omit<ElTableProps, "data" | "class" | ElementTable.eventKey>
>;

export type KeyConstructor<Base extends object> = {
  [KeyProp in keyof Base]: PropType<Base[KeyProp]>;
};

export type TableValidProps = KeyConstructor<OmitTableProp>;

export const tableProps = {
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  align: {
    type: String,
    default: "center",
  },
  column: {
    type: Array as PropType<ElTableColumnProps[]>,
    default: () => [],
  },
};

export type MergeTableProps = typeof tableProps &
  ElementTable.eventMethodProps & {
    otherProps: PropType<Record<string, any>>;
    summaryMethod: PropType<(...param: any[]) => string[]>;
  } & TableValidProps;

export type SlotsType = {
  default?: (scope: Record<string, any>) => any;
  header?: (scope: Record<string, any>) => any;
};

export type ScopeType = (scope: any) => {}

export type MethodNameType = keyof ElTableType