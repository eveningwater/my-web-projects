import { defineAsyncComponent } from "vue";

const AsyncContent = defineAsyncComponent(() => import('@/components/Content.vue'));
const AsyncOrder = defineAsyncComponent(() => import('@/components/Order.vue'));
const AsyncProgressBar = defineAsyncComponent(() => import('@/components/ProgressBar.vue'));
const AsyncQuote = defineAsyncComponent(() => import('@/components/Quote.vue'));
const AsyncUser = defineAsyncComponent(() => import('@/components/User.vue'));

export  {
    AsyncContent,
    AsyncOrder,
    AsyncProgressBar,
    AsyncQuote,
    AsyncUser
}