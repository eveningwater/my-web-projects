<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<p>{{ maincontent.message }}</p>
				</section>
				<section  v-bind:title="maincontent.title" id="app-2">
					<h2 class="section_h2">#app-2：</h2>
					<p>将鼠标移过来</p>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-3</h2>
					<p v-if="maincontent.show">我是会显示出来</p>
					<p v-if="maincontent.hide">#我不会显示出来</p>
				</section>
				<section id="app-4">
					<h2 class="section_h2">#app-4</h2>
					<ul>
						<li v-for="car in maincontent.carInfo" :key="car.id">
							{{car.name + '的售价为：￥' + car.price}}
						</li>
					</ul>
				</section>
				<section id="app-5">
					<h2 class="section_h2">#app-5</h2>
					<p ref="content">{{maincontent.content}}</p>
					<button v-on:click="addText" class="btn btn-default">添加文本内容</button>
				</section>
				<section id="app-6">
					<h2 class="section_h2">#app-6</h2>
					<input v-model="maincontent.text" type="text" class="form-control">
					<span class="text-sucess">{{maincontent.text}}</span>
				</section>
				<section id="app-7">
					<h2 class="section_h2">#app-7</h2>
					<a v-bind:href="maincontent.url">{{maincontent.aClickContent}}</a>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	export default{
		name:'basic',
		data(){
			return{
				Title:'Vue基础原理',
				maincontent:{
					message: '#app-1：这是我希望在该标签输出的内容',
					title:'#app-2：鼠标悬浮提示文本',
					show: true,
					hide: false,
					carInfo:[
						{
							name:'柯尼塞格one1',
							price:'999999999'
						},
						{
							name:'LykanHypersport',
							price:'90000000'
						},
						{
							name:'迈巴赫exelero',
							price:'60000000'
						},
						{
							name:'西尔贝',
							price:'50000000'
						},
						{
							name:'阿斯顿马丁one',
							price:'47000000'
						}
					],
					content:'#app-5：原来的文本内容。',
					text:'数据双向绑定',
					aClickContent:'页面跳转到百度',
					url:'https://www.baidu.com/'
				}
			}
		},
		methods:{
			addText:function(){
				this.$refs.content.textContent += '新增的文本内容'
			}
		}
	}
</script>
<style scoped>
	#app-6 input[type='text'] {
		width: 360px;
		height: auto;
		font-size: 22px;
		display: inline-block;
		padding: 6px 8px;
	}
</style>