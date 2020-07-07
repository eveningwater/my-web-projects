<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<h2 class="section_h2">#app-1:字母大小写过滤</h2>
					<p>{{maincontent.content | capitalize }}</p>
					<p>{{maincontent.content | uppercase }}</p>
					<p>{{maincontent.content | lowercase }}</p>
					<p>{{maincontent.content | bookmark }}</p>
				</section>
				<section id="app-2">
					<h2 class="section_h2">#app-2:货币格式1</h2>
					<p>{{ maincontent.money | currency}}</p>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-2:货币格式2</h2>
					<ul>
						<li v-for="(item,idx) in maincontent.info" :key="idx">
							{{idx + ':'}}{{item | currency}}
						</li>
					</ul>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	export default{
		name:'filterVue',
		data(){
			return{
				Title:'Vue过滤器',
				maincontent:{
					content:'this is vue filter!',
					money:123124,
					info: {
						goods: '海尔智能王冰箱',
						country: '中国',
						price: 4999,
						date: '2017-4-19'
					}
				}
			}
		},
		filters:{
			capitalize:function(value){
				if(!value){
					return '';
				}
				value = value.toString();
				return value.charAt(0).toUpperCase() + value.slice(1);
			},
			uppercase:function(value){
				if(!value){
					return '';
				}
				value = value.toString();
				return value.toUpperCase();
			},
			lowercase:function(value){
				if(!value){
					return '';
				}
				value = value.toString();
				return value.toLowerCase();
			},
			bookmark:function(value){
				if(!value){
					return '';
				}
				value = value.toString();
				return '《 '+ value +' 》';
			},
			currency:function(value){
				if(!value){
					return '';
				}
				if(typeof value === 'number'){
					 return '￥' + value.toFixed(2);
				}
				value = value.toString();
				return value;
			}
		}
	}
</script>
<style scoped>
	#app-3 ul li{
		list-style:none;
		margin-left:-30px;
	}
</style>