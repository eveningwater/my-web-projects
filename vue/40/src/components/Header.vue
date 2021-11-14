<script lang="tsx">
    import { defineComponent } from "@vue/runtime-core";
    export default defineComponent({
        setup(){
            return () => (
                <header class="ma-header"></header>
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
    }
</style>