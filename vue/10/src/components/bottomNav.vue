<template>
	<div id="bottom">
		<a  id="pause" @click="pauseFun">{{ !paused ? '暂停动画' : '继续动画 ||' }}</a>
		<a  id="skipAnimation" @click="skipAnimationFun">跳过动画</a>
		<p>
			<span v-for="(url,index) in demourl" :key="index">
				<a :href="url.url">{{ url.title }}</a>
			</span>
		</p>
		<div id="music" @click="musicPause" :class="playing ? 'rotate' : ''"></div>
	</div>
</template>
<script src="../js/bottomNav.js"></script>
