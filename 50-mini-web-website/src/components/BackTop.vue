<script setup lang="ts">
import { computed,onBeforeMount,onMounted,PropType,Ref,ref } from "vue";
import { on,off,requestAnimationFrame,easeInOutCubic,debounce, ElementType } from "../utils/util";
import LinkIcon from "./LinkIcon";
const props = defineProps({
    target: String as PropType<string>,
    right: {
      type: Number as PropType<number>,
      default: 15,
    },
    bottom: {
      type: Number as PropType<number>,
      default: 28,
    },
    visibilityHeight: {
      type: Number as PropType<number>,
      default: 200,
    }
});
const emit = defineEmits(["on-top"]);
const styleRight = computed(() => `${props.right}px`);
const styleBottom = computed(() => `${props.bottom}px`);
const el:Ref<ElementType> = ref(null);
const container:Ref<ElementType> = ref(null);
const visible = ref(false);
const scrollHandler = () => {
  visible.value = (el.value as HTMLDivElement).scrollTop >= props.visibilityHeight;
};
const scrollTop = (time: number) => {
  const beginTime = Date.now();
  const beginValue = (el.value as HTMLDivElement).scrollTop;
  const handler = () => {
    const progress = (Date.now() - beginTime) / time;
    if (progress < 1) {
      (el.value as HTMLDivElement).scrollTop = beginValue * (1 - easeInOutCubic(progress));
      requestAnimationFrame(handler);
    } else {
      (el.value as HTMLDivElement).scrollTop = 0;
    }
  };
  requestAnimationFrame(handler);
};
const onClickHandler = () => {
    scrollTop(500);
    emit("on-top");
};
onBeforeMount(() =>
  off(container.value, "scroll", debounce(scrollHandler, 300))
);
onMounted(() => {
  container.value = document;
  el.value = document.documentElement || document.body;
  if (props.target) {
    el.value = document.querySelector(props.target) as ElementType;
    if (!(el.value as HTMLDivElement)) {
        throw new Error(`Can not find the target element:${props.target}`);
    }
    container.value = (el.value as HTMLDivElement);
  }
  on(container.value, "scroll", debounce(scrollHandler, 300));
});
</script>
<template>
    <div
    class="mini-web-back-top"
    :class="visible ? 'show' : 'hidden'"
    :style="{ right: styleRight, bottom: styleBottom }"
    @click="onClickHandler"
  >
    <slot><link-icon type="backTopProp"></link-icon></slot>
  </div>
</template>
<style lang="less" scoped>
    .@{baseSelector}back-top {
        position: extract(@position,length(@position));
        z-index: pow(10,3);
        cursor: extract(@cursor,@full);
        transition: all convert(pow(10,2) * 4ms,"s") ease-in-out;
        &.show {
          transform: scale(@full + .1) translateY(@none);
        }
        &:hover,&:active {
            transform: scale(@full + .4);
        }
        &.hidden {
         transform: scale(@none) translateY(percentage(@full));
        }
    }
</style>