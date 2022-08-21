<script lang="ts" setup>
import { ref, onMounted, PropType, defineAsyncComponent } from "vue";
const AsyncLoader = defineAsyncComponent(() => import('./Loader.vue'))
const props = defineProps({
  src: String as PropType<string>,
  loadInitially: Boolean as PropType<boolean>,
  observerOptions: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({ root: null, rootMargin: "200px 0px" }),
  },
});
const imgRef = ref<HTMLImageElement>();
const isLoaded = ref(false);
const observerRef = ref<IntersectionObserver | null>(null);
const observerCallback: IntersectionObserverCallback = (entries) => {
  if (entries[0].isIntersecting) {
    observerRef.value?.disconnect();
    isLoaded.value = true;
  }
};
onMounted(() => {
  if (props.loadInitially) {
    return;
  }
  if ("loading" in HTMLImageElement.prototype) {
    isLoaded.value = true;
    return;
  }
  observerRef.value = new IntersectionObserver(
    observerCallback,
    props.observerOptions
  );
  observerRef.value.observe(imgRef.value as HTMLImageElement);
  return () => {
    observerRef.value?.disconnect();
  };
});
</script>
<template>
  <img
    :src="props.src"
    ref="imgRef"
    :loading="loadInitially ? undefined : 'lazy'"
    v-if="isLoaded"
  />
  <div class="mini-web-loader-container" v-else>
    <async-loader></async-loader>
  </div>
</template>
<style lang="less" scoped>
  .@{baseSelector}loader-container {
     display: flex;
     justify-content: center;
     align-items: center;
  }
</style>
