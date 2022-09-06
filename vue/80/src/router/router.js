import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import { getLocalStorage } from '../utils/storage';

Vue.use(Router);

const router = new Router({
    // mode: "history",
    routes: routes
});
const originPush = Router.prototype.push;
const originReplace = Router.prototype.replace;
Router.prototype.push = function (location) {
    return originPush.call(this, location).catch(error => error);
}
Router.prototype.replace = function (location) {
    return originReplace.call(this, location).catch(error => error);
}
router.beforeEach((to, from, next) => {
    if (to.path.slice(1) === 'login') {
        next();
    } else {
        const userInfo = getLocalStorage('userInfo');
        if (!userInfo || !userInfo.token) {
            next("/login");
        } else {
            next();
        }
    }
})
export default router;