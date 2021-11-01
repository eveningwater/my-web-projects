<script lang="tsx">
    import { defineComponent, PropType } from "@vue/runtime-core";
    export default defineComponent({
        props:{
            content:String as PropType<string>
        },
        setup(props,{ slots }){
            const { content,...rest } = props;
            const renderChildren = () => slots.default ? slots.default() : content;
            return () => (
                <div class="faq-collapse" {...rest}>{renderChildren()}</div>
            )
        }
    })
</script>
<style lang="less" scoped>
    @rel:"../style/";
    @import "@{rel}variable.less";
    .@{baseSelector}collapse {
        .m(n,20,px);
        background: linear-gradient(@rotate,@faqBgColor-1 percentage(@full * .1),@faqBgColor-2 luma(rgb(200,264,100)));
        border: unit(@full,px) solid @faqBorderColor;
        .p(n,30,px);
        border-radius: unit(pow(4,2) + @full + @full,px);
        overflow: extract(@overflow,@full + @full);
        position: extract(@position,@full + @full);
        color:@titleColor;
        transition: all convert(300ms,"s") cubic-bezier(0.075, 0.82, 0.165, @full);
        &.active {
            background: linear-gradient(@rotate,@faqActiveBgColor-1 percentage(@full * .1),@faqActiveBgColor-2 luma(rgb(200,264,100)));
            .faq-box-shadow();
        }
    }
</style>