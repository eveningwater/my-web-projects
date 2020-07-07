<template>
	<div class = "resumeEditor" :class="{htmlMode:enableHtml}" ref="container">
		<div v-if="enableHtml" v-html="result"></div>
		<pre v-else>{{result}}</pre>
	</div>
</template>
<script src="../js/resumeEditor.js"></script>
<style scoped>
	@import url('../css/resumeEditor.css');
</style>