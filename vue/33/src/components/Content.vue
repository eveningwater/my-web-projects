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
                <p {...rest}>{ renderChildren()}</p>
            )
        }
    })
</script>