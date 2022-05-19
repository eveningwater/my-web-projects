/**
 * 功能:调用及传参
 * 作者:admin
 * 日期:2017/8/23.
 **/
'user strict';
let videoArr = ['http://rc417uu1f.hd-bkt.clouddn.com/video/猖獗.mkv'];
let nameArr = [];
videoArr.map((v) => {
	let n = v.slice(v.lastIndexOf('/') + 1,v.lastIndexOf('.'));
	nameArr.push(n);
})
window.onload = function () {
	//初始化
	var video = $('#video').videoCt({
		title: '我的视频',            //标题
		volume: 1,                //音量
		barrage: true,              //弹幕开关
		comment: true,              //弹幕
		reversal: true,             //镜像翻转
		playSpeed: true,            //播放速度
		update: true,               //下载
		autoplay: false,            //自动播放
		clarity: {
			type: nameArr,      //清晰度
			src:videoArr       //链接地址
		},
		commentFile: 'json/common.json'           //导入弹幕json数据
	});
	//扩展
	video.title;                    //标题
	video.status;                   //状态
	video.currentTime;              //当前时长
	video.duration;                 //总时长
	video.volume;                   //音量
	video.clarityType;              //清晰度
	video.claritySrc;               //链接地址
	video.fullScreen;               //全屏
	video.reversal;                 //镜像翻转
	video.playSpeed;                //播放速度
	video.cutover;                  //切换下个视频是否自动播放
	video.commentTitle;             //弹幕标题
	video.commentId;                //弹幕id
	video.commentClass;             //弹幕类型
	video.commentSwitch;            //弹幕是否打开
	$('#video').bind('ended', function() {
		/*console.log('弹幕json数据：\n'+ video.comment());*/  //获取弹幕json数据
	});
}