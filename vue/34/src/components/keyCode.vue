<script lang="tsx">
    import { defineComponent, PropType } from "@vue/runtime-core";
    import { useCssModule } from "@vue/runtime-dom";
    export default defineComponent({
        props:{
            content:{
                type:String as PropType<string>,
                default:"Press any key to get the keyCode"
            }
        },
        setup(props,{ slots }){
            const style = useCssModule();
            const { content,...rest } = props;
            const renderChildren = () => slots.default ? slots.default() : content;
            return () => (
                <div class={style["kc-key"]} { ...rest }>{ renderChildren() }</div>
            )
        }
    })
</script>
<style module lang="less">
    @import "../style/variable.less";
    .@{baseSelector}key {
        border-radius: unit(pow(4,2),px);
        border:unit(@full,px) solid @borderColor;
        background: linear-gradient(@rotate,@keyBgColor-1 percentage(pow(.1,1)), @keyBgColor-2 percentage(@full - .1));
        padding: unit(@full + @full,rem);
        margin: unit(pow(4,2) + @full + @full,px);
        &:extend(.flex-center);
        position: extract(@position,@full + @full);
        min-width: unit(pow(10,2) + 5 * 10,px);
        font-size: unit(3 * 6,px);
        color:fadeout(@fontColor,percentage(@full * .1));
        box-shadow: unit(@full,px) unit(pow(@full + @full,2),px) unit(pow(4,2),px) @boxShadowCOlor;
    }
</style>