<script lang="ts" setup>
import { ref, onMounted, PropType } from "vue";
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
    :src="isLoaded ? props.src : ''"
    ref="imgRef"
    :loading="loadInitially ? undefined : 'lazy'"
  />
</template>
