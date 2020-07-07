<template>
	<header>
		<nav>
			<ul class="breadcrumb">
				<li><router-link to = '/'>{{backData}}</router-link></li>
				<li class="active">{{title}}</li>
			</ul>
		</nav>
	</header>
</template>
<script>
	export default{
		name:'headerNav',
		data(){
			return{
				backData:'首页'
			}
		},
		computed:{
			title(){
				let path = this.$route.path;
				let newPath = path.slice(path.lastIndexOf('-'));
				if(newPath === '-levup'){
					return  this.$store.state.progressTitle || sessionStorage.getItem('progressTitle');
				}else if(newPath === '-high'){
					return  this.$store.state.highTitle || sessionStorage.getItem('highTitle'); 
				}else{
					return  this.$store.state.basicTitle || sessionStorage.getItem('basicTitle');
				}
			}
		}
	}
</script>