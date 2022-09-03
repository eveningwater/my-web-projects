import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/first",
  },
  {
    path: "/first",
    component: () => import("@/views/table-view-first.vue"),
  },
  {
    path: "/second",
    component: () => import("@/views/table-view-second.vue"),
  },
  {
    path: "/third",
    component: () => import("@/views/table-view-third.vue"),
  },
  {
    path: "/fourth",
    component: () => import("@/views/table-view-fourth.vue"),
  },
  {
    path: "/fifth",
    component: () => import("@/views/table-view-fifth.vue"),
  },
  {
    path: "/six",
    component: () => import("@/views/table-view-six.vue"),
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  // mode:"history",
  routes,
});
export default router;
