import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
    { path: '/', name: "index", component: () => import("../components/List/List.vue") },
    { path: '/detail/:uuid', name: "detail", component: () => import("../components/Detail/Detail.vue") },
    { path: '/*', name: 'error', component: () => import("../components/Error/Error.vue") },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    if (to.matched.length === 0) { // 没有匹配到路由则跳转到404页面
        next({ name: 'error' });
    } else {
        next(); // 正常跳转到相应路由
    }
});

export default router;