<script lang="tsx">
    import { defineComponent, PropType } from '@vue/runtime-core';
    export default defineComponent({
        props:{
            level:{
                type:[Number,String] as PropType<number | string>,
                validator:(value:number | string) => {
                    return [1,2,3,4,5,6].indexOf(Number(value)) > -1
                },
                default:1
            },
            content:{
                type:String as PropType<string>
            }
        },
        setup(props,{ slots }) {
            const { level, content, ...rest } = props;
            const TitleName = "h" + level;
            const renderContent = () => slots.default ? slots.default() : content;
            return () => (
                <TitleName {...rest}>{renderContent()}</TitleName>
            )
        }
    })
</script>
<style lang="less">
    .sp-title{
        margin: 0;
    }
</style>