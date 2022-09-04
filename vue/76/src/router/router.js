import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/first',
  },
  {
    path: '/first',
    component: () => import('@/views/table-view-first.vue'),
  },
  {
    path: '/second',
    component: () => import('@/views/table-view-second.vue'),
  },
  {
    path: '/third',
    component: () => import('@/views/table-view-third.vue'),
  },
  {
    path: '/fourth',
    component: () => import('@/views/table-view-fourth.vue'),
  },
  {
    path: '/fifth',
    component: () => import('@/views/table-view-fifth.vue'),
  },
  {
    path: '/six',
    component: () => import('@/views/table-view-six.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
export default router
