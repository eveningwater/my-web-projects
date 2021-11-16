<script lang="tsx">
    import { defineComponent, PropType } from "@vue/runtime-core";
    import maInput from "./Input.vue";
    export default defineComponent({
        props:{
            content:String as PropType<string>,
            onBlur:Function
        },
        components:{
            maInput
        },
        setup(props,{ slots }){
            const renderChildren = () => slots.default ? slots.default() : props.content;
            const { onBlur } = props;
            const onBlurHandler = (e:FocusEvent) => {
                onBlur && onBlur(e);
            }
            return () => (
                <header class="ma-header">
                    { renderChildren() }
                    <ma-input placeholder="Search movies" class="ma-search-input" onBlur={ onBlurHandler }></ma-input>
                </header>
            )
        }
    })
</script>
<style lang="scss" scoped>
    @import "../style/variable.scss";
    .#{$baseSelector}header {
        @include flex-100p;
        @include p(null,1,rem);
        height: 5rem;
        @extend .headerBgColor;
        box-sizing: border-box;
        justify-content: flex-end;
        .#{$baseSelector}search-input {
            width: 240px;
        }
    }
</style>