/**
* 功能：图片轮播
**/
/*************************************/
/* 全局变量定义部分 */
/*************************************/
// 获取当前屏幕宽度
var	win_iw = window.innerWidth;
// banner主容器
var banner = $(".banner");
// 获取图片的数量
var	imgLen = banner.children("[class^='img-']").length;

/*************************************/
/* 加载完成后事件部分 */
/*************************************/
$(function() {
	// 设置bannert的高度
	banner.css("height", win_iw / 3 + "px");
	
	/* 页面缩放后触发的事件 */
	$(window).resize(function() {
		// 修改宽度
		win_iw = window.innerWidth;
		// 修改banner高度
		$(".banner").css("height", win_iw / 3 + "px");
	});
});

/*************************************/
/* 函数定义部分 */
/*************************************/
/**
* 功能：无特效 
* 参数：切换间隔时间（以秒为单位，最小值为1秒）
**/
function defaultImgBanner(second) {
	// 隐藏所有图片除了第一张
	banner.children("[class^='img-']").hide();
	banner.children("[class^='img-']").eq(0).show();
	// 索引下标计数器
	var count = 0;
	// 如果时间间隔参数小于2或未定义
	second = (second < 1 || second === undefined) ? 2 : second;
	// 开始轮播
	setInterval(function() {
		if(count < imgLen - 1) {
			banner.children("[class^='img-']").eq(count).hide();
			banner.children("[class^='img-']").eq(count + 1).show();
			count++;
		} else {
			banner.children("[class^='img-']").eq(count).hide();
			banner.children("[class^='img-']").eq(0).show();
			count = 0;
		}
	}, second * 1000);
}

/**
* 功能：点击控制点切换 
* 参数：切换间隔时间（以秒为单位，最小值为2秒）
**/
function pointerImgBanner(second) {
	// 隐藏所有图片除了第一张
	banner.children("[class^='img-']").hide();
	banner.children("[class^='img-']").eq(0).show();
	// 如果时间间隔参数小于2或未定义
	second = (second < 1 || second === undefined) ? 2 : second;
	// 根据图片数量添加控制点
	banner.prepend("<point class='point'></point>");
	var pointBox = $("point.point");
	for(var i = 0; i < imgLen; i++) {
		pointBox.append("<i></i>");
	}
	// 添加鼠标手型
	pointBox.children("i").css("cursor", "pointer");
	// 为首个控制点添加选中效果
	pointBox.children("i").eq(0).addClass("ckd");
	// 获取控制点容器的宽度
	var pointDiv_w = pointBox.width();
	// 控制点容器居中
	pointBox.css("marginLeft", -(pointDiv_w / 2) + "px");
	pointBox.children("i").click(function() {
		var idx = $(this).index();
		$(this).addClass("ckd").siblings().removeClass("ckd");
		banner.children("[class^='img-']").eq(idx).fadeIn(600).siblings("[class^='img-']").fadeOut(600);
	});
	// 执行轮播
	setInterval(function() {
		// 获取正在显示图片的下标索引
		var showIdx;
		for(var i = 0; i < imgLen; i++) {
			var imgStatus = banner.children("[class^='img-']").eq(i).css("display");
			if(imgStatus == "block") {
				showIdx = i;
				break;
			}
		}
		// 如果当前图片不为最后一个
		if(showIdx < imgLen - 1) {
			banner.children("[class^='img-']").eq(showIdx).fadeOut(600);
			banner.children("[class^='img-']").eq(showIdx + 1).fadeIn(600);
			pointBox.children("i").eq(showIdx + 1).addClass("ckd").siblings().removeClass("ckd");
		} 
		// 如果当前图片为最后一个
		else {
			banner.children("[class^='img-']").eq(showIdx).fadeOut(600);
			banner.children("[class^='img-']").eq(0).fadeIn(600);
			pointBox.children("i").eq(0).addClass("ckd").siblings().removeClass("ckd");
		}
	}, second * 1000);
}

