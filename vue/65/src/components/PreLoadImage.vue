<script lang="ts" setup>
import { ref, onMounted, PropType, defineAsyncComponent, onUnmounted, watch, nextTick } from "vue";
const AsyncLoader = defineAsyncComponent(() => import('./Loader.vue'))
const props = defineProps({
  src: String as PropType<string>
});
const isLoaded = ref(false);
const imgRef = ref<HTMLImageElement>();
const createImage = (src: string) => {
  imgRef.value = new Image();
    imgRef.value.src = src;
    imgRef.value.onload = () => {
       isLoaded.value = true;
    }
}
onMounted(() => {
  if (props.src) {
    createImage(props.src);
  }
});
onUnmounted(() => {
  imgRef.value = undefined;
});
watch(() => props.src,(val) => {
   nextTick(() => {
     createImage(val as string);
   })
})
</script>
<template>
  <img :src="isLoaded ? props.src : ''" v-if="isLoaded" />
  <div class="luf-loader-container" v-else>
    <async-loader></async-loader>
  </div>
</template>
<style lang="scss" scoped>
.#{$baseSelector}loader-container {
  @include setProperty(display, flex);
  @include setProperty(justify-content, center);
  @include setProperty(align-items, center);
}
</style>
