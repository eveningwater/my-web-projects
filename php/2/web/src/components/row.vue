<template>
	<div :style="gutterObject" class="exam-row">
		<slot></slot>
	</div>
</template>

<script>
	import {findComponentDown,findComponentsBrother} from '../js/util.js'
	export default {
		props:{
			gutter:{
				type:[String,Number],
				default:0
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			// 间隔绑定
			gutterObject(){
				let gutter = parseInt(this.gutter),style = {};
				if(gutter){
					style = 'margin-left:'+ gutter / -2 + 'px;' + 
					'margin-right:' + gutter / -2 + 'px;';
				}
				return style;
			}
		},
		mounted(){
			
		},
		methods:{
			updateGutter(gutter){
				// 找到当前组件的col组件
				let examCol = findComponentDown(this,'examCol');
				let examCols = findComponentsBrother(examCol,'examCol',false);
				if(examCols.length){
					examCols.forEach((child) => {
						if(gutter){
							child.gutter = gutter;
						}
					})
				}
			}
		},
		watch:{
			'gutter':{
				handler(val){
					if(val){
						// 如果gutter不为0，向row组件下的col组件传递gutter值
						this.updateGutter(val)
					}
				},
				deep:true
			}
		}
	}
</script>

