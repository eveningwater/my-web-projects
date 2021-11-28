<template>
	<div :style="gutterObject" :class="classObject" class="exam-col">
		<slot></slot>
	</div>
</template>

<script>
	import { findComponentUp } from '../js/util.js'
	export default {
		props: {
			span: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				gutter:0
			};
		},
		computed: {
			// 区块间隔
			gutterObject(){
				let gutter = parseInt(this.gutter);
				if(gutter){
					return 'padding-left:' + gutter / 2 + 'px;' +
					'padding-right:' + gutter / 2 + 'px;';
				}
			},
			// 栅格类绑定
			classObject() {
				let span = parseInt(this.span);
				if (span) {
					return 'exam-col-' + span;
				}
			}
		},
		methods:{
			updateGutter(){
				const examRow = findComponentUp(this,'examRow');
				if(examRow){
					examRow.updateGutter(examRow.gutter);
				}
			}
		},
		mounted() {
			this.updateGutter();
		}
	}
</script>

