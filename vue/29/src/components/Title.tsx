import { defineComponent, PropType } from "@vue/runtime-core";

export const TitleNumberCollection = [1,2,3,4,5,6];

export default defineComponent({
    props:{
        level:{
            type:[Number,String] as PropType<number|string>,
            default:1,
            // Need to define the type of value
            validator:(value:string | number) => {
                return TitleNumberCollection.indexOf(Number(value)) > -1;
            }
        },
        content:{
            type:String as PropType<string>
        }
    },
    setup(props,{ slots }){
        const { level,content,...rest } = props;
        const TitleName = "h" + level;
        const renderChildren = () => slots.default ? slots.default() : props.content;
        return () => (
            <TitleName {...rest}>
                { renderChildren() }
            </TitleName>
        )
    }
})