<script lang="tsx">
    import { defineComponent, PropType } from "@vue/runtime-core";
    import { toRefs } from "vue";
    type LevelType = string | number;
    export default defineComponent({
        props:{
            level:{
                type:[String,Number] as PropType<LevelType>,
                default:1,
                validator:(value:LevelType) => {
                    return [1,2,3,4,5,6].includes(Number(value));
                }
            },
            content:String as PropType<string>
        },
        setup(props,{ slots }){
            const { level,content } = toRefs(props);
            const TitleItem = "h" + level.value;
            const renderChildren = () => slots.default ? slots.default() : content;
            return () => (
                <TitleItem>{ renderChildren() }</TitleItem>
            )
        }
    })
</script>