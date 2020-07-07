<template>
	<div class="container">
		<div class="code" v-html="codeInstyleTag"></div>
		<div class="styleEditor" ref="container" contenteditable="true" @blur="updateCode($event)" v-html="highlightedCode"></div>
	</div>
</template>
<script src="../js/styleEditor.js"></script>