<script lang="ts" setup>
    const emit = defineEmits(['click'])
</script>
<template>
    <button type="button" class="bg-box-btn" @click="emit('click')">
        <slot>Magic 🎩</slot>
    </button>
</template>
<style lang="scss" scoped>
    $white: #fff;
    $btnBgColor:linear-gradient(135deg,#4b71ec 10%,#0508c4);
    $btnHoverBgColor:linear-gradient(135deg,#669df0 10%,#010497);
    .#{$baseSelector}btn {
        @include setProperty(padding,.6rem .8rem);
        @include setProperty(display,inline-block);
        @include setProperty(color,$white);
        @include setProperty(background,$btnBgColor);
        @include setProperty(border-radius,8px);
        @include setProperty(border,0);
        @include setProperty(margin-bottom,2rem);
        @include setProperty(cursor,pointer);
        @include setProperty(font-size,1.2rem);
        @include setProperty(transition,all .3s cubic-bezier(.33,.44,.55,1));
        &:hover {
            @include setProperty(background,$btnHoverBgColor);
        }
    }
</style>