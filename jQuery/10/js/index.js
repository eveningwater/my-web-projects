/*
* 功能:调用封装好的函数
 */
//图片数组
let imgs = [
	'./images/background_1.jpg',
	'./images/background_2.jpg',
	'./images/background_3.jpg',
	'./images/background_5.jpg'
];
let index = 0,
	len = imgs.length,
	$progress = $('.progress');
//调用封装好的预加载函数
$.preload(imgs,{
	each:function(count){
		$progress.html(Math.round((count + 1) / len * 100) + '%');
	},
	all:function(){
		$('.loading').fadeOut(100);
	}
})
//点击上一张,下一张
$('.btn').on('click',function(){
	if('prev' === $(this).data('control')){
		if(index <= 0){
			index = len;
		}
		index--;
	}else{
		index++;
		if(index >= len){
			index = 0;
		}
	}
	$('#img').attr('src',imgs[index]);
});