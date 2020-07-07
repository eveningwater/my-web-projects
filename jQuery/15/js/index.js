/************功能:w18系统******************/
/************作者:loho********************/
/************日期:2017/3/25***************/
//引入jQuery
/*window.$ = require('jquery/dist/jquery.min');*/
/*全局变量定义部分*/
var GLOBAL = {
	/*当前屏幕宽度*/
	win_w:window.innerWidth,
	/*当前屏幕高度*/
	win_h:window.innerHeight,
	/*整个dom文档高度*/
	current_h:$(document).height(),
	time:null,
	/*定义弹出框面板为true*/
	$flag:true,
	/*加载动画*/
	loadingAnimate:'<div class="loadingpage"><div class="loadingcontent"><h1>努力加载中</h1><span></span></div></div>',
	/*移除动画*/
	removeLoadingAnimate:function(){
		$(".mainpage").children(".loadingpage").remove();
	}
}
/*页面加载时运行*/
$(function(){
	/*图片轮播*/
	imgPlay();
	/*遮罩层点击消失到主页*/
	maskBtn();
	//键盘事件
	keydownFun();
	/*页面缩放*/
	window.onresize = function(){
		$(".mainpage").css('height',GLOBAL.current_h);
	}
	/*立即加载日期函数*/
	getDate();
});
/*函数定义部分*/
/*
**功能:图片轮播
*/
function imgPlay(){
	//获取图片的长度
	var $img_len = $(".banner img").length;
	//排列图片
	for(var i =0;i < $img_len;i++){
		$(".banner img").eq(i).css('left',(GLOBAL.win_w * i) + 'px');
		//向容器中添加圆点
		$(".dot").append(`<i></i>`);
		$(".dot i").eq(0).addClass("checked").siblings().removeClass("checked");
	}
	//定义计数器
	var count = 0;
	//定时轮播
	GLOBAL.time = setInterval(function(){
		//对所有图片进行定位
		for(var i = 0;i < $img_len;i++){
			$(".banner img").eq(i).css('left',GLOBAL.win_w * i - GLOBAL.win_w + 'px');
		}
		//延迟到滚动完成删除第一张图片然后克隆并重新执行轮播
		setTimeout(function(){
			var firstImg = $(".banner img").eq(0).clone();
			$(".banner img").eq(0).remove();
			$(".banner").append(firstImg);
			$(".banner img").eq($img_len - 1).css('left',GLOBAL.win_w *($img_len - 1) + 'px');
		},900);
		//判断计数器
		if(count == ($img_len - 1)){
			count = 0;
			//圆点添加选中效果
			$(".dot i").eq(0).addClass("checked").siblings().removeClass("checked");
		}else{
			count++;
			$(".dot i").eq(count).addClass("checked").siblings().removeClass("checked");
		}
	},3000);
}
/*
**功能：遮罩层操作
*/
function maskBtn(){
	//点击遮罩层页面
	$("aside").on('click',function(e){
		//判断是否点击的为标题
		if(e.target.tagName.toLocaleLowerCase() == 'h1'){
			//如果是标题让标题消失
			$("aside h1").animate({
				'top':'-100%',
				'transition:':'all .3s ease-in'
			});
		}else{
			//如果不是，遮罩层消失，主页面显示
			$('aside').animate({'top':'-100%'});
			//获取当前日期,定时为10秒
			setInterval(function(){
				getDate();
			},10000);
			//清除轮播图定时器
			clearInterval(GLOBAL.time);
			//主页面动画显示
			$(".mainpage").animate({'top':'0'});
			//用户头像添加css样式
			$(".userHead").addClass("ani_1");
			$(".loginPass").addClass("ani_2");
			//登录矿添加css样式
			$(".loginEnter").css({
				'transition':'all 2s linear 1s',
				'left':'35%'
			});
			//密码框添加css样式
			$(".loginPass").css({
				'transition':'all 2s linear 1s',
				'left':'58%'
			});
			//延迟1秒执行登录函数
			setTimeout(function(){
				loginFun();
			},1000);
		}
	});
}
/*
**功能:登录操作
*/
function loginFun(){
	//点击进入显示登录按钮
	$(".loginEnter").click(function(){
		//当前背景图隐藏
		$(this).css({
			'background':'none',
			'animate':'none'
		});
		//登录按钮显示
		$(".loginBtn").fadeIn(1000).show();
		//清空当前内容
		$(".loginPass").val("");
		//类型转换为密码
		$(".loginPass").attr('type','password');
		//点击登录按钮
		$(".loginBtn").click(function(){
			//获取登录框
			var loginVal = $(".loginPass").val();
			//设置一个模拟密码
			var pass = "123456";
			if(loginVal == pass){
				//ajax加载系统页面
				loadHtml("pages/windows.html");
				//加载完成之后调用系统页面编辑函数
				setTimeout(function(){
					windowEdit();
				},1);
			}
			else if(loginVal == ""){
				$(".popbox h2").text("密码不能为空");	
				//调用关闭弹出框函数
				surebtnFun();
			}else{				
				$(".popbox h2").text("密码输入错误");
				//调用关闭弹出框函数
				surebtnFun();
			}
		});
	});
}
/*
**功能:弹出框操作
*/
function surebtnFun(){
	$(".popbox").show(500);
	//点击确认
	$(".surebtn").click(function(){
		//关闭弹出框并清空密码框内容
		$(this).parent().hide(1000);
		$(".loginPass").val("");
	});
}
/*
**功能:键盘事件
*/
function keydownFun(){

}
/*
**功能：ajax加载页面函数
*/
function loadHtml(url){
	$.get(url,function(rqhtml){
		//页面加载动画
		$(".mainpage").html(GLOBAL.loadingAnimate);
		//延迟加载加载之后的页面
		setTimeout(function(){
			$(".mainpage").html(rqhtml);
		},5150);
	});
}
/*
**功能:获取当前日期
*/
function getDate(){
	//定义日期
	var date = new Date();
	//获取年月日时分
	var year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes();
	//为日期作处理
	month = String(month).length === 1 ? "0" + month : month;
	day = String(day).length === 1 ? "0" + day : day;
	hour = String(hour).length === 1 ? "0" + hour :hour;
	minute = String(minute).length === 1 ? "0" + minute : minute;
	//将日期添加到容器中
	$(".nowDate,.date").html(`<p><span>${year}</span>年</p><p><span>${month}</span>月</p><p><span>${day}</span>日</p><p><span>${hour}&nbsp;:</span></p><p><span>${minute}</span></p>`);
}
/*
**功能:系统编辑页函数
*/
function windowEdit(){
	//调用加载日期函数,定时为10秒
	setInterval(function(){
		getDate();
	},10000);
	//鼠标右键点击事件
	document.oncontextmenu = function(e){
		//清除默认事件
		e.preventDefault();
	}
	//按下鼠标右键事件
	$("div.mainpage").mousedown(function(e){
		if(e.which == 3){
			//调用鼠标右键函数
			mouseRight(e,this);
		}
	});
	//底部开始菜单点击事件
	//定义计数器
	var num = 1;
	$("div.mainpage").on('click','.bottomlogo',function(){
		num++;
		switch(num % 2){
			case 0:
				$(".bottomlogo").addClass("select");//底部添加阴影
				$(".rightnav").show(1000);//菜单栏显示
				$(".rightlogo").fadeIn(1000);//菜单栏头像显示
				break;
			case 1: 
				$(".bottomlogo").removeClass("select");//底部移除阴影
				$(".rightnav").hide(1000);//菜单栏隐藏
				$(".rightlogo").fadeOut(1000);//菜单栏头像隐藏
				break;
			default:
				$(".bottomlogo").removeClass("select");
				$(".rightnav").hide(1000);
				$(".rightlogo").fadeOut(1000);
				break;
		}
	});
}
/*
**功能:鼠标右键函数
*/
function  mouseRight(ele,thiscount){
	//清除已经存在的菜单
	closemouseRightlist();
	//获取鼠标位置
	var mouseX = ele.pageX || ele.clientX,
		mouseY = ele.pageY || ele.clientY;
	//计算x与y偏移值
	skewX = (mouseX / GLOBAL.win_w);
	skewY = (mouseY / GLOBAL.win_h);
	//根据鼠标位置调整右键菜单
	// 数字250为右键菜单宽度的实际，300为右键菜单高度的实际,生产环境中需要用JS去获取菜单的宽度与高度并进行一定的杂项值运算去处
	mouseX = mouseX - (250 * skewX);
	mouseY = mouseY - (300 * skewY);
	//创建右键菜单
	$(thiscount).children(".winpage").append(`<div class="mouseRightlist"><ul><li class="create"><i class="createfile"></i><span>新建</span></li><li class="reload"><span>刷新</span></li></ul><ul><li class="largeicon"><i class="icon large"></i><span>大图标</span></li><li class="middleicon"><i class="icon middle"></i><span>中图标</span></li><li class="smallicon"><i class="icon small"></i><span>小图标</span></li></ul><ul><li class="changebg"><span class="changespan"><input type ="file" id="file" title=" ">更换背景</span></li><li class="upwin"><span>修改屏幕分辨率</span></li></ul><ul><li class="changeuser"><span>切换用户</span></li><li class="closewin"><span>关闭系统</span></li></ul></div>`);
	//为右键菜单添加css样式定位
	$(".mouseRightlist").css({
		'left':mouseX + 'px',
		'top':mouseY + 'px'
	});
	//将右键菜单显现出来
	$(thiscount).children(".winpage").fadeIn(1000);
	//绑定右键菜单事件
	$(document).off('click',".mouseRightlist li").on({
		//鼠标移入事件
		mouseenter:function(){
			$(this).css('background-color',"rgba(255, 255, 255, 0.64)");
		},
		//鼠标移出事件
		mouseleave:function(){
			$(this).css('background-color',"transparent");
		},
		//鼠标点击事件
		click:function(){
			//判断点击菜单是哪项
			//新建
			var isCreate = $(this).hasClass("create"),
				//刷新
				isReload = $(this).hasClass("reload"),
				//大图标
				isLarge = $(this).hasClass("largeicon"),
				//中图标
				isMiddle = $(this).hasClass("middleicon"),
				//小图标
				isSmall = $(this).hasClass("smallicon"),
				//更换背景
				isChangeBg = $(this).hasClass("changebg"),
				//修改屏幕分辨率
				isUpdate = $(this).hasClass("upwin"),
				//切换用户
				isChangeUser = $(this).hasClass("changeuser"),
				//关闭系统
				isClose = $(this).hasClass("closewin");
			//如果是新建
			if(isCreate){
				//调用新建函数
				createFun();
			}
			//如果是刷新
			else if(isReload){
				/*$.ajax({
					type:"GET",
					url:"pages/windows.html",
					dataType:"html"
				}).done(function(e){
					$(".mainpage").children(".winpage").html(e);
				})*/
				//重新加载页面
				$.get("pages/windows.html",function(e){
					$(".mainpage").html(e);
				});
			}
			//如果是大图标
			else if(isLarge){

			}
			//如果是中图标
			else if(isMiddle){

			}
			//如果是小图标
			else if(isSmall){

			}
			//如果是更换背景
			else if(isChangeBg){
				//调用更换背景函数
				changeBackground();
			}
			//如果是修改屏幕分辨率
			else if(isUpdate){

			}
			//如果是切换用户
			else if(isChangeUser){
				//面板设置为false
				GLOBAL.$flag = true;
				//调用弹出框修改函数
				updatePopbox();
			}
			//如果是关闭系统
			else if(isClose){
				//面板设置为false
				GLOBAL.$flag = false;
				//调用关闭系统函数
				updatePopbox();	
			}
			//如果是其它关闭右键菜单栏
			else{
				closemouseRightlist();
			}
		}
	},".mouseRightlist li");
}
/*
**功能:清除已经存在的右键菜单
*/
function closemouseRightlist(){
	$(".mouseRightlist").fadeOut(1200,function(){
		$(this).remove();
	});
}
/*
**功能:弹出框修改
*/
function  updatePopbox(){
	//获取弹出框
	var $popbox = $(".popbox");
	//弹出框内容改变
	$popbox.fadeIn(1000).html(`<h2></h2><div class="btnGroup"><button type="button" class="sure">确认</button><button type="button" class="cancel">取消</button></div>`);
	//获取此时的标题
	var $h2 = $popbox.children("h2");
	//设置更改后的按钮css样式
	var $btngroup = $popbox.children(".btnGroup"),
		$sure = $btngroup.children(".sure"),
		$cancel = $btngroup.children(".cancel");
	$btngroup.css({
		'position':'relative',
		'top':'50px',
		'width':'100%',
		'height':'40px'
	});
	$sure.css({
		'position':'absolute',
		'left':'20px',
		'width':'150px',
		'height':'40px',
		'cursor':'pointer'
	});
	$cancel.css({
		'position':'absolute',
		'right':'20px',
		'width':'150px',
		'height':'40px',
		'cursor':'pointer'
	});
	if(GLOBAL.$flag){
		//标题内容更改为确认更换背景
		$h2.text("确认更换用户？");
		//点击确认
		$sure.click(function(){
			//关闭右键菜单栏并更换背景
			closemouseRightlist();
			//关闭弹出框
			$popbox.fadeOut(1000);
			//跳转到首页
			location.href = "../index.html";
		});
		//点击取消
		$cancel.click(function(){
			//关闭弹出框
			$popbox.fadeOut(1000);
			//关闭右键菜单栏
			closemouseRightlist();
		});
	}
	else{
		//标题内容更换为确认关闭系统
		$h2.text("确认关闭系统？");
		//点击确认
		$sure.click(function(){
			//调用关闭系统函数
			window.close();
		});
		//点击取消
		$cancel.click(function(){
			//关闭弹出框
			$popbox.fadeOut(1000);
			//关闭右键菜单栏
			closemouseRightlist();
		});
	}
}
/*
**功能：更换背景
*/
function changeBackground(){
	//点击更换背景
	$(".changespan").children("input").on({
		click:function(e){
			//阻止事件冒泡
			e.stopPropagation();
			//关闭右键菜单栏
			closemouseRightlist();
		},
		change:function(){
			//获取输入文件的路径
			var file = document.getElementById("file").files[0];
			//判断如果路径不匹配图片，返回false
			var regxImg = /image\/\w+/;
			if(!regxImg.test(file.type)){
				return false;
			}
			//定义接口
			var reader = new FileReader();
			//将文件以data URL形式读入页面
			reader.readAsDataURL(file);
			//加载图片
			reader.onload = function(e){
				//获取更换背景元素
				var $changeBg = $(".winpage");
				//桌面背景
				$changeBg.css({
					width:"100%",
					height:"100%",
					background:`#ffffff url(${this.result})no-repeat`,
					backgroundSize:"cover"
				});
			}
			//关闭右键菜单栏
			closemouseRightlist();
		}
	})
}
/*
**功能:新建函数
*/
function createFun(){
	//关闭右键菜单栏
	closemouseRightlist();
	//获取页面节点
	var $createList = $(".winpage .createList");
	//显示新建菜单栏
	$createList.fadeIn(1000);
	//判断是否输入内容
	$createList.children("div").children("input").on('input', function(){
		//获取到输入内容
		var $filename = $(".fileName").val(),
			$location = $(".location").val();
		//如果输入内容不为空
		if($filename && location){
			//调用验证提交函数
			submitFun($filename,$location);
		}
	});
	function submitFun($filename,$location){
		//点击确认提交
		$createList.children(".submit").off('click').on('click', function(){
			//关闭当前弹出框
			$createList.fadeOut(1000);
			//定义域名正则表达式
			var $regx = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
			if($regx.test($location)){
				//获取列表
				$filelist = $(".filelist");
				$filelist.append(`<li><a href="#" class="filebg"></a><span>${$filename}</span></li>`);
				//获取a
				var $filebg = $(".filebg");
				//为a添加css样式
				$filebg.css({
					backgroundImage:'url("../img/folder_32.png")'
				});
				//点击li元素跳转到输入域名网址
				$filebg.parent().click(function(){
					//在桌面创建内联框架用于加载桌面图标跳转网址
					$('.winpage').after(`<div class="browser"><div class="headerclose"><span class="minsize">－</span><span class="maxsize">⬜</span><span class="closebrowser">✖</span></div><div class="header"><i class="back"></i><i class="forward"></i><i class="refresh"></i><input type="text" class="locationtext"><span class="moremenu">...</span></div><iframe class="iframe"></iframe></div>`);
					//延迟跳转
					setTimeout(function(){
						//获取iframe
						var $iframe = $(".iframe");
						//获取网址
						var $locationtext = $(".locationtext");
						//获取关闭按钮
						var $closebrowser = $(".closebrowser");
						//页面跳转到指定网址,并将域名添加到网址中
						$iframe.attr('src',$location);
						$locationtext.val($location);
						//点击关闭按钮关闭浏览器
						$closebrowser.click(function(){
							//关闭
							$(".browser").hide();
							//清空域名
							$locationtext.val("");
						});
						//当域名改变时,跳转到改变的网址
						$locationtext.change(function(){
							//获取输入域名网址
							var $val = $(this).val();
							$iframe.attr('src',$val);
						});
					},1000);
				});
			}else{

			}
		});	
	}
}