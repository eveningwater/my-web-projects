<template>
    <div class="poke-card" :style="{background:background}">
        <div class="poke-card-avatar">
            <img :src="currentAvatar" alt="the pokemon" class="poke-card-avatar-img">
        </div>
        <div class="poke-card-info">
            <span class="poke-card-info-number">#{{ number }}</span>
            <async-title level="3" class="poke-card-info-name">{{ name }}</async-title>
            <small class="poke-card-info-type">Type:<span class="poke-card-info-type-text">{{ type }}</span></small>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { computed } from '@vue/reactivity';
    import { defineAsyncComponent, PropType } from 'vue';
    import { imageURL } from '../utils/const';
    const AsyncTitle = defineAsyncComponent(() => import('./Title.vue'))
    const props = defineProps({
        avatar: Number as PropType<number>,
        number: String as PropType<string>,
        name:String as PropType<string>,
        type:String as PropType<string>,
        background:String as PropType<string>
    });
    const currentAvatar = computed(() => imageURL + props.avatar + '.png')
</script>
<style lang="scss" scoped>
    $color:#807c7e;
    .#{$baseSelector}card {
        @include setProperty(padding,20px);
        @include setProperty(border-radius,10px);
        @include setProperty(text-align,center);
        @include setProperty(margin,8px);
        @include setProperty(color,$color);
        @include setProperty(box-shadow,0 0 3px fade-out(rgba(0,0,0,.3),.1));
        &-avatar {
            @include setProperty(width,120px);
            @include setProperty(height,120px);
            @include setProperty(border-radius,50%);
            @include setProperty(cursor,pointer);
            @include setProperty(background-color,fade-in(rgba(0,0,0,.5),.2));
            @include setProperty(transition,scale 2s ease-in-out);
            @include setProperty(text-align,center);
            &:hover {
                @include setProperty(transform,scale(1.2));
            }
            &-img {
                @include setProperty(max-width,90%);
                @include setProperty(margin-top,20px);
            }
        }
        &-info {
            @include setProperty(margin-top,1.3rem);
            @include setProperty(color,dark(rgba(0,0,0,.7)));
            &-number {
                @include setProperty(color,fade-out(#1297da,.2));
                @include setProperty(padding,5px 13px);
                @include setProperty(border-radius,8px);
                @include setProperty(font-size,1.3rem);
                @include setProperty(background,fade-in(rgba(0,0,0,.1),.1));
            }
            &-name {
                @include setProperty(color,fade-in(#2396ef,.6));
                @include setProperty(letter-spacing,1px);
                @include setProperty(margin,14px 0px 7px);
            }
            &-type {
                @include setProperty(font-size,14px);
                &-text {
                    @include setProperty(margin-left,6px);
                }
            }
        }
    }
</style>