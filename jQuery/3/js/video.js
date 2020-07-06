/**
 * 功能:封装video
 * 作者:admin
 * 日期:2017/8/23.
 **/
'use strict';
$.fn.videoCt = function (options) {
	//设置默认值
	var defaults = {
		title:'',//标题
		volume:0.2,//音量
		barrage:false,//弹幕
		comment:false,//评论
		reversal:false,//翻转
		playSpeed:false,//播放速度
		update:false,//更新
		autoplay:false,//自动播放
		clarity:{
			type:[],
			src:[]
		},//清晰度
		theme:'blue',//主题
		commontFile:'json/common.json'//弹幕json文件
	};
	//合并对象
	var opts = $.extend({},defaults,options);
	//定义另一个对象
	var intOpts = {
		title:'',
		status:false,//状态
		currentTime:'0.00002',//当前时间
		duration:'',//总时长
		volume:'',
		clarityType:'',//清晰度类型
		claritySrc:'',//清晰度路径
		fullScreen:false,//全屏
		reversal:false,//翻转
		playSpeed:1,
		cutover:true,//转换
		commonTitle:'',//弹幕标题
		commentId:'',
		comment:{},
		commentSwitch:true//弹幕开关
	}
	//控件结构
	var $videoCt = $(this);
	var $videoCtBox = $('<div></div>').addClass('video-player').addClass(opts.theme);
	var $videoCtControls = $(`<div class="video-controls">
								<!--进度条-->
								<div class="video-seek">
									<div class="seek-buffer"></div>
									<div class="seek-con"></div>
									<div class="seek-slider"></div>
									<div class="viewBox">
										<video></video>
										<span>00:00</span>
										<i></i>
									</div>
								</div>
								<!--播放/暂停-->
								<a title="play/pause" class="video-play"></a>
								<!--计时器-->
								<div class="video-timer">
									<span class="realTime">00:00</span>/
									<span>00:00</span>
								</div>
								<!--音量控制-->
								<div class="video-audio">
									<a title="mute/unmute" class="audio-button"></a>
									<div class="audio-box">
										<div class="audio-con"></div>
										<div class="audio-slider"></div>
									</div>
								</div>
								<!--全屏-->
								<div class="video-screen"></div>
								<div class="status"></div>
							</div>`);
	//把元素放在指定的$videoCt中
	$videoCt.wrap($videoCtBox);
	//在元素之后插入控件
	$videoCt.after($videoCtControls);
	$videoCt.after($('<div class="video-prompt">视频加载中......</div>'));
	//调用扩展功能函数
	videoDom(opts);
	//获取视频时长
	var getVideoTimer;
	//弹幕保留时长
	var comStayTimer = [];
	var comTimer = 0;
	var comStroeStatus = 0;
	//定义父级元素
	var $video_container = $videoCt.parent('.video-player');
	//将子元素添加到父级元素中
	var $videoCt_title = $('.video-title', $video_container);//添加标题
	var $videoCt_play = $('.video-play', $video_container);//添加播放按钮
	var $videoCt_seek = $('.video-seek', $video_container);//添加进度条
	var $videoCt_timer = $('.video-timer', $video_container);//添加定时器
	var $videoCt_audio = $('.video-audio', $video_container);//添加音量
	var $videoCt_clarity = $('.video-clarity', $video_container);//添加清晰度
	var $videoCt_screen = $('.video-screen', $video_container);//添加全屏按钮
	//添加清晰度属性
	$videoCt.attr('src',opts.clarity.src[0]);
	$('.video-seek video').attr('src',opts.clarity.src[0]);
	intOpts.claritySrc = opts.clarity.src[0];
	intOpts.clarityType = opts.clarity.type[0];
	//添加禁用属性
	$videoCt_clarity.find('span').eq(0).addClass('disabled');
	//获取视频相关信息函数
	var getVideoInf = function () {
		//定义设置时间
		var setTimer;
		var key = true;
		//判断状态
		if($videoCt[0].readyState != 4 && $('.video-seek video')[0] != 4){
			$('.video-prompt').fadeOut();
			getVideoTimer = setTimeout(getVideoInf,100);
		}else {
			$('.video-prompt').fadeOut();
			//视频播放状态
			if (intOpts.status) {
				$videoCt[0].play();
			}
			//标题
			if (!intOpts.title) {
				intOpts.title = opts.title;
			}
			$videoCt_title.text(intOpts.title);
			//载入弹幕
			if (intOpts.cutover && opts.comment) {
				//加载json数据
				$.getJSON(opts.commontFile, function (data, status) {
					//如果加载成功
					if (status == 'success') {
						//先清空屏幕
						$('.screenShootBox').empty();
						//数据赋值
						intOpts.commentTitle = data.title;
						intOpts.commentId = data.id;
						intOpts.commentClass = data.class;
						//遍历数据
						$.each(data.data, function (index,obj) {
							$('.screenShootBox').append($(`<p name="${obj.time}" class="screenShoot" data-status="0" data-action="${obj.action}" data-speed="${obj.speed}" style="color:${obj.color};top:${obj.top}px;font-size:${obj.fontSize}px;">${obj.word}</p>`));
						});
					}
				})
			}
			//进度条,暂停/播放
			if (!intOpts.currentTime) {
				intOpts.currentTime = $videoCt[0].currentTime;
			}
			$videoCt[0].currentTime = intOpts.currentTime;
			if (!intOpts.duration) {
				intOpts.duration = $videoCt[0].duration;
			}
			//调用滑块函数
			move($('.seek-slider'), $videoCt_seek, $('.seek-con'), 8, videoJump, $('.realTime'), true);
			//设置样式
			$('.seek-slider').css('left', intOpts.currentTime / intOpts.duration * $('.video-seek').width() - 8);
			$('.seek-con').css('width', intOpts.currentTime / intOpts.duration * $('.video-seek').width());
			//悬浮事件
			$('.video-seek').hover(function () {
				key = true;
				$(document).mousemove(function (e) {
					clearTimeout(setTimer);
					if (key) {
						hoverPlay(e);
					}
				});
			}, function () {
				key = false;
				clearTimeout(setTimer);
				$('.video-seek .viewBox').fadeOut();
			});
			//时间
			$videoCt_timer.find('span').eq(0).text(gTimeFormat(intOpts.currentTime));
			$videoCt_timer.find('span').eq(1).text(gTimeFormat(intOpts.duration));
			//声音
			if (!intOpts.volume) {
				intOpts.volume = opts.volume;
			}
			$videoCt[0].volume = intOpts.volume;
			$videoCt_audio.find('.audio-button').removeClass('audio-mute');
			//调用move函数
			move($('.audio-slider'), $('.audio-box'), $('.audio-con'), 6, audioJump);
			//设置样式
			$('.audio-slider').css('left', intOpts.volume * $('.audio-box').width() - 6);
			$('.audio-con').css('width', intOpts.volume * $('.audio-box').width());
			//点击音量控制按钮
			$videoCt_audio.find('.audio-button').off('click').on('click', function () {
				$(this).toggleClass('audio-mute');
				if ($videoCt[0].volume == 0) {
					$videoCt[0].volume = intOpts.volume;
				} else {
					$videoCt[0].volume = 0;
				}
			});
			//弹幕
			$('.video-comment input[type=text]').off('focus').on('focus', function () {
				$('.video-comment').addClass('commentActive');
			});
			$('.video-comment p').off('click').on('click', function () {
				$('.video-comment .setBox').fadeToggle();
			});
			$('.video-comment .close').off('click').on('click', function () {
				$('.video-comment .setBox').fadeOut();
			});
			$('.video-comment input[type=color]').on('input', function () {
				var wordColor = $(this).val();
				$('.video-comment input[type=text]').css('color', wordColor);
			});
			//发送弹幕
			$('.video-comment span').off('click').on('click', function (){
				var $that = $('.video-comment');
				$that.find('.setBox').fadeOut();
				$that.removeClass('commentActive');
				var name = parseInt($videoCt[0].currentTime) + 1,
					action = $that.find('input[name=action]:checked').val(),
					speed = $that.find('input[name=speed]').val(),
					color = $that.find('input[type=color]').val(),
					top = $that.find('input[name=top]').val(),
					fontSize = $that.find('input[name=fontSize]').val(),
					word = $that.find('input[type=text]').val();
				$('.screenShootBox').append($(`<p name="${name}" class="screenShoot" data-status="0" data-action="${action}" data-speed="${speed}" style="color:${color};top:${top}%;font-size:${fontSize}px;">${word}</p>`));
				$('.video-comment input[type=text]').val("");
			});

			//弹幕开关
			$('.video-barrage').off('click').on('click', function () {
				if (intOpts.commentSwitch) {
					intOpts.commentSwitch = false;
					$('.screenShootBox').fadeOut();
					$(this).addClass('barrageClose');
					$('.video-comment').fadeOut();
				} else {
					intOpts.commentSwitch = true;
					$('.screenShootBox').fadeIn();
					$(this).removeClass('barrageClose');
					$('.video-comment').fadeIn();
				}
			});

			//反转
			$('.video-reversal').off('click').on('click', function () {
				$videoCt.toggleClass('videoStatus');
			});

			//播放速度
			$('.video-playSpeed').off('click').on('click', function () {
				comStop();
				var value = parseFloat($(this).text().split('x').join(""));
				if (value >= 3) {
					value = 0;
				}
				value = value + 0.5;
				$videoCt[0].playbackRate = value;
				intOpts.playSpeed = value;
				$(this).text(value + 'x');
			});
			//点击切换视频资源
			$videoCt_clarity.find('span').off("click").on('click', function () {
				var ind = $(this).index();
				$videoCt_clarity.find('span').removeClass('disabled');
				$(this).addClass('disabled');
				$videoCt_clarity.find('p').text($(this).text());
				intOpts.clarityType = opts.clarity.type[ind];
				intOpts.claritySrc = opts.clarity.src[ind];
				$videoCt.attr('src', intOpts.claritySrc);
				$('.video-seek video').attr('src', intOpts.claritySrc);
				opts.autoplay = true;
				intOpts.cutover = false;
				$('#video').on('canplay',function(){
					intOpts.duration = $(this).prop('duration');
				})
				$videoCt[0].currentTime = intOpts.currentTime;
				getVideoInf();
			})

			//下载
			$('.video-update').attr('download', intOpts.title);
			$('.video-update').attr('href', intOpts.claritySrc);

			//全屏
			$videoCt_screen.off('click').on('click', function () {
				if (intOpts.fullScreen == true) {
					exitFullscreen();
					$('body').removeClass('fullScreen');
					intOpts.fullScreen = false;
				} else {
					requestFullScreen();
					$('body').addClass('fullScreen');
					intOpts.fullScreen = true;
				}
				$('.seek-slider').css('left', intOpts.currentTime / intOpts.duration * $('.video-seek').width() - 8);
				$('.seek-con').css('width', intOpts.currentTime / intOpts.duration * $('.video-seek').width());
			})
		}
	}
	//调用该函数
	getVideoInf();
	//进度条滑块,参数(7个)
	function move(slider, box, con, radius, fn, vBox, vFollow) {
		var vBox = vBox || false;
		var vFollow = vFollow || false;
		var moveStatus = false;
		var sL = slider.offset().left;
		slider.click(function(){
		}).mousedown(function(e){
			moveStatus = true;
			sL = e.pageX - parseInt(slider.css('left'));
		})
		$(document).mousemove(function(e){
			if(moveStatus){
				var diffL = e.pageX - sL;
				show(diffL);
			}
		}).mouseup(function(){
			moveStatus = false;
		});
		box.off('click').on('click',function (e) {
			var diffL = e.pageX - box.offset().left - radius;
			show(diffL);
		});
		function show(x) {
			if( x >= -1*radius && x <= parseInt(box.width() - radius)){
				slider.css('left',x);
				con.css('width',x+radius);
				if(vBox){
					var fnIndex = $videoCt[0].duration * (x+radius)/box.width();
					intOpts.currentTime = fnIndex;
					comClear();
					vBox.text(gTimeFormat(fnIndex));
				}else{
					var fnIndex = (x+radius)/box.width();
				}
				fn(fnIndex);
			}
		}
		if(vFollow){
			//暂停播放
			var seTimer;
			var vPlay = function() {
				if(!intOpts.status) {
					$videoCt[0].play();
					intOpts.status = true;
					seTimer = setInterval(function () {
						var vprpo = $videoCt[0].currentTime/$videoCt[0].duration;
						if(intOpts.cutover){
							var vBTime = $videoCt[0].buffered.end(0)/$videoCt[0].duration;
						}
						if( vprpo < 1){
							var tl = vprpo * (box.width() - radius);
							var bL = vBTime * box.width();
							intOpts.currentTime = $videoCt[0].currentTime;
							vBox.text(gTimeFormat($videoCt[0].currentTime));
							slider.css('left',tl);
							con.css('width',tl+radius);
							$('.seek-buffer').css('width',bL);
							intStatus();
							if($videoCt[0].duration - $videoCt[0].currentTime > 6){
								comRun(parseInt($videoCt[0].currentTime));
							}else{
								comStore();
							}
						}else if(vprpo == 1){
							clearInterval(seTimer);
							intOpts.status = false;
							return true;
						}else{
							clearInterval(seTimer);
							intOpts.status = true;
							return true;
						}
					},10);
				} else {
					$videoCt[0].pause();
					intOpts.status = false;
					comStop();
					clearInterval(seTimer);
				}
			};

			if((intOpts.status || intOpts.cutover) && opts.autoplay){
				intOpts.status = false;
				vPlay();
			}

			$videoCt_play.removeClass('video-pause');
			$videoCt_play.off('click').on('click',vPlay);
			$videoCt.off('click').on('click',vPlay);

			$videoCt.bind('play', function() {
				$videoCt_play.addClass('video-pause');
			});

			$videoCt.bind('pause', function() {
				$videoCt_play.removeClass('video-pause');
			});

			$videoCt.bind('ended', function() {
				$videoCt_play.removeClass('video-pause');
			});
		}
	}
	//时间格式化
	var gTimeFormat = function (seconds) {
		//格式化分钟
		var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
		//格式化秒
		var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
		//返回值
		return m + ':' + s;
	}
	//进度条显示
	function hoverPlay(e) {
		var view = e.pageX - $('.video-seek').offset().left + 1;
		var time = $videoCt[0].duration * view / $('.video-seek').width();
		if(view <= 30){
			$('.video-seek .viewBox').css('left',-20);
			$('.video-seek .viewBox i').css('left',view+15);
		}else if(view >= ($('.video-seek').width()-30)){
			$('.video-seek .viewBox').css('left',$('.video-seek').width()-80);
			$('.video-seek .viewBox i').css('left',view-$('.video-seek').width()+75);
		}else{
			$('.video-seek .viewBox').css('left',view - 50);
			$('.video-seek .viewBox i').css('left',44);
		}
		$('.video-seek video')[0].currentTime = time;
		$('.video-seek span').text(gTimeFormat(time));
		$('.video-seek .viewBox').fadeIn();
	}
	//视频跳转
	function videoJump(timer) {
		$videoCt[0].currentTime = timer;
	}
	//视频网络卡端
	function intStatus() {
		//判断状态值是否等于4
		if($videoCt[0].readyState == 4){
			$('.video-status').fadeOut(100);
		}else{
			$('.video-status').fadeIn(100);
			//调用弹幕停止函数
			comStop();
		}
	}
	//音量调节
	function audioJump(volume) {
		opts.volume = volume;
		$videoCt[0].volume = volume;
	}
	//弹幕运行
	function comRun(time) {
		if(comTimer != time){
			$(".screenShoot[name="+ time +"][data-status='0']").each(function () {
				var that = $(this);
				var i = that.index();
				var t = that.data('speed')*1000 / intOpts.playSpeed;
				if(that.data('action') == 'stay'){
					that.fadeIn();
					comStayTimer[i] = setTimeout(function () {
						that.attr('data-status',3);
					},t);
				}else{
					that.css('display','block');
					that.animate({'left': -40 + '%'},t,'linear');
					comStayTimer[i] = setTimeout(function () {
						that.attr('data-status',3);
					},t);
				}
				that.attr('data-status',1);
			});
			$(".screenShoot[data-status='2']").each(function () {
				var that = $(this);
				var i = that.index();
				var difTime = 1000*(that.data('speed') - (time - that.attr('name')))/intOpts.playSpeed;
				if(that.data('action') == 'stay'){
					comStayTimer[i] = setTimeout(function () {
						that.attr('data-status',3);
					},difTime);
				}else{
					that.animate({'left': -40 + '%'},difTime,'linear');
					comStayTimer[i] = setTimeout(function () {
						that.attr('data-status',3);
					},difTime);
				}
				that.attr('data-status',1);
			});
			$(".screenShoot[data-status='3']").each(function () {
				if($(this).data('action') == 'marquee'){
					$(this).css('left', 110 + '%');
				}
				$(this).css('display','none');
				$(this).attr('data-status',0);
			});
			comTimer = time;
		}
	}
	//弹幕停止
	function comStop() {
		$(".screenShoot[data-status='1']").each(function () {
			var that = $(this);
			var i = that.index();
			clearTimeout(comStayTimer[i]);
			if(that.data('action') == 'marquee'){
				$(this).stop();
				$(this).css('left',110 + '%');
			}
			$(this).fadeOut();
			that.attr('data-status',0);
		})
	}
	 //弹幕清除
	function comClear() {
		$(".screenShoot[data-status='1']").each(function () {
			var that = $(this);
			var i = that.index();
			clearTimeout(comStayTimer[i]);
			if(that.data('action') == 'marquee'){
				$(this).stop();
				$(this).css('left', 110 + '%');
			}
			$(this).fadeOut();
			that.attr('data-status',0);
		});
	}
	//弹幕存储
	function comStore() {
		if(comStroeStatus == 0){
			var dataArr = [];
			var date = new Date();
			var time= date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
			$('.screenShoot').each(function () {
				var data = {
					"word": $(this).text(),
					"color": $(this).css('color'),
					"speed": $(this).data('speed'),
					"top": $(this).css('top').split('%').join(''),
					"fontSize": $(this).css('fontSize').split('px').join(''),
					"action": $(this).data('action'),
					"time": $(this).attr('name')
				};
				dataArr.push(data);
			})
			var obj = {
				"title": intOpts.commentTitle,
				"id": intOpts.commentId,
				"time": time,
				"number": $('.screenShoot').length,
				"class": intOpts.commentClass,
				"data": dataArr
			}
			intOpts.comment = JSON.stringify(obj, null, '  ');
			comStroeStatus = 1;
		}
	}
	//进入全屏
	function requestFullScreen() {
		//获取元素
		var de = document.documentElement;
		//判断元素是否全屏
		if(de.requestFullScreen){
			de.requestFullScreen();
		}
	}
	//退出全屏
	function exitFullscreen() {
		var d = document;
		if(d.exitFullscreen){
			d.exitFullscreen();
		}
	}
	//扩展功能
	function videoDom(opts) {
		var title = $('<h1 class="video-title"></h1>');//标题
		var barrage = $('<div class="video-barrage"></div>');//弹幕
		var comment = $(`<form class="video-comment">
							<input type="text" placeholder="输入你的评论" />
							<div>
								<p></p>
								<span>确定</span>
							</div>
							<div class="setBox">
								<div class="group">
										<label>颜色:</label><input type="color" name="color" value="#000" />
										<label>大小:</label><input type="number" name="fontSize" value="16" step="1" min="10" max="30"/><span>像素</span>
								</div>
								<div class="group">
										<label>位置:</label><input type="number" name="top" value="10" step="1" min="0" max="80" /><span>%</span>
										<label>时间:</label><input type="number" name="speed" value="10" step="1" min="5" max="30" /><span>停留</span>
								</div>
								<div class="group">
										<label>动作:</label>
										<input type="radio" name="action" value="marquee" checked /><span>滚动</span>
										<input type="radio" name="action" value="stay" /><span>停留</span>
								</div>
								<i class="close">×</i>
							</div>
					</form>`);//评论
		var reversal = $('<div class="video-reversal"></div>');//翻转
		var playSpeed = $('<div class="video-playSpeed">1x</div>');//播放速度
		var update = $('<a class="video-update"></a>');//下载
		//判断添加内容
		if(opts.title){
			$videoCt.after(title);
		}
		if(opts.barrage){
			barrage.appendTo($('.video-controls'));
			$('.video-controls').after($('<div class="screenShootBox"></div>'));
		}
		if(opts.reversal){
			reversal.appendTo($('.video-controls'));
		}
		if(opts.playSpeed){
			playSpeed.appendTo($('.video-controls'));
		}
		if(opts.update){
			update.appendTo($('.video-controls'));
		}
		if(opts.clarity.type && opts.clarity.src){
			//定义一个空字符串
			var str = '';
			for(var i = 0;i < opts.clarity.type.length;i++){
				str = str + `<span>${opts.clarity.type[i]}</span>`
			}
			var clarity = `<div class="video-clarity">
								<p>${opts.clarity.type[0]}</p>
								<nav>${str}</nav>
							</div>`;//清晰度
			$(clarity).appendTo($('.video-controls'));
		}
		if(opts.comment){
			comment.appendTo($('.video-controls'));
		}
	}

	//返回对象
	return {
		title: '',
		status: false,
		currentTime: '0.00001',
		duration: '',
		volume: '',
		clarityType: '',
		claritySrc: '',
		fullScreen: false,
		reversal: false,
		playSpeed: 1,
		cutover: true,
		commentTitle: '',
		commentId: '',
		commentClass: '',
		commentSwitch: true,
		comment: function () {
			return intOpts.comment;
		}
	}
}
