<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<h2 class="section_h2">#app-1:字符翻转</h2>
					<p @click="flipContent" class="pointer transion_0_3" ref="transition_0_3">{{maincontent.content}}</p>
				</section>
				<section id="app-2">
					<h2 class="section_h2">#app-2：计算属性</h2>
					<p @click="getComputedNowTime" class="pointer transion_0_3" ref="transition_0_4">{{maincontent.nowtime}}</p>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-3：事件触发</h2>
					<p @click="getNowTime" class="pointer transion_0_3" ref="transition_0_5">{{maincontent.nowTime}}</p>
				</section>
				<section id="app-4">
					<h2 class="section_h2">#app-4：watch回调（尝试在控制台修改数据模型，然后再用输入框绑定数据模型进行修改）</h2>
					<p>{{watchFullName}}</p>
					<input type="text" v-model="watchFullName" class="form-control" />
				</section>
				<section id="app-5">
					<h2 class="section_h2">#app-5：用计算属性替代watch回调（尝试在控制台修改数据模型，然后再用输入框绑定数据模型进行修改）</h2>
					<p>{{computedFullName}}</p>
					<input type="text" v-model="computedFullName" class="form-control" />
				</section>
				<section id="app-6">
					<h2 class="section_h2">#app-6：计算属性的set方法</h2>
					<p>{{setFullName}}</p>
					<input type="text" v-model="setFullName" class="form-control" />
				</section>
				<section id="app-7">
					<p>
						Ask a yes/no question:
						<input v-model="question" class="question">
					</p>
					<p>{{ answer }}</p>
					<p>
						<img :src="getImg" class="gif-img">
					</p>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	import axios from 'axios'
	import lodash from 'lodash'
	export default{
		name:'computed',
		data(){
			return{
				Title:'Vue计算属性',
				maincontent:{
					content:'123456789',
					nowtime:new Date().toLocaleString(),
					nowTime:new Date().toLocaleString()
				},
				watchFirstName:'verning',
				watchLastName:'eveningwater',
				watchFullName:'verning eveningwater',
				computedFirstName:'verning',
				computedLastName:'eveningwater',
				setFirstName:'verning',
				setLastName:'eveningwater',
				question:'',
				answer:'你不问我,我就不给你答案?',
				getImg:''
			}
		},
		computed:{
			reversedContent:function(){
				return this.maincontent.content.split('').reverse().join('');
			},
			getnowTime:function(){
				return this.maincontent.nowtime = new Date().toLocaleString();
			},
			computedFullName:function(){
				return this.computedFirstName + ' ' + this.computedLastName;
			},
			setFullName:{
				get:function(){
					return this.setFirstName + ' ' + this.setLastName;
				},
				set:function(val){
					let names = val.split(' ');
					this.setFirstName = names[0];
					this.setLastName = names[names.length - 1];
				}
			}
		},
		methods:{
			flipContent:function(){
				this.maincontent.content = this.reversedContent;
				this.$nextTick(() => {
					this.$refs.transition_0_3.classList.add('fz-32');
					this.$refs.transition_0_3.classList.add('text-success');
				});
			},
			getComputedNowTime:function(){
				this.maincontent.nowtime = this.getnowTime;
				this.$nextTick(() => {
					this.$refs.transition_0_4.classList.add('fz-32');
					this.$refs.transition_0_4.classList.add('text-success');
				});
			},
			getNowTime:function(){
				this.maincontent.nowTime = new Date().toLocaleString();
				this.$nextTick(() => {
					this.$refs.transition_0_5.classList.add('fz-32');
					this.$refs.transition_0_5.classList.add('text-success');
				});
			},
			getAnswer:_.debounce(
				function () {
					let qa = this;
					if(this.question.indexOf('?') === -1 && this.question.indexOf('? ') === -1){
						qa.answer = '输入的问题必须要包含"?"的哟!';
						return;
					}
					qa.answer = '构思中......';
					axios.get('https://yesno.wtf/api')
						.then((response) => {
							qa.answer = response.data.answer;
							qa.getImg = response.data.image;
						})
						.catch((error) => {
							qa.answer = '错误,无法访问API。' + error;
						})
				},
				400
			)
		},
		watch:{
			watchFirstName:function(val){
				this.watchFullName = val + ' ' + this.watchLastName;
			},
			watchLastName:function(val){
				this.watchFullName = this.watchFirstName + ' ' + val;
			},
			question:function(){
				this.answer = '等着你停止打字中......';
				this.getAnswer();
			}
		}
	}
</script>
<style scoped>
	*{
		user-select:none;
	}
	input,button{
		outline:none;
	}
	#app-7 .question:focus{
		border:1px solid #f2f2f2;
		box-shadow:0 0 10px rgba(120, 228, 237, 0.78);
	}
</style>