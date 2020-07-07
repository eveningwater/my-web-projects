<template>
	<div class="toTop" v-on:click = "toTopFun">{{toTopMsg}}</div>
</template>
<script>
	export default{
		name:'toTopMsg',
		data(){
			return{
				toTopMsg:'^',
				scroll:'',
				backTop:true
			}
		},
		methods:{
			toTopFun:function(e){
				var timer = null;
				timer = setInterval(function(){
					var scrollHei = document.body.scrollTop || document.documentElement.scrollTop;
					var speed = Math.floor(-scrollHei / 16);
					document.body.scrollTop = document.documentElement.scrollTop = scrollHei + speed;
					this.backTop = false;
					if(scrollHei == 0){
						clearInterval(timer);
					}
				})
			},
			scrollFun(e){
				this.scroll = document.body.scrollTop || document.documentElement.scrollTop;
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				if(this.scroll >= clientHeight){
					document.getElementsByClassName('toTop')[0].style.display = 'block';
				}else{
					document.getElementsByClassName('toTop')[0].style.display = 'none';
				}
				if(!this.backTop){
					clearInterval(timer);
				}
				this.backTop = true;
			}
		},
		mounted(){
			window.addEventListener('scroll',this.scrollFun)
		}
	}
</script>
<style scoped>
	.toTop{
		position: fixed;
		right: 2px;bottom: 25px;
		width: 45px;height: 45px;
		background: url('../assets/huojian.svg')no-repeat center/cover;
		font: 35px/45px "方正兰亭";
		text-align: center;
		color: #f7ebeb;
		border-radius: 5px;
		transition:all .5s;
		cursor: pointer;
		display:none;
	}
	.toTop:hover,.toTop:active{
		transform:scale(1.6);
	}
</style>