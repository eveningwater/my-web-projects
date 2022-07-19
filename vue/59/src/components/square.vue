<template>
    <div class="hb-square"></div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
    $squareBgColor:linear-gradient(135deg,#e6e6e6 10%,#7a7a7a 90%);
    $squareBoxColor: #b9fcda;
    .#{$baseSelector}square{
        @include setProperty(background,$squareBgColor);
        @include setProperty(box-shadow,0 0 3px $squareBoxColor);
        @include setProperty(width,16px);
        @include setProperty(height,16px);
        @include setProperty(margin,2px);
        @include setProperty(transition,2s ease-in-out);
    }
</style>