<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<ToButtonTop></ToButtonTop>
	</div>
</template>
<script>
	import ToButtonTop from './components/tobuttontop'
	export default{
		name:'app',
		components:{
			ToButtonTop
		}
	}
</script>
