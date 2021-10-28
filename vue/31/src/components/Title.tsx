import { defineComponent, PropType } from "@vue/runtime-core";
type LevelType = number | string;
export default defineComponent({
    props:{
        level:{
            type:[String,Number] as PropType<LevelType>,
            default:1,
            validator:(value:LevelType) => {
                return [1,2,3,4,5,6].indexOf(Number(value)) > -1;
            }
        },
        content:{
            type:String as PropType<string>
        }
    },
    setup(props,{ slots }){
        const { level,content,...rest } = props;
        const renderContent = () => slots.default ? slots.default() : content;
        const TagName = "h" + level;
        return () => (
            <TagName { ...rest }>{ renderContent() }</TagName>
        )   
    }
})