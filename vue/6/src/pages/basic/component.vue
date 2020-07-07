<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<h2 class="section_h2">#app-1：</h2>
					<comp-item></comp-item>
				</section>
				<section id="app-2">
					<h2 class="section_h2">#app-2：</h2>
					<ul>
						<li-carinfo-item v-for="car in high_carInfo" :carprop="car" :key="car.id"></li-carinfo-item>
					</ul>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-3：</h2>
					<ul>
						<li-carinfo-item v-for="car in norm_carInfo" v-bind:carprop="car" v-bind:key="car.id"></li-carinfo-item>
					</ul>
				</section>
				<section id="app-4">
					<h2 class="section_h2">#app-4：</h2>
					<ul class="mr-100">
						<li-carinfo-item v-for="mobike in lowe_mbick" :carprop="mobike" :key="mobike.id"></li-carinfo-item>
					</ul>
					<ul class="mr-100">
						<li-carinfo-item v-for="mobike in norm_mbick" :carprop="mobike" :key="mobike.id"></li-carinfo-item>
					</ul>
					<ul>
						<li-carinfo-item v-for="mobike in high_mbick" :carprop="mobike" :key="mobike.id"></li-carinfo-item>
					</ul>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	export default{
		name:'componentBasic',
		data(){
			return{
				Title:'Vue组件基础',
				high_carInfo:[
					{ name: '兰博基尼' },
					{ name: '劳斯莱斯' },
					{ name: '宾利' },
					{ name: '法拉利' },
					{ name: '阿斯顿马丁' }
				],
				norm_carInfo: [
					{ name: '上海大众' },
					{ name: '北京现代' },
					{ name: '长安福特' },
					{ name: '华晨宝马' },
					{ name: '成都公交' }
				],
				lowe_mbick: [
					{ name: '钱江摩托' },
					{ name: '嘉陵摩托' },
					{ name: '力帆摩托' }
				],
				norm_mbick: [
					{ name: '本田摩托' },
					{ name: '宝马摩托' },
					{ name: '雅马哈摩托' }
				],
				high_mbick: [
					{ name: '川崎摩托' },
					{ name: '杜卡迪摩托' },
					{ name: '哈雷摩托' }
				]
			}
		},
		components:{
			'comp-item':{
				template:'<p>#app-1：我是自定义组件</p>'
			},
			'li-carinfo-item':{
				props:['carprop'],
				template:'<li>{{ carprop.name }}</li>'
			}
		}
	}
</script>
<style scoped>
	#app-4 {
		overflow: hidden;
	}
	#app-4 ul {
		float: left;
	}
</style>