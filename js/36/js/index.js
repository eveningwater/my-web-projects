/*
*功能:诏书
*作者:eveningwater
*日期:2017/7/27
*/
//定义计时器
var timer = setInterval(function(){
	//获取到right与mark的left
	var r = window.getComputedStyle(white).getPropertyValue('left'),
		m = window.getComputedStyle(right).getPropertyValue('left');
	//判断r
	if(parseFloat(r) >= 840 && timer){
		r = 840 + 'px';
		clearInterval(timer);
	}
	right.style.left = (parseFloat(r) + 55) + 'px';
	white.style.left = (parseFloat(m) + 80) + 'px';
},400);
