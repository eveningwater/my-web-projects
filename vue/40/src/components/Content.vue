<script lang="tsx">
    import { defineComponent } from "@vue/runtime-core";
    export default defineComponent({
        setup(){
            return () => (
                <main class="ma-main"></main>
            )
        }
    })
</script>
<style lang="scss" scoped>
    @import "../style/variable.scss";
    .#{$baseSelector}main {
        @include flex-100p;
    }
</style>