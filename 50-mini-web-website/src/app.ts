import { defineAsyncComponent } from "@vue/runtime-core";

export const AsyncSelect = defineAsyncComponent(() => import("./components/Select.vue"));
export const AsyncOption = defineAsyncComponent(() => import("./components/Option.vue"));
export const AsyncCard = defineAsyncComponent(() => import("./components/Card.vue"));
export const AsyncLinkIcon = defineAsyncComponent(() => import("./components/LinkIcon"));
export const AsyncTab = defineAsyncComponent(() => import("./components/Lang.vue"));
export const AsyncTitle = defineAsyncComponent(() => import("./components/Title"));
export const AsyncBackTop = defineAsyncComponent(() => import("./components/BackTop.vue"));
export const AsyncFooter = defineAsyncComponent(() => import("./components/Footer.vue"));