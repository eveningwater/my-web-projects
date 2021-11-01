import { defineComponent, PropType } from "@vue/runtime-core";
type LevelType = string | number;
export default defineComponent({
    props:{
        level:{
            type:[Number,String] as PropType<LevelType>,
            default:1,
            validator:(value:LevelType) => {
                const valueArr = [];
                for(let i = 1;i<=6;i++){
                    valueArr.push(i);
                }
                return valueArr.some(item => Number(value) === item);
            }
        },
        content:String as PropType<string>
    },
    setup(props,{ slots }){
        const { level,content,...rest } = props;
        const Item = `h${level}`;
        const renderChildren = () => slots.default ? slots.default() : content;
        return () => (
            <Item { ...rest }>{ renderChildren() }</Item>
        )
    }
})