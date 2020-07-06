/**************************/
/*功能:首页*/
/*作者:eveningwater*/
/*日期:2017-2-15*/
/**************************/
/*页面加载时触发*/
window.onload = function () {
	//获取容器
	var span = document.getElementsByTagName("span");
	setInterval(function () {
		//获取当前时间
		var nowDate = new Date();
		for (var i = 0; i < span.length; i++) {
			var str = toDate(nowDate.getHours()) + toDate(nowDate.getMinutes()) + toDate(nowDate.getSeconds());
			span[i].textContent = str.charAt(i);
		}
	}, 1000);
}
function toDate(num) {
	return num < 10 ? '0' + num : "" + num;
}
