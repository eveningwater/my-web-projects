<template>
    <small class="todo-footer">
        Left click to toggle completed.
        <br>
        Right click to delete todo
    </small>
</template>
<style lang="scss" scoped>
$footerColor: #e0e0e0;

.#{$prefix}footer {
    @include setProperty(margin-top, 3rem);
    @include setProperty(font-size, 1rem);
    @include setProperty(text-align, center);
    @include setProperty(color, $footerColor);
}
</style>