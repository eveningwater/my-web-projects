<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<h2 class="section_h2">#app-1：通过该例子来再次认识组件</h2>
					<div>
						<input class="form-control" v-model="newPoetryText" @keyup.enter="addNewPoetry" placeholder="添加内容后按下Enter键">
						<ul class="mt-10">
							<li is="poetry-item" v-for="(poetry, index) in poetryList" :prop="poetry" @remove="poetryList.splice(index, 1)" :key="poetry.id"></li>
						</ul>
					</div>
				</section>
				<section id="app-2">
					<h2 class="section_h2">#app-2：再从基础认识组件</h2>
					<base-component></base-component>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-3：通过一个外部对象创建局部组件</h2>
					<local-component></local-component>
				</section>
				<section id="app-4">
					<h2 class="section_h2">#app-4：组件在一些限制了HTML结构内的表示方法（带属性传值）</h2>
					<table class="table table-bordered">
						<thead class="bg-theme">
							<tr>
								<td>姓名</td>
								<td>国家</td>
								<td>尾兽</td>
								<td>技能</td>
							</tr>
						</thead>
						<tbody>
							<tr is="table-row" v-for="naruto in tdData" :prop="naruto" :key="naruto.id"></tr>
						</tbody>
					</table>
					<!-- 另外还有列表的“ul-li”、“ul-li”和下拉菜单的“select-option”这些固定的结构，都需要用“is”属性去代替组件名 -->
				</section>
				<section id="app-5" ref="app5">
					<h2 class="section_h2">{{componentHead1}}：组件复用的差异性</h2>
					<!-- 组件复用5次，只是使用不同的class样式 -->
					<data-component :class="buttonStyle.primary"></data-component>
					<data-component :class="buttonStyle.success"></data-component>
					<data-component :class="buttonStyle.info"></data-component>
					<data-component :class="buttonStyle.warning"></data-component>
					<data-component :class="buttonStyle.danger"></data-component>
				</section>
				<section id="app-6">
					<h2 class="section_h2">{{componentHead2}}：父子组件的通信</h2>
					<child-component communicate="通过“communicate”属性来完成父子组件的解耦"></child-component>
					<!-- 这里需要注意组件属性的两种命名的转换，即组件属性中的camelCased（驼峰式）命名在HTML中要转换为kebab-case（连线式）命名，否则将会出现Vue的警告，功能也会失效 (当然这只是在引入式开发中失效,在npm开发中好像不会出现警告也不会失效)-->
					<child-component communicate="这样组件就可以独立了" styleProp="color:#239feb; font: 36px '华文隶书','隶书','宋体'"></child-component>
				</section>
				<section id="app-7">
					<h2 class="section_h2">{{componentHead3}}：通过组件属性来实现属性的动态双向数据绑定</h2>
					<input type="text" class="form-control" v-model="parentMsg1" />
					<bind-component :parent-message="parentMsg1"></bind-component>
					<bind-component :parent-message="parentMsg2"></bind-component>
					<!-- 这里需要区分组件属性前面加冒号“:”和不加分别是什么情况下的，即字面量和动态（变量）的值 -->
				</section>
				<section id="app-8">
					<h2 class="section_h2">{{componentHead4}}：当Vue的组件在团队中使用时，属性的数据类型验证提示</h2>
					<!-- 尝试修改组件属性的值，可选值有：str（字符串）、num（数字）和bool（布尔值）,然后观察浏览器控制台 -->
					<check-component :propString = 'str'></check-component>
				</section>
				<section id="app-9">
					<h2 class="section_h2">{{componentHead5}}：自定义事件的触发器</h2>
					<button-calc-add @add-self="calcResult"></button-calc-add>
					<span>+</span>
					<button-calc-add @add-self="calcResult"></button-calc-add>
					<span>=</span>
					<span class="resStyle">{{res}}</span>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	const externalComponent = {
		template: '<div>这是一个外部对象，为私有组件提供模版</div>'
	};
	const counter = {
		count:0
	}
	export default{
		name:'componentLevup',
		data(){
			return{
				Title:'Vue组件进阶',
				newPoetryText: '',
				poetryList: [
					'病由数年少至今，我同乃翁多登临。',
					'云峰旧林绿又醉，月日新蔼白还亲。',
					'路漉湿土犹污脚，山阴寒风再吹心。',
					'忧愁忧愁愁不复，只缘此行疾去身。'
				],
				tdData: [
					{ name: '鸣人', country: '火之国', spiritAnimal: '有', skill: '风遁·螺旋丸' },
					{ name: '我爱罗', country: '沙之国', spiritAnimal: '有', skill: '砂缚柩' },
					{ name: '奇拉比', country: '雷之国', spiritAnimal: '有', skill: '哟哟，切克闹' },
					{ name: '照美冥', country: '水之国', spiritAnimal: '无', skill: '熔遁·溶解爆酸' }
				],
				componentHead1: '',
				buttonStyle: {
					primary: 'btn-primary',
					success: 'btn-success',
					info: 'btn-info',
					warning: 'btn-warning',
					danger: 'btn-danger'
				},
				componentHead2:'',
				parentMsg1: '修改数据也会反应到父组件上',
				parentMsg2: '但对同一个组件的不同数据是不会产生影响的',
				componentHead3:'',
				componentHead4:'',
				num: 18116657687,
				str: "这是字符串",
				bool: true,
				componentHead5:'',
				res: 0
			}
		},
		components:{
			'poetry-item':{
				template:`<li>{{ prop }}<button type="button" @click="$emit('remove')" class="li-delete">X</button></li>`,
				props:['prop']
			},
			'base-component':{
				template:'<div>这是一个显示文本的基本组件</div>'
			},
			'local-component':externalComponent,
			'table-row':{
				props:['prop'],
				template:`
					<tr>
						<td>{{prop.name}}</td>
						<td>{{prop.country}}</td>
						<td>{{prop.spiritAnimal}}</td>
						<td>{{prop.skill}}</td>
					</tr>
				`
			},
			'data-component':{
				template:`<button type="button" class="btn mr-20" style="padding: 6px 20px" @click="count += 1">{{ count }}</button>`,
				data: function () {
					return {
						count: 0
					}
				}
			},
			'child-component':{
				template:'<div :style = "styleProp">{{communicate}}</div>',
				props:['styleProp','communicate']
			},
			'bind-component':{
				props: ['parentMessage'],
				template: '<div>{{ parentMessage }}</div>'
			},
			'check-component':{
				props:{
					propString:String
				},
				template:`<div>{{ propString }}</div>`
			},
			'button-calc-add':{
				template: `<button type="button" @click="addSelf" class="btn btn-primary">{{ num }}</button>`,
				data: function () {
					return {
						num: 0
					}
				},
				methods: {
					addSelf: function () {
						this.num += 1;
						this.$emit('add-self');
					}
				}
			}
		},
		created:function(){
			//这个是获取定义的app对象的id也就是app,所以处理了一下
			let element = this.$root.$el;
			// console.log(element)
			let eleId = element.getAttribute('id');
			let newId1 = '#' + eleId + '-5';
			this.componentHead1 = newId1;
			// //这个方法有问题,值得研究研究......
			// let self = this.componentHead1;
			// this.$nextTick(() => {
			// 	 self = '#' + this.$refs.app5.getAttribute('id');
			// });
			let newId2 = '#' + eleId +'-6';
			this.componentHead2 = newId2;
			let newId3 = '#' + eleId + '-7';
			this.componentHead3 = newId3;
			let newId4 = '#' + eleId + '-8';
			this.componentHead4 = newId4;
			let newId5 = '#' + eleId + '-9';
			this.componentHead5 = newId5;
		},
		methods:{
			addNewPoetry:function(){
				this.poetryList.push(this.newPoetryText);
				this.newPoetryText = ''
			},
			calcResult: function () {
				this.res += 1
			}
		}
	}
</script>
<style scoped>
	#app-9 span{
		display: inline-block;
		vertical-align: middle;
	}
	.resStyle {
		padding: 0 12px;
		background-color: #eb981e;
		border: 1px solid #9d6416;
		border-radius: 5px;
		text-align: center;
		font-size: 32px;
		line-height: 45px;
		color: #ffffff;
	}

</style>