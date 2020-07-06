/* 
* 功能:幻灯片播放封装
* 参数:图片对象
* 作者:loho
* 日期:2017/9/5
 */
/*页面加载时运行*/
$(function(){
	//定义判断依据
	var flag = true;
	//点击关闭
	$('.close').click(function(){
		if(flag){
			//改变导航背景颜色
			$('.nav').css('background-color','transparent');
			//改变箭头
			$(this).text('↓');
			//菜单隐藏
			$('.header').slideUp(1000);
			//改变状态
			flag = false;
		}else{
			//改变导航背景颜色
			$('.nav').css('background-color','#eee');
			//改变箭头
			$(this).text('↑');
			//菜单隐藏
			$('.header').slideDown(1000);
			//改变状态
			flag = true;
		}
	});
});
/*函数定义*/
$.fn.pagePlay = function(imgObj,callback){
	//定义定时器和定时器状态判断
	var timer = null,
		flag = true;
	//处理传递过来的对象
	var obj = this.imgObj = {
		count:imgObj.imgID,
		src:imgObj.imgSrc,
		callback:imgObj && imgObj.callback ? imgObj.callback : null
	}
	//默认自动轮播
	timeSetInterval(timer);
	//点击导航
	$(".header ul li").on('click',function(e){
		//阻止默认事件
		e.preventDefault();
		//设置状态
		flag = false;
		var idx = $(this).index() + 1;
		//赋值
		obj.count = idx;
		//添加背景图
		fullscreenCss(obj.count);
	});
	//悬浮事件
	this.hover(function(){
		$('.hover').fadeIn(1000);
		//点击上一张
		$('#prev').on('click',function(e){
			//阻止默认事件
			e.preventDefault();
			//设置状态
			flag = false;
			if(obj.count == 1){
				obj.count = 5;
			}else{
				obj.count--;
			}
			fullscreenCss(obj.count);
		});
		//点击下一张
		$('#next').on('click',function(e){
			//阻止默认事件
			e.preventDefault();
			//设置状态
			flag = false;
			if(obj.count == 5){
				obj.count = 1;
			}else{
				obj.count++;
			}
			fullscreenCss(obj.count);
		});
	},function(){
		$('.hover').fadeOut(1000);
	});
	//定时轮播
	function timeSetInterval(timer){
		if(flag){
			timer = setInterval(function(){
				if(obj.count == 5){
					obj.count = 1;
				}else{		
					obj.count++;
				}
				fullscreenCss(obj.count);
			},3000);
		}else{
			clearInterval(timer);
			setTimeout(function(){
				flag = true;
			},4000);
		}
	}
	//改变背景图样式
	function fullscreenCss(count){
		$('.fullscreen').css({
			'background-repeat':'no-repeat',
			'background-size':'cover',
			'background-position':'center',
			'background-image':'url(img/background_'+ count +'.jpg)'
		});
	}
	//回调函数触发
	if($.isFunction(callback)){
		callback(this);
	}
}