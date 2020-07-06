$(function () {
    //ajax加载json数据并添加到页面内容
    var xhr = new XMLHttpRequest();//创建ajax对象
    xhr.open('GET', 'js/data.json');//创建请求
    xhr.send();//发送请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var jsonTxt = xhr.responseText;//接收json数据
            var jsObj = JSON.parse(jsonTxt);//将json数据转化为对象
            $('body').html(`
					<!--背景图轮播部分-->
					<div class="bg bg-box-1"></div>
	 				<div class="bg bg-box-2"></div>
	 				<div class="bg bg-box-3"></div>
	 				<div class="bg bg-box-4"></div>
	 				<!--列表轮播部分-->
	 				<div id="wrap">
	 						<ul>
	 							<li class="ckd">
	 								<div class="text">
	 									<p>${jsObj.title[0]}</p>
	 								</div>
	 							</li>
	 							<li>
	 								<div class="text">
	 									<p>${jsObj.title[1]}</p>
	 								</div>
	 							</li>
	 							<li>
	 								<div class="text">
	 									<p>${jsObj.title[2]}</p>
	 								</div>
	 							</li>
	 							<li>
	 								<div class="text">
	 									<p>${jsObj.title[3]}</p>
	 								</div>
	 							</li>
	 						</ul>
	 				</div>
			`);
            //ajax加载数据完成之后调用鼠标悬浮函数
            wrapLiFun();
        }
    };//状态
});
function wrapLiFun() {
    //鼠标悬浮到li事件
    $('#wrap li').mouseover(function () {
        //判断当前元素如果没有class
        if (!$(this).hasClass('ckd')) {
            //移除所有元素class
            $('#wrap li').removeClass('ckd');
            //为当前元素添加class
            $(this).addClass('ckd');
            //切换背景
            $('#wrap li').each(function (index) {
                //判断如果当前元素有class则移除当前背景
                if ($(this).hasClass('ckd')) {
                    $('.bg').fadeOut(1000);
                    $('.bg:eq(' + index + ')').fadeIn(1000);
                }
            });
            //设置class样式
            $('.ckd').stop().animate({
                width: 700
            }, 200, 'linear');
            $('#wrap li').not('.ckd').stop().animate({
                width: 100
            }, 200, 'linear');
        }
    });
}
