<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1" class="app-1" @click="modifContent">
					<h2 class="section_h2">#app-1:</h2>
					<p ref="content" v-once>{{maincontent.content}}</p>
					<p ref="content">{{maincontent.content}}</p>
				</section>
				<section id="app-2">
					<h2 class="section_h2">#app-2:</h2>
					<p>{{maincontent.content1}}</p>
					<p v-html="maincontent.content2"></p>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-3:</h2>
					<p v-html="maincontent.content3"></p>
					<p>{{maincontent.content4}}</p>
					<p v-html="maincontent.content5"></p>
				</section>
				<section id="app-4">
					<h2 class="section_h2">#app-4:</h2>
					<p>
						<button id="app-4-btn1" type="button" v-bind:disabled="state" class="btn btn-default" v-on:click="btn1Fun" ref="btn1">被操作状态的按钮</button>
						<button id="app-4-btn2" type="button" class="btn btn-info" @click="btn2Fun">激活按钮</button>
						<button id="app-4-btn3" type="button" class="btn btn-warning" @click="btn3Fun">禁用按钮</button>
					</p>
				</section>
				<section id="app-5">
					<h2 class="section_h2">#app-5:</h2>
					<p>Vue供了完全的JavaScript表达式支持，如下：</p>
					<p>{{maincontent.total / 8}}</p>
					<p>{{maincontent.state === true ? '开启状态' : '关闭状态'}}</p>
					<p>{{maincontent.state !== true ? '开启状态' : '关闭状态'}}</p>
					<p>{{maincontent.skillArr[2]}}</p>
					<p v-html="(maincontent.total + 200) + maincontent.obj.count+ '<span style=\'color:#d01515;font:28px 方正兰亭;\'>'+ maincontent.obj.personName+'</span>'"></p>
				</section>
				<section id="app-6">
					<h2 class="section_h2">#app-6:</h2>
					<p>
						<input v-model="maincontent.select" type="radio" value="男" />
						<label>男</label>	
						<input v-model="maincontent.select" type="radio" value="女" />
						<label>女</label>
						<input v-model="maincontent.select" type="radio" value="保密" />
						<label>保密</label>
					</p>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	export default{
		name:'templateVue',
		data(){
			return{
				Title:'Vue模版语法',
				state:true,
				maincontent:{
					content:'一次性插值的内容，数据更新不会影响插值的节点',
					content1:'<span style="color: #2397ec">正常的文本内容</span>',
					content2:'<span style="color: #2397ec">能显示HTML的内容，注意写法</span>',
					content3: 'Mustache不能在HTML属性中使用，应使用v-bind(v-bind可省略成:)指令。Mustache语法如下：',
					content4: '$("#content").html(Mustache.render("{{title}} spends {{cacl}}", view);',
					content5: '也就是说双花括符“{{}}”的写法不能用于属性',
					total:800,
					state:true,
					skillArr:['angularjs','react','vue'],
					obj:{
						count:'个',
						personName:'委身于鬼,十张嘴也说不清楚(猜谜语啦)!'
					},
					select:''
				}
			}
		},
		methods:{
			modifContent:function(){
				this.$refs.content.textContent = '修改后的内容'
			},
			btn1Fun:function(){
				alert('点击我没用,点击另外两个按钮改变我这个按钮的激活与不激活状态,激活我才可以被点击,没激活就不能点击我!')
			},
			btn2Fun:function(){
				this.state = false;
			},
			btn3Fun:function(){
				this.state = true;
			}
		}
	}
</script>
<style scoped>
	.app-1{
		cursor:pointer;
	}
	#app-6 p label{
		color:#2397ec;
	}
	#app-6 p input{
		cursor:pointer;
	}
</style>