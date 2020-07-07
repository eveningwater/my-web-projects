<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<h2 class="section_h2">#app-1:{{ routerTitle }}</h2>
					<a :href='link'>{{message}}</a>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	export default{
		name:'routerLevup',
		data(){
			return{
				Title:'Vue路由',
				routerTitle:'其实本项目就是用的路由管理的页面,所以也算是进阶了,当然接下来我给大家展示的是引用式路由管理页面.请点击以下按钮前往:',
				message:'路由',
				link:'https://www.eveningwater.com/my-web-projects/vue/6/vuerouter/router.html'
			}
		}
	}
</script>
<style scoped>
</style>