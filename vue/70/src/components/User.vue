<script lang="ts" setup>
import { defineAsyncComponent, PropType } from 'vue';
const AsyncTitle = defineAsyncComponent(() => import('./Title.vue'));
const props = defineProps({
    src: String as PropType<string>,
    username: String as PropType<string>,
    role: String as PropType<string>,
})
</script>
<template>
    <div class="tbs-user">
        <img :src="props.src" alt="图片加载中" class="tbs-user-avatar">
        <div class="tbs-user-info">
            <async-title level="4" class="tbs-user-info-name">{{ props.username }}</async-title>
            <p class="tbs-user-info-role">{{ props.role }}</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.#{$prefix}user {
    @extend .flex-center;
    &-avatar {
        @include setProperty(width,75px);
        @include setProperty(height,75px);
        @include setProperty(object-fit,cover);
        @include setProperty(border-radius,percentage(.5));
    }
    &-info {
        @include setProperty(margin-left,10px);
        &-name {
            @include setProperty(font-weight,450);
        }
        &-role {
            @include setProperty(font-weight,400);
            @include setProperty(margin,10px 0);
        }
    }
}
</style>