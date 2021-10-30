import { defineComponent, PropType } from "@vue/runtime-core";
type LevelType = string | number;
export default defineComponent({
    props:{
        level:{
            type:[String,Number] as PropType<LevelType>,
            default:1,
            validator:(value:LevelType) => {
                return [1,2,3,4,5,6].indexOf(Number(value)) > -1;
            }
        },
        content:String as PropType<string>
    },
    setup(props,{ slots }){
        const { level,content,...rest } = props;
        const item = "h" + level;
        const renderChildren = () => slots.default ? slots.default() : content;
        return () => (
            <item { ...rest }>{ renderChildren() }</item>
        )
    }
})