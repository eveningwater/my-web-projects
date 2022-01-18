<template>
    <header class="sn-header" :class="{ 'active':props.active }">
        <div class="sn-header-container sn-container">
            <transition name="fade">
                <async-icon type="menu" v-if="showMenu" class="sn-header-container-menu el-pos-a el-cursor-pointer" @click="navActive =!navActive"></async-icon>
            </transition>
            <async-title level="1" class="sn-header-container-title">
                <a href="https://www.eveningwater.com/" target="_blank" rel="noopener noreferrer" class="sn-link">个人网页</a>
            </async-title>
            <ul class="sn-header-container-nav-list" :class="{ 'sn-header-container-nav-list-mobile':showMenu,'show':navActive }">
                <li v-for="(nav,index) in navList" :key="nav.url + index" :class="{ 'sn-header-container-nav-list-item':showMenu }">
                    <a :href="nav.url" target="_blank" rel="noopener noreferrer" v-text="nav.text" class="sn-link"></a>
                </li>
            </ul>
        </div>
    </header>
</template>
<script lang="ts" setup>
    import { defineAsyncComponent, onMounted, ref } from 'vue';
    const AsyncIcon = defineAsyncComponent(() => import("@/components/Icon.vue"));
    const AsyncTitle = defineAsyncComponent(() => import("@/components/Title.vue"));
    const navActive = ref(false);
    const showMenu = ref(false);
    const props = defineProps({
         active:{
             type:Boolean,
             default:false
         }
    })
    const navList = ref<Array<{url:string,text:string}>>([
        {
            url: "https://www.eveningwater.com/my-web-projects/home/",
            text: "项目"
        },
        {
            url: "https://eveningwater.github.io/#/",
            text: "博客"
        },
        {
            url: "https://www.eveningwater.com/vue-resume/vue3.0/",
            text: "关于我"
        },
        {
            url: "https://github.com/eveningwater/",
            text: "源码仓库"
        }
    ]);
    const isShowMenu = () => showMenu.value = !!(window.innerWidth <= 400);
    const onResizeHandler = () => isShowMenu();
    onMounted(() => {
        isShowMenu();
        window.addEventListener("resize",onResizeHandler)
    });
</script>
<style scoped lang="scss">
    .#{$baseSelector}header {
        .#{$baseSelector}link {
            color:$white;
            &:hover {
                color:$linkHoverColor;
            }
        }
        @include setComponentPercent(width,100);
        @include setComponent(top,0,null);
        @include setComponent(left,0,null);
        @include setComponent(right,0,null);
        box-shadow: 1px 3px 12px $headerBoxShadowColor;
        @include background($headerBgColor);
        @extend .el-pos-f;
        &.active {
            box-shadow: 1px 3px 12px $headerBoxShadowActiveColor;
            @include background($headerBgActiveColor);
        }
        &-container {
            @include setComponent(padding,20,px);
            @extend .el-display-flex,.el-jc-space-between,.el-ai-center;
            &-nav-list {
                list-style: none;
                @extend .flex-center;
                .#{$baseSelector}link {
                    @include setComponent(margin,0.4,em);
                }
                &-item {
                    @include setComponent(margin-bottom,10,px);
                }
            }
            &-nav-list-mobile {
                 @include background($headerBgColor);
                 @extend .over-x-hidden,.over-y-auto,.el-pos-a,.el-display-none;
                 @include setComponent(top,60,px);
                 @include setComponent(height,200,px);
                 @include setComponentPercent(width,100);
                 @include setComponent(left,0,null);
                 @include setComponent(padding,20,px);
                 &.show {
                     @extend .el-display-block;
                 }
            }
            &-title {
                @include setComponent(font-size,25,px);
                @include setComponent(letter-spacing,1,px);
            }
        }
        @media screen and(max-width: 400px) {
            &-container {
                &-menu {
                    @include setComponent(right,15,px);
                }
            }
        }
    }
</style>