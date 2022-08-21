<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { BG_URL } from './utils/const';
export interface BoxItem {
  w: string;
  h: string;
  key: string;
}
const AsyncButton = defineAsyncComponent(() => import('@/components/Button.vue'));
const getBackgroundImage = computed(() => ({ backgroundImage: `url(${BG_URL})` }));
const boxList = ref<BoxItem[]>([]);
const isBig = ref(false);
onMounted(() => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      boxList.value.push({
        w: -j * 15 + 'vw',
        h: -i * 15 + 'vh',
        key: i + '-' + j
      })
    }
  }
})
</script>

<template>
  <async-button @click="isBig = !isBig"></async-button>
  <div class="bg-box-boxes" :class="{ 'big': isBig }">
    <div class="bg-box-boxes-box" v-for="item in boxList" :key="item.key"
      :style="{ backgroundPosition: `${item.w} ${item.h}`, ...getBackgroundImage }"></div>
  </div>
</template>

<style lang="scss">
$background: linear-gradient(135deg, #8a77f5 10%, #4d32e9 90%);
$boxBackground: linear-gradient(135deg, #4c4286 10%, #1a0688 90%);

* {
  @include setProperty(margin, 0);
  @include setProperty(padding, 0);
  @include setProperty(box-sizing, border-box);
}

body,
html {
  @include setProperty(background, $background);
  @include setProperty(overflow, hidden);
  @include setProperty(overflow-y, auto);
  @include setProperty(height, percentage(1));

  .app {
    @include setProperty(display, flex);
    @include setProperty(justify-content, center);
    @include setProperty(align-items, center);
    @include setProperty(flex-direction, column);
    @include setProperty(height, percentage(1));

    .#{$baseSelector}boxes {
      @include setProperty(display, flex);
      @include setProperty(justify-content, space-around);
      @include setProperty(flex-wrap, wrap);
      @include setProperty(width, 60vw);
      @include setProperty(height, 60vh);
      @include setProperty(position, relative);
      @include setProperty(transition, all .3s cubic-bezier(.11, .22, .33, 1));

      &.big {
        @include setProperty(width, 65vw);
        @include setProperty(height, 65vh);

        .#{$baseSelector}boxes-box {
          @include setProperty(transform, rotateZ(360deg));
        }
      }

      &-box {
        @include setProperty(width, 15vw);
        @include setProperty(height, 15vh);
        @include setProperty(position, relative);
        @include setProperty(transition, all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275));
        @include setProperty(background-size, 60vw 60vh);
        @include setProperty(background-repeat, no-repeat);

        &::before,
        &::after {
          @include setProperty(content, "");
          @include setProperty(position, absolute);
          @include setProperty(background, $boxBackground);
        }

        &::before {
          @include setProperty(width, percentage(1));
          @include setProperty(height, 2vh);
          @include setProperty(transform, skewX(45deg));
          @include setProperty(left, 8px);
          @include setProperty(bottom, -2vh);
        }

        &::after {
          @include setProperty(width, 2vh);
          @include setProperty(height, percentage(1));
          @include setProperty(transform, skewY(45deg));
          @include setProperty(right, -2vh);
          @include setProperty(top, 8px);
        }
      }
    }
  }
}
</style>
