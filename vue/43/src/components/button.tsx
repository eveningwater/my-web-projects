import { defineComponent, PropType, toRefs } from "@vue/runtime-core";
export type ButtonNativeType = "button" | "reset" | "submit";
export default defineComponent({
    props:{
        content:String as PropType<string>,
        nativeType:[String,undefined] as PropType<Partial<ButtonNativeType>>
    },
    setup(props,{ slots }){
        const { nativeType,content,...rest } = toRefs(props);
        const renderChildren = () => slots.default ? slots.default() : content.value;
        return () => (
            <button type={nativeType.value} {...rest}>{renderChildren()}</button>
        )
    }
})