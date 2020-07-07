<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<h2 class="section_h2">#app-1:{{ firstTitle }}</h2>
					<h3 class="section_h3">1:打开windows的cmd窗口,输入以下命令:</h3>
					<p>(1)首先需要全局安装vue-cli:{{ commandFirst }}</p>
					<p>(2)安装完成后初始化项目:{{ commandSecond }}</p>
					<p>
						(3)按照以下的命令:{{ commandThird }}<br/>
						<img src="../../assets/commond1.png" alt="图片加载中" title="commond"/>
						<span class="notice">值得注意的是有几项:</span><br/>
						{{vueRouter}}<br/>
						{{eslint}}<br/>
						{{test}}<br/>
						<img src="../../assets/commond2.png" alt="图片加载中" title="commond"><br/>
						{{start}}
					</p>
					<p>
						(4)其实严格说来,你的项目就已经搭建好了,如果期间没有报错,什么的,项目应该正常运行,然后你就会看到如下:<br/>
						<span class="demo-info">{{ demoInfo }}</span>
						<img src="../../assets/demo-structor.png" alt="图片加载中" title="vue-demo"><br/>
						<span class="demo-info">{{ demoRun }}</span>
						<img src="../../assets/demo-start.png" alt="图片加载中" title="vue-demo"><br/>
						<span class="demo-info">{{updateCode}}</span><br/>
						<img src="../../assets/demo-update.png" alt="图片加载中" title="vue-demo"><br/>
						<span class="demo-info">{{updateRunCode}}</span><br/>
						<img src="../../assets/demo-update-run.png" alt="图片加载中" title="vue-demo"><br/>
					</p>
					<p>{{ finish }}</p>
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
				Title:'Vue-cli模板创建',
				firstTitle:'详细步骤',
				commandFirst:'npm install vue-cli -g',
				commandSecond:'vue init webpack vue-demo ("项目名",比如说:"vue-demo")',
				commandThird:'直接默认按enter键就好!按照上面提示的,Y即yes,N即no,就是选与不选,默认enter当然是选.',
				vueRouter:'路由(router)部分可选可不选,看你的项目用得到不!',
				eslint:'eslint这个依赖尽量不选,因为它会规范你的代码格式,比如空格,我们知道在写代码都喜欢加空格,如果加上了这个依赖,那么你在代码当中如果加空格符或者其它都会抱错,如果是比较严格的项目,那还可以加上!',
				test:'当然还有test,这个是用来测试的,,一般都不用选.',
				start:'看到to get started了吧,按照上面的三步走就是了,第一个就是跳转到目录,第二个安装依赖,第三个就是在本地搭建服务器运行.',
				demoInfo:'a.项目结构如下:',
				demoRun:'b.npm run dev即项目运行后如下:',
				updateCode:'c.然后我们只需要修改src目录下的hello.vue或者app.vue的代码,app.vue相当于主页面,hello.vue相当于子页面,修改hello.vue里面的代码:',
				updateRunCode:'d.修改后的效果如下图:',
				finish:'修改完成,接下来就是完全的用vue-cli模板写项目了,具体自己学习写,这里就不一一赘述了,建议可以把本项目的所有案例都写一遍,这样你的vue就算合格了,最后祝大家学习愉快(●ˇ∀ˇ●)!对了,提示大家:npm run build是打包上线的命令,到时候上线只需要把打包出来的dist文件夹里面的文件全部提交服务器上去就行了.'
			}
		}
	}
</script>
<style scoped>
	.section_h3{
		margin-top:5px;
	}
	#app-1 p{
		font:normal 16px "幼圆";
		margin-top:15px;
		line-height: 28px;
	}
	#app-1 p img{
		width:100%;
		height:auto;
		display:inline-block;
		border:1px solid;
		border-radius:5px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	#app-1 p span.notice{
		color:#d41515;
		font-size:25px;
		padding: 8px 0;
	}
	#app-1 p span.demo-info{
		color:#5f5a5a;
		font-weight:400;
		font-size:18px;
		margin:15px;
	}
</style>