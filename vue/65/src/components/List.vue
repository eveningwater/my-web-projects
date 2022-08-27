<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { REQUEST_URL } from '../utils/const';
type ResType = {
    picture: Record<string, unknown>,
    name: Record<string, unknown>,
    location: Record<string, unknown>
};
const AsyncPreLoadImage = defineAsyncComponent(() => import('./PreLoadImage.vue'));
const AsyncTitle = defineAsyncComponent(() => import('./Title.vue'));
const list = ref<{ image: string, name: string, location: string,key: string }[]>([]);
const originList = ref<{ image: string, name: string, location: string,key: string }[]>([]);
const requestData = async () => {
    const res = await fetch(REQUEST_URL);
    const data = await res.json();
    originList.value = list.value = data.results?.map((item: ResType,index: number) => {
        const { picture: { large }, name: { first, last }, location: { city, country } } = item;
        return {
            image: large,
            name: first + ' ' + last,
            location: city + ',' + country,
            key: `${index}-${index + 1}`
        }
    });
}
const filterUserData = (v: string) => {
     list.value = originList.value.filter(item => (item.name + item.location).toLowerCase().indexOf(v.trim().toLowerCase()) > -1);
}
defineExpose({
    filterUserData
})
onMounted(async () => {
    await requestData();
})
</script>
<template>
    <ul class="luf-user-list">
        <li class="luf-user-list-li" v-for="item in list" :key="item.key">
            <async-pre-load-image class="luf-user-list-li-avatar" :src="item.image" :alt="item.name"></async-pre-load-image>
            <div class="luf-user-list-li-info">
                <async-title level="4" class="luf-user-list-li-info-name">{{ item.name }}</async-title>
                <p class="luf-user-list-li-info-location">{{ item.location }}</p>
            </div>
        </li>
    </ul>
</template>
<style lang="scss" scoped>
$listBorderColor: #fefefe;

.#{$baseSelector}user-list {
    @include setProperty(max-height, 450px);
    @include setProperty(overflow, hidden);
    @include setProperty(overflow-y, auto);
    @include setProperty(background-color, $white);
    @include setProperty(list-style, none);

    &-li {
        @include setProperty(display, flex);
        @include setProperty(align-items, center);
        @include setProperty(padding, 20px);

        &:not(:last-of-type) {
            @include setProperty(border-bottom, 1px solid $listBorderColor);
        }

        &-avatar {
            @include setProperty(width, 60px);
            @include setProperty(height, 60px);
            @include setProperty(object-fit, cover);
            @include setProperty(cursor, pointer);
            @include setProperty(border-radius, 50%);
        }

        &-info {
            @include setProperty(margin-left, 10px);

            &-name {
                @include setProperty(margin-bottom, 10px);
            }

            &-location {
                @include setProperty(font-size, 14px);
            }
        }
    }
}
</style>