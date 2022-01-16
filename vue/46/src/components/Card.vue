<template>
    <div class="cp-card">
        <div class="cp-card-header" :class="{'cp-animated-bg':isLoading }">
            <slot name="header">
                <img :src="isLoading ? '' : avatar" :alt="isLoading ? '' : '图片加载中'" class="cp-card-header-avatar" />
            </slot>
        </div>
        <div class="cp-card-content">
            <slot>
                <Title :level="titleLevel" class="cp-card-content-title" :class="{ 'cp-animated-bg':isLoading,'cp-animated-bg-text':isLoading }">
                    <slot name="title">{{ isLoading ? "" : cardTitle }}</slot>
                </Title>
                <template v-if="isLoading">
                    <span 
                        v-for="(item,index) in loadingContentList" :key="item.bg + index" 
                        :class="{
                            'cp-card-loading-content':true,
                            [item.bg]:true,
                            [item.text]:true
                        }"
                    >&nbsp;</span>
                </template>
                <template v-else>
                    <p class="cp-card-content-message" v-if="contentHTML" v-html="cardContent"></p>
                    <p class="cp-card-content-message" v-else>
                        <slot name="message">{{ cardContent }}</slot>
                    </p>
                </template>
                <div class="cp-card-content-footer">
                    <slot name="footer">
                        <div class="cp-card-content-footer-author-avatar" :class="{'cp-animated-bg':isLoading }">
                            <img :src="isLoading ? '' : authorAvatar" :alt="isLoading ? '' : '图片加载中'" class="cp-card-content-footer-author-avatar-img" />
                        </div>
                        <div class="cp-card-content-footer-author-info">
                            <strong class="cp-card-content-footer-author-info-name" :class="{'cp-animated-bg':isLoading,'cp-animated-bg-text':isLoading,'cp-card-loading-content':isLoading }">{{ isLoading ? '' : authorName }}</strong>
                            <small class="cp-card-content-footer-author-info-date" :class="{'cp-animated-bg':isLoading,'cp-animated-bg-text':isLoading,'cp-card-loading-content':isLoading }">{{ isLoading ? '' : authorDate }}</small>
                        </div>
                    </slot>
                </div>
            </slot>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import Title from "./Title.vue";
    const props = defineProps({
        avatar:String,
        cardTitle:String,
        cardContent:String,
        contentHTML:{
            type:Boolean,
            default:false
        },
        authorAvatar:String,
        authorName:String,
        authorDate:String,
        titleLevel:{
            type:[Number,String],
            default:"3"
        }
    });
    const isLoading = ref(true);
    const loadingContentList = ref<Array<{ bg:string,text:string }>>([
        { bg:"cp-animated-bg",text:"cp-animated-bg-text"},
        { bg:"cp-animated-bg",text:"cp-animated-bg-text"},
        { bg:"cp-animated-bg",text:"cp-animated-bg-text"}
    ])
    onMounted(() => setTimeout(() => isLoading.value = false,2000));
</script>
<style lang="scss" scoped>
    $boxShadowColor:$adjustColor;
    $contentTitleColor:#3e3e3f;
    $contentMessageColor:#464646;
    $contentFooterNameColor:#696969;
    $contentFooterDateColor:#a5a4a4;
    $animatedBgColor:linear-gradient(to right,#edeeee,#c2c5c2,#aaa9aa,#7d7d7e);
    .#{$baseSelector}card {
        @include setComponent(width,350,px);
        @include setComponent(border-radius,15,px);
        @include setComponent(margin,15,px);
        @extend .over-hidden;
        &-header {
            @include setComponent(height,180,px);
            &-avatar {
                @include setComponentPercent(width,100);
                @include setComponentPercent(height,100);
                @include setComponentPercent(max-width,100);
                @extend .obj-fit-cover;
            }
        }
        &-loading-content {
            @extend .el-display-block;
            @include setComponent(margin-top,15,px);
            @include setComponent(margin-bottom,15,px);
            @include setComponent(min-height,15,px);
            @include setComponentPercent(width,100);
        }
        &-content {
            @include background($white);
            @include setComponent(padding,25,px);
            &-title {
                @include setComponent(height,35,px);
                color:$contentTitleColor;
            }
            &-message {
                color:$contentMessageColor;
                @include setComponent(line-height,1.5,null);
                @include setComponent(margin-top,10,px);
                @include setComponent(margin-bottom,20,px);
            }
            &-footer {
                @extend .el-display-flex,.el-ai-center;
                &-author-avatar {
                    @include setComponent(width,60,px);
                    @include setComponent(height,60,px);
                    @include setComponentPercent(border-radius,50);
                    @extend .over-hidden,.el-cursor-pointer;
                    &-img {
                        @include setComponentPercent(max-width,100);
                    }
                    &:hover {
                        transition: {
                            delay:1s;
                            property:all;
                            duration:59s;
                            timing-function:cubic-bezier(.34,0,.84,1);
                        }
                        transform:rotate(666turn);
                    }
                }
                &-author-info {
                    @include setComponent(width,100,px);
                    @include setComponent(margin-left,15,px);
                    @extend .el-display-flex,.el-jc-space-between,.el-fd-column;
                    &-name {
                        color:$contentFooterNameColor;
                    }
                    &-date {
                        color:$contentFooterDateColor;
                        @include setComponent(margin-top,5,px);
                    }
                }
            }
        }
    }
    .#{$baseSelector}animated-bg {
        @include background($animatedBgColor);
        background: {
            size:percentage(2) percentage(1);
        }
        animation:bgPos 1.5s linear infinite;
        @keyframes bgPos {
            0% {
                background: {
                    position:percentage(.5) percentage(0);
                }
            }
            100% {
                background: {
                    position:percentage(-1.5) percentage(0);
                }
            }
        }
    }
    .#{$baseSelector}animated-bg-text {
        @include setComponent(border-radius,50,px);
        @extend .el-display-inline-block;
        @include setComponentPercent(width,100);
        @include setComponent(height,10,px);
    }
</style>