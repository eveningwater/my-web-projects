<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Header from './Header.vue';
import List from './List.vue';
const listRef = ref<{ filterUserData: (v: string) => void }>();
const searchValue = ref('');
watchEffect(() => {
    if (searchValue.value && listRef.value) {
        listRef.value?.filterUserData(searchValue.value)
    }
})
</script>
<template>
    <div class="luf-container">
        <Header v-model="searchValue"></Header>
        <List ref="listRef"></List>
    </div>
</template>
<style lang="scss" scoped>
$boxShadow: 0 2px 12px fade-in(rgba(123, 111, 10, .5), .2);

.#{$baseSelector}container {
    @include setProperty(width, 350px);
    @include setProperty(max-width, percentage(1));
    @include setProperty(box-shadow, $boxShadow);
    @include setProperty(overflow, hidden);
}
</style>