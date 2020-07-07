<template>
	<div>
		<HeaderNav></HeaderNav>
		<main>
			<article>
				<h1>{{Title}}</h1>
				<section id="app-1">
					<input v-model="maincontent.setName" type="text" class="form-control" />
					<p>{{ maincontent.setName }}</p>
				</section>
				<section id="app-2">
					<h2 class="section_h2">#app-2：</h2>
					<input v-model="setName" type="text" class="form-control" />
					<p>
						原来的值是:
						<span class="oldVal" ref="oldVal">{{ setName }}</span>
					</p>
					<p>
						现在的值是:
						<span class="newVal" ref="newVal"></span>
					</p>
				</section>
				<section id="app-3">
					<h2 class="section_h2">#app-3:</h2>
					<p ref="ctrlContent"></p>
				</section>
			</article>
		</main>
	</div>
</template>
<script>
	window.appname = {
		setName:'数据内容1'
	}
	let appname = {
		setName:'数据内容1'
	}
	let appdata = {
		setName:'数据内容2'
	}
	export default{
		name:'constructor',
		data(){
			return{
				Title:'Vue构造实例',
				setName:appdata.setName,
				maincontent:{
					setName:appname.setName,
					name:'我是app-3的名称',
					prop:'我是app-3的属性'
				}
			}
		},
		watch:{
			setName(newVal,oldVal){
				this.$nextTick(() => {
					this.$refs.oldVal.textContent = oldVal;
					this.$refs.newVal.textContent = newVal;
				})
			},
		},
		created(){
			this.$nextTick(() => {
				this.$refs.ctrlContent.textContent = `${this.maincontent.name},${this.maincontent.prop}。`;
			})
		}
	}
</script>