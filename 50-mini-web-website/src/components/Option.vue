<script lang="tsx">
    import { defineComponent, PropType } from "@vue/runtime-core";
    export default defineComponent({
        props:{
            label:String as PropType<string>,
            value:String as PropType<string>
        },
        emits:["on-change"],
        setup(props,{ slots,emit }){
            const { label,value,...rest } = props;
            const renderChildren = () => slots.default ? slots.default() : label;
            const onClickHandler = () => {
                 emit("on-change",{ label,value });
            }
            return  () => (
                <div class="mini-web-option" { ...rest } onClick={onClickHandler}>{ renderChildren() }</div>
            )
        }
    })
</script>
<style lang="less" scoped>

</style>