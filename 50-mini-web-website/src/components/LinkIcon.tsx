import { defineComponent, PropType, toRefs } from "@vue/runtime-core";
import { dProp, githubDProp, backTopProp } from "../utils/iconPathData";
interface IconPropType {
  dProp: string;
  githubDProp: string;
  backTopProp: Array<{ d: string; color: string }>;
  [key: string]: any;
}
const iconProp: IconPropType = {
  dProp,
  githubDProp,
  backTopProp,
};
export default defineComponent({
  props: {
    color: {
      type: String as PropType<string>,
      default: "#fff",
    },
    width: {
      type: Number as PropType<number>,
      default: 45,
    },
    height: {
      type: Number as PropType<number>,
      default: 45,
    },
    type: {
      type: String as PropType<string>,
      default: "dProp",
    },
  },
  setup(props) {
    const { color, width, height, type, ...rest } = toRefs(props);
    const propValue = iconProp[type.value];
    const isArrayPropValue = Array.isArray(propValue);
    const isStringPropValue = typeof propValue === "string";
    return () => (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2426"
        width={width.value}
        height={height.value}
        {...rest}
      >
        {
            isArrayPropValue ? (
              propValue.map((v, index) => (
                <path key={v.color + index} d={v.d} fill={v.color}></path>
              ))
            ) : isStringPropValue ? (
              <path d={propValue} fill={color.value} p-id="2427"></path>
            ) : null
        }
      </svg>
    );
  },
});