/**
* 功能：滑动特效 
* 参数：切换间隔时间（以秒为单位，最小值为2秒）
**/
function slideImgBanner(second) {
	// 根据图片数量添加控制点
	banner.prepend("<point class='point'></point>");
	var pointBox = $("point.point");
	for(var i = 0; i < imgLen; i++) {
		pointBox.append("<i></i>");
	}
	// 为首个控制点添加选中效果
	pointBox.children("i").eq(0).addClass("ckd");
	// 获取控制点容器的宽度
	var pointDiv_w = pointBox.width();
	// 控制点容器居中
	pointBox.css("marginLeft", -(pointDiv_w / 2) + "px");
	//　排列图片
	for(var i = 0; i < imgLen; i++) {
		banner.children("[class^='img-']").eq(i).css("left", (i * win_iw));
	}
	// 添加过渡效果
	banner.children("[class^='img-']").css("transition","1.2s cubic-bezier(0, 0, .25, .99)");
	// 控制点位置计数器
	var count = 0;
	// 如果时间间隔参数小于2或未定义
	second = (second < 2 || second === undefined) ? 2 : second;
	// 执行定时轮播
	setInterval(function() {
		// 每张图片按屏幕宽度位移
		for(var i = 0; i < imgLen; i++) {
			banner.children("[class^='img-']").eq(i).css("left", win_iw * i - win_iw + "px");
		}
		// 设置控制点的状态
		pointBox.children("i").eq(count + 1).addClass("ckd").siblings().removeClass("ckd");
		if(count == (imgLen - 1)) {
			count = 0;
			pointBox.children("i").eq(count).addClass("ckd").siblings().removeClass("ckd");
		} else {
			count++;
		}
		// 延时到滚动动画完成之后删除第一张图片并添加到末尾
		setTimeout(function(){
			// 获取列表中第一个元素的class名称
			var firstClassName = banner.children("[class^='img-']").eq(0).attr("class");
			// 将其移除
			banner.children("[class^='img-']").eq(0).remove();
			// 将刚才移除的添加至队末，并设定其位置
			banner.append("<div class='" + firstClassName + "'></div>");
			banner.children("[class^='img-']").eq(imgLen - 1).css({
				"left": win_iw * (imgLen - 1) + "px",
				"transition": "1.2s cubic-bezier(0, 0, .25, .99)"
			});
		},1600);
	}, second * 1000);
}

/**
* 功能：百叶窗特效 
* 参数：切换间隔时间（以秒为单位，最小值为2秒）
**/
function window_shadesImgBanner(second, vane) {
	// 设置图片的层级
	for(var i = 0; i < imgLen; i++) {
		// 获取当前图片的索引值
		var idx = banner.children("[class^='img-']").eq(i).index();
		banner.children("[class^='img-']").eq(i).css("zIndex", imgLen - idx);
	}
	setInterval(function(){
		// 图片容器
		var imgPanel = banner.children("[class^='img-']");
		// 获取首个图片容器的背景图名称
		var bgiUrl = imgPanel.eq(0).css("backgroundImage"),
			imgName = bgiUrl.slice(bgiUrl.lastIndexOf("\/") + 1,bgiUrl.lastIndexOf("\""));
		// 在首个图片容器内生成参数个数等分的“叶片”
		for(var j = 0; j < vane; j++) {
			imgPanel.eq(0).append("<div class='childPanel'></div>")
		}
		// 消除背景图片的显示,并添加立体效果
		imgPanel.eq(0).css({
			"backgroundImage": "url('')",
			"transformStyle": "preserve-3d"
		});
		var childPanel = $(".childPanel");
		childPanel.css({
			"width": 100 / vane + "%",
		});
		// 设置每个叶片的图像定位
		for(var k = 0; k < vane; k++) {
			childPanel.eq(k).css({
				"backgroundImage": "url(img/" + imgName + ")",
				"backgroundPosition": (100 / vane) * k + "% 0"
			});
		}
		// 添加百叶动画效果
		childPanel.addClass("rotatePanel");
		// 动画完成后的操作
		setTimeout(function() {
			// 获取首页面板的Class
			var firstClass = imgPanel.eq(0).attr("class");
			// 移除首个图片主面板
			imgPanel.eq(0).remove();
			// 在末尾添加刚才被移除的面板
			banner.append("<div class='" + firstClass + "'></div>");
			imgPanel.eq(imgLen - 1).css("zIndex", 1);
			// 重新设定面板层级
			for(var m = 0; m < imgLen; m++) {
				// 获取当前图片的索引值
				var idx = banner.children("[class^='img-']").eq(m).index();
				banner.children("[class^='img-']").eq(m).css("zIndex", imgLen - idx);
			}
		},900);
	},second * 1000);
}



