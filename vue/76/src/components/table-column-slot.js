import { h } from "vue";
const TableColumnSlot = (props) => {
  const params  = {
    row: props.row,
    index: props.index,
  };
  if (props.column) params.column = props.column;
  return props.render(h,params)
};
TableColumnSlot.props = {
  row: Object,
  render: Function,
  index: Number,
  column: {
    type: Object,
    default: null,
  },
};
export default TableColumnSlot;
