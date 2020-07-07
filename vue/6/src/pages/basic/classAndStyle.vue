<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<h2 class="section_h2">#app-1：根据数据的布尔值添加class</h2>
					<p :class="{'text-red':statusTrue, 'fz-34':statusTrue, 'text-underline':statusTrue}">红色的34像素字体，带下划线的段落</p>
					<p :class="{'text-red':statusTrue, 'fz-34':statusFalse, 'text-underline':statusFalse}">红色字体的段落</p>
					<p :class="{'text-red':statusFalse, 'fz-34':statusFalse, 'text-underline':statusFalse}">使用默认样式的段落</p>
				</section>
				<section id="app-2">
					<h2 class="section_h2">#app-2：通过视图模型里的数据对象添加class</h2>
					<p :class="styleObject" @click="switchClass" style="cursor:pointer;">本段落的class是通过数据定义的，所以不需要花括号</p>
					<p>这样就可以修改“app2.styleObject["fz-26"]”等“class”（其实是属性）的布尔值来动态添加/移除class了</p>
					<p>在控制台中输入“app2.styleObject["text-blue"] = false”观察效果</p>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-3：通过切换class绑定的布尔值添加/移除样式</h2>
					<div class="hobbyList">
						<ul>
							<template  v-for="(hobby, index) in hobbyList">
								<li :class="{active:hobby.activeStatus}" @click="toggleClass(index)" :key="index">{{hobby.buttonName}}</li>
							</template>
						</ul>
					</div>
				</section>
				<section id="app-4">
					<h2 class="section_h2">#app-4：通过计算属性设置class</h2>
					<div :class="successClass">{{stateText.success}}</div>
					<div :class="failClass">{{stateText.fail}}</div>
				</section>
				<section id="app-5">
					<h2 class="section_h2">#app-5：通过数组设置class</h2>
					<div :class="[red,fz,fs]">样式组合一</div>
					<div :class="[fz,fs]">样式组合二</div>
					<div :class="[red]">样式组合三</div>
					<h3 class="section_h3">通过数组内的三元表达式添加class：</h3>
					<div :class="[ 5 === 5 ? red : '' ,fz]">使用红色的22像素字体（全部执行）</div>
					<div :class="[ 5 !== 5 ? red : '' ,fz]">使用红色的22像素字体（只执行字体大小）</div>
					<h3 class="section_h3">通过数组+对象添加class：</h3>
					<div :class="[{'text-blue': yes}, fs]">使用蓝色的斜体字体（全部执行）</div>
					<div :class="[{'text-blue': no}, fs]">使用蓝色的斜体字体（只执行斜体）</div>
				</section>
				<section id="app-6">
					<h2 class="section_h2">#app-6：在组件上设置class</h2>
					<test-class class="text-underline" :prop="prop1"></test-class>
					<test-class class="fs-italic" :prop="prop2"></test-class>
					<test-class class="text-fail" :prop="prop3"></test-class>
			</section>
			</article>
		</main>
	</div>
</template>
<script>
	export default{
		name:'rendering',
		data(){
			return{
				Title:'Vueclass和style绑定',
				statusTrue: true,
				statusFalse: false,
				styleObject: {
					'fz-26': true,
					'text-blue': true,
					'text-underline': false
				},
				hobbyList: [
					{ buttonName: '编程', activeStatus: true },
					{ buttonName: '游戏', activeStatus: true },
					{ buttonName: '看书', activeStatus: false },
					{ buttonName: '美食', activeStatus: true },
					{ buttonName: '运动', activeStatus: false },
					{ buttonName: '电影', activeStatus: true }
				],
				stateText: {
					success: '成功',
					fail: '失败'
				},
				toggle: true,
				status: 'ok',
				header: null,
				red: 'text-red',
				blue: 'text-blue',
				fz: 'fz-22',
				fs: 'fs-italic',
				yes: true,
				no: false,
				prop1:'prop1',
				prop2:'prop2',
				prop3:'prop3'
			}
		},
		components:{
			'test-class':{
				props: ['prop'],
				template: '<p class="text-success">测试组件挂载class，及样式优先级</p>'
			}
		},
		computed:{
			successClass:function(){
				return {
					'border-success': this.toggle && this.status && !this.header,
					'text-success': this.toggle === true && this.status === 'ok' && this.header === null
				}
			},
			failClass:function(index){
				return {
					'border-success': !this.toggle && !this.status  && this.header,
					'text-success': this.toggle === false && this.status === 'fail' &&  this.header !== null,
					'border-fail': 2 > 3 || 5 > 3,
					'text-fail': true,
					'mt-10': 53 + 47 === 100
				}
			}
		},
		methods:{
			switchClass:function(){
				if(this.styleObject['fz-26'] === true){
					alert('点击移除了字体大小样式,所以字体变小了!');
					this.styleObject['fz-26'] = false;
				}else{
					alert('点击添加了字体大小样式,所以字体变大了!');
					this.styleObject['fz-26'] = true;
				}
			},
			toggleClass(index){
				this.hobbyList[index].activeStatus = !this.hobbyList[index].activeStatus;
			}
		}
	}
</script>
<style scoped>
.text-red {
	color: #ff0000;
}
.text-green {
	color: #00ff00;
}
.text-blue {
	color: #0000ff;
}
.fz-22 {
	font-size: 22px;
}
.fz-26 {
	font-size: 26px;
}
.fz-34 {
	font-size: 34px;
}
.text-underline {
	text-decoration: underline;
}
.text-success {
	color: #22c847;
}
.text-fail {
	color: #bf5253;
}
.text-red {
	color: #ff0000;
}
.text-blue {
	color: #0000ff;
}
.fs-italic {
	font-style: italic;
}
.border-success {
	border: 2px solid #22d44a;
	border-radius: 15px;
	padding: 10px;
}
.border-fail {
	border: 2px solid #d45859;
	border-radius: 15px;
	padding: 10px;
}
/* 爱好选择 */
.hobbyList ul {
	margin: 0;
	padding: 0;
	overflow: hidden;
	list-style: none;
}
.hobbyList ul li {
	padding: 6px 20px;
	color: #555555;
	float: left;
	cursor: pointer;
	user-select: none;
	margin-right: 20px;
}
.hobbyList ul li:hover {
	color: #627686;
	text-decoration: underline;
}
.hobbyList ul li.active {
	background-color: #2a77c6;
	border-radius: 5px;
	text-decoration: none;
	color: #ffffff;
}
</style>