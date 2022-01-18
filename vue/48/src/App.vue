<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, defineAsyncComponent, ref } from 'vue';
import { imageURL,contentURL,articleTitles,marked } from './utils/utils';
interface ArticleType {
   status:string;
   value:string;
}
const AsyncHeader = defineAsyncComponent(() => import("@/components/Header.vue"));
const AsyncTitle = defineAsyncComponent(() => import("@/components/Title.vue"));
const introBgImage = computed(() => `url(${ imageURL })`);
const request = async (url:string) => {
    const res = await fetch(url);
    const data = await res.text();
    return data;
}
const articles = ref<Array<{ title:string,content:string }>>([]);
const active = ref(false);
Promise.allSettled([request(contentURL + "1.md"),request(contentURL + "2.md")]).then(res => {
   articles.value = res.map((item:Partial<ArticleType>,index) => ({ title:articleTitles[index],content:marked(item.value as string).replace(/\<p(.*?)\>/g,"<p class='sn-main-content-message-item'>") }))
});
const onScrollHandler = (e:Event) => {
    const { scrollTop } = e.target as HTMLElement;
    const { offsetHeight } = document.querySelector(".sn-header") as HTMLHeadElement;
    active.value = !!(scrollTop >= (offsetHeight + 100));
}
</script>

<template>
    <async-header :active="active"></async-header>
    <main class="sn-main" @scroll="onScrollHandler">
        <section class="sn-main-intro">
           <div class="sn-container">
              <async-title class="sn-main-intro-title">欢迎来到我的个人网站</async-title>
              <p class="sn-main-intro-content">总把自己当作一朵花，其实自己什么也不是。当你觉得自己就是一朵花时，问问自己有开出美丽的芬芳吗？</p>
              <p class="sn-main-intro-content">总把自己当作一盏灯，其实自己什么也不是。当你觉得自己就是一盏灯时，问问自己有没有照出一席光明？</p>
           </div>
        </section>
        <section class="sn-main-content sn-container">
            <template v-for="(article,index) in articles" :key="article.title + index">
                <async-title level="2" class="sn-main-content-title">{{ article.title }}</async-title>
                <article v-html="article.content" class="sn-main-content-message"></article>
            </template>
        </section>
    </main>
</template>

<style lang="scss">
body {
  @extend .reset,.over-hidden;
  color:$white;
  * {
     box-sizing: border-box;
     @extend .reset;
  }
  .app {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .#{$baseSelector}container {
        @include setComponent(max-width,1200,px);
        @include setComponent(padding,15,px);
        @extend .margin-center;
    }
    .#{$baseSelector}main {
        @include setComponent(height,100,vh);
        @include setComponentPercent(width,100);
        @extend .over-x-hidden,.over-y-auto;
        &-intro {
           @include setComponent(height,100,vh);
           background: {
              image:v-bind(introBgImage);
              repeat:no-repeat;
              size:cover;
              position: $center;
           };
           
           @extend .flex-center,.el-text-center,.el-pos-r;
           @include setComponent(margin-bottom,1,rem);
           @include setComponentIndex(-2);
           &-title {
              @include setComponent(margin-bottom,15,px);
              @include setComponent(letter-spacing,1,px);
              font: {
                family:"宋体","楷体";
              }
           }
           &-content {
              @include setComponent(line-height,1.5,null);
              @include setComponent(margin-bottom,15,px);
           }
        }
        &-content {
          &-title {
              @include setComponent(font-size,percentage(1.6),null);
              @include setComponent(letter-spacing,1.3,px);
              counter-increment: articleOrder;
              color:adjust-color($black,$alpha: -0.4);
              &::before {
                 content:counter(articleOrder);
                 @extend .el-display-inline-block,.el-text-center;
                 @include setComponent(width,35,px);
                 @include setComponent(height,35,px);
                 @include setComponent(line-height,35,px);
                 @include setComponent(font-size,18,px);
                 @include setComponent(margin-right,.4,rem);
                 @include background($orderBgColor);
                 @include setComponentPercent(border-radius,50);
                 color:$white;
                 vertical-align: top;
              }
          }
          &-message {
             @include setComponent(margin-top,1.2,rem);
             @include setComponent(margin-bottom,1.2,rem);
             &-item {
                @include setComponent(text-indent,2,em);
                @include setComponent(line-height,1.8,null);
                @include setComponent(margin-bottom,5,px);
                color:darken($contentColor, 0.5);
             }
          }
        }
    }
  }
  ::-webkit-scrollbar {
    @include setComponent(width,10,px);
    @include setComponent(height,10,px);
    @include background(linear-gradient(135deg,#746ce9 10%,#231fe4 90%));
  }
  ::-webkit-scrollbar-thumb {
    @include setComponent(width,5,px);
    @include setComponent(height,5,px);
    @include background(linear-gradient(135deg,#bebaf5 10%,#706fd3 90%));
  }
}
</style>
