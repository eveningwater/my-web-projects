/**
 * 功能：Vue路由基础
 * 日期：2017/9/25
 **/

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Home = {
	template: '<div class="bg-primary">这是网站首页的内容</div>'
};
const Product = {
	template: '<div class="bg-success">这是产品介绍的内容</div>'
};
const Service = {
	template: '<div class="bg-info">这是服务支持的内容</div>'
};
const About = {
	template: '<div class="bg-warning">这是关于我们的内容</div>'
};

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
const routes = [
	{ path: '/home', component: Home },
	{ path: '/product', component: Product },
	{ path: '/service', component: Service },
	{ path: '/about', component: About }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
	routes // （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
	router
}).$mount('#app');