import Home from '../views/Home.vue';
const routes = [
    {
        path:"/login",
        component:() => import(/* webpackChunkName: "login" */ "../views/Login.vue")
    },
    {
        path:"/",
        component:Home
    }
];
export default routes;