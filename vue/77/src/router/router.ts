
import {createRouter,createWebHashHistory, RouteRecordRaw} from 'vue-router'
import filterComponents,{ keys } from './import';

const routes: RouteRecordRaw [] = [
  {
    path: '/',
    redirect: '/BasicTable',
  },
]

for(const item of keys){
  routes.push({
    path:'/' + item,
    component: filterComponents[item]
  })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
export default router
