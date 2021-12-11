<script lang="tsx">
    import { defineComponent, inject, PropType } from "@vue/runtime-core";
    import { computed, Ref } from "vue";
    import classnames from "../utils/classnames";
    export default defineComponent({
        props:{
            label:String as PropType<string>,
            value:String as PropType<string>
        },
        setup(props,{ slots }){
            const { label,value,...rest } = props;
            const renderChildren = () => slots.default ? slots.default() : label;
            const selectContext= inject("select-context") as { isDown:Ref<boolean>,emit:(event: string, ...payload: any[]) => void,selectValue:Ref<string | undefined> } ;
            const onClickHandler = () => {
                 selectContext.isDown.value = false;
                 selectContext.emit("on-change",{ label,value });
                 selectContext.emit("update:modelValue",value);
                 selectContext.selectValue.value = label;
            }
            const optionClass = computed(() => ({
                "mini-web-option":true,
                "active":selectContext.selectValue.value === value 
            }));
            return  () => (
                <div 
                    { ...rest } 
                    onClick={onClickHandler} 
                    data-label={label} 
                    data-value={value}
                    class={classnames(optionClass.value)}
                >{ renderChildren() }</div>
            )
        }
    })
</script>
<style lang="less" scoped>
@titleBorderColor:#e6e7e8;
@selectOptionBgColor:#686868;
.@{baseSelector}option {
    .p(l,12,px);
    .p(r,12,px);
    .p(t,8,px);
    .p(b,8,px);
    color:@optionFontColor;
    font-size: unit(2 * pow(3,2),px);
    border-bottom: unit(@full,px) solid @selectOptionBgColor;
    cursor: extract(@cursor,@full);
    transition: all convert(.03s,"ms") cubic-bezier(0.39, 0.575, 0.565, @full);
    &:hover,&.active {
        background: @selectOptionBgColor;
        color:@color;
    }
}   
</style>