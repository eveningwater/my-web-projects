<template>
	<div>
		<h1>
			<img src="../../assets/logo.png" style="width:48px;height:48px;" alt="图片记载中" title="vue-logo"/>
			{{basicTitle}}
		</h1>
		<main>
			<ul class="list-group">
				<li class="list-group-item" v-for="(info,index) in basicData" :key="index">
					<i class='vue-icon'></i>
					<router-link :to="{ path: '/' + info.link }" @click.native="sendBasicTitle(index)">{{info.dataTitle}}</router-link>
				</li>
			</ul>
		</main>
		<h1>
			<img src="../../assets/logo.png" style="width:48px;height:48px;" alt="图片记载中" title="vue-logo"/>
			{{progressTitle}}
		</h1>
		<main>
			<ul class="list-group">
				<li class="list-group-item" v-for="(info,index) in progressData" :key="index">
					<i class='vue-icon'></i>
					<router-link :to="{ path: '/' + info.link }" @click.native="sendProgressTitle(index)">{{info.dataTitle}}</router-link>
				</li>
			</ul>
		</main>
		<h1>
			<img src="../../assets/logo.png" style="width:48px;height:48px;" alt="图片记载中" title="vue-logo"/>
			{{highTitle}}
		</h1>
		<main>
			<ul class="list-group">
				<li class="list-group-item" v-for="(info,index) in highData" :key="index">
					<i class='vue-icon'></i>
					<router-link :to="{ path: '/' + info.link }" @click.native="sendHighTitle(index)">{{info.dataTitle}}</router-link>
				</li>
			</ul>
		</main>
		<footer>
			<p style="width:100%;height:auto;line-height:34px;display:inline-block;">
				<span style="float:left;">如有疑问发送邮件:</span>
				<a :href="contact" style="float:left;">854806732@qq.com</a>
				<a :href="hrefGit" style="float:right;">本项目Github地址</a>
			</p>
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return{
				basicTitle:'Vue实例演示索引--基础篇',
				progressTitle:'Vue实例演示索引--进阶篇',
				highTitle:'Vue实例演示索引--高阶篇',
				basicData:[
					{ link:'basic',dataTitle:'Vue基础原理' },
					{ link:'component',dataTitle:'Vue组件基础' },
					{ link:'constructor',dataTitle:'Vue构造实例' },
					{ link:'template',dataTitle:'Vue模版语法' },
					{ link:'filter',dataTitle:'Vue过滤器' },
					{ link:'computed',dataTitle:'Vue计算属性' },
					{ link:'rendering',dataTitle:'Vue渲染方式' },
					{ link:'classandstyle',dataTitle:'Vueclass和style绑定' },
					{ link:'base-demo',dataTitle:'Vue基础总结练习' }
				],
				progressData:[
					{ link:'component-levup',dataTitle:'Vue组件进阶'},
					{ link:'router-levup',dataTitle:'Vue路由'}
				],
				highData:[
					{ link:'vuecli-high',dataTitle:'Vue-cli模板'}
				],
				hrefGit:'https://github.com/eveningwater/vue-master',
				contact:'mailto:854806732@qq.com'
			}
		},
		methods:{
			sendBasicTitle:function(index){
				let headerTitle = this.basicData[index].dataTitle;
				this.$store.state.basicTitle = headerTitle;
				sessionStorage.setItem('basicTitle',headerTitle);
			},
			sendProgressTitle:function(index){
				let headerTitle = this.progressData[index].dataTitle;
				this.$store.state.progressTitle = headerTitle;
				sessionStorage.setItem('progressTitle',headerTitle);
			},
			sendHighTitle:function(index){
				let headerTitle = this.highData[index].dataTitle;
				this.$store.state.highTitle = headerTitle;
				sessionStorage.setItem('highTitle',headerTitle);
			}
		}
	}
</script>

<style scoped>
	h1{
		text-align:center;
		margin-bottom:20px;
		color:#35495e;
	}
	footer{
		width:100%;
		position:fixed;
		height:34px;
		bottom:0px;
		font-size:12px;
	}
</style>