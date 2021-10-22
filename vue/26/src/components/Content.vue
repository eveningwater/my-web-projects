<script lang="ts" setup>
    const props = defineProps({
        content:{
            type:String,
            default:""
        },
        isRenderHTML:{
            type:Boolean,
            default:false
        }
    });
</script>
<template>
    <div class="rna-page-content">
        <slot>
            <template v-if="props.isRenderHTML">
                <p v-html="content"></p>
            </template>
            <template v-else>{{ props.content }}</template>
        </slot>
    </div>
</template>
<style scoped lang="less">
    @import "../style/variable.less";
    .rna-page-content {
        :deep(p) {
            text-indent: 2em;
            color:@content_font_color;
            line-height: 2;
            margin-bottom: 15px;
            letter-spacing: 1px;
        }
    }
</style>