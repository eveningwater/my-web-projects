<template>
    <Teleport to="body">
        <div class="preview-mask" :class="{ show: modelValue }" @click="emit('update:modelValue', false)">
            <async-pre-load-image :src="src" class="preview-mask-image"></async-pre-load-image>
        </div>
    </Teleport>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, PropType, toRefs } from 'vue';
const AsyncPreLoadImage = defineAsyncComponent(() => import('./PreLoadImage.vue'));
const props = defineProps({
    src: String as PropType<string>,
    modelValue: Boolean as PropType<boolean>
});
const emit = defineEmits(['update:modelValue']);
const { src, modelValue } = toRefs(props);
emit('update:modelValue');

</script>
<style lang="scss" scoped>
$previewPrefix: preview-;
$maskBgColor: linear-gradient(135deg, rgba(0, 0, 0, .5) 10%, rgba(0, 0, 0, .4) 90%);

@mixin setProp($prop, $value) {
    #{$prop}: $value;
}

.#{$previewPrefix}mask {
    @include setProp(position, fixed);
    @include setProp(z-index, 2000);
    @include setProp(left, 0);
    @include setProp(right, 0);
    @include setProp(top, 0);
    @include setProp(bottom, 0);
    @include setProp(background, $maskBgColor);
    @include setProp(justify-content, center);
    @include setProp(align-items, center);
    @include setProp(display, flex);
    @include setProp(transition, all .4s cubic-bezier(.43, .23, .65, .7));
    @include setProp(transform, scale(0));

    &.show {
        @include setProp(transform, scale(1));
    }

    &-image {
        @include setProp(max-width, percentage(.7));
        @include setProp(max-height, percentage(.7));
        @include setProp(min-width, percentage(.5));
        @include setProp(min-height, percentage(.5));
        @include setProp(object-fit, cover);
    }
}
</style>