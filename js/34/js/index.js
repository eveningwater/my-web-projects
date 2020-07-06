/*
 * 功能:javascript翻译工具
 * 日期:2017/10/26
 * 作者:eveningwater
 */
/***************************************************/
/* 功能：一些易用的方法函数的原生JavaScript实现 */
/***************************************************/

/**
* 功能：自定义选择器
* 方法qr()：获取元素列表中指定索引的元素
* 方法click()：为元素列表中所有的元素都添加一个点击事件
* 参数：CSS的ID、Class和标签选择器
**/
function qr(ident) {
	var selector,
		sType = ident.slice(0,1),
		identTxt = ident.slice(1);
	if (/^[#\.]/.test(sType)) {
		if (sType == "#") {
			selector = document.getElementById(identTxt);
		}
		else if(sType == ".") {
			selector = document.getElementsByClassName(identTxt);
		}
	}
	else {
		selector = document.getElementsByTagName(ident);
	}
	// 给获取到的元素列表内的每一个元素添加一个点击事件
	function sclick(callback) {
		for(var i = 0; i < selector.length; i++) {
			selector[i].index = i;
			selector[i].onclick = function() {
				callback();
				// console.log(this.index);
			}
		}
	}
	// 获取元素数组内指定索引的元素
	function getIndextElement(index) {
		return selector[index];
	}
	return {
		eq: getIndextElement,
		click: sclick
	};
}

/**
* 功能：给尚未生成的元素绑定特定事件的函数
* 参数：1、事件类型；2、选择标识符（标签名或class名）；3、需要执行的事件
**/
function onEvent(action,selector,callback){
	document.addEventListener(action,function(e){
		if(selector==e.target.tagName.toLowerCase() || selector==e.target.className){
			callback();
		}
	});
}
/*
* 判断元素是否有一个class类名
*/
Element.prototype.hasClass = function(classname) {
	var classlist = this.classList;
	var bool = false;
	classlist.forEach(function(ele,idx) {
		if(ele == classname) {
			bool = true;
		}
	});
	return bool;
}
/**
 * 
 * @param {*} el (输入框dom元素)
 * @param {*} extra (光标与输入框的距离,默认是0)
 * @param {*} maxHeight (输入框最大高度)
 */
function autoTextArea(el,extra,maxHeight){
	extra = extra || 0;
	var textOrtextArea = el.tagName.toLowerCase();
	//如果不是单行输入文本框或者多行输入文本框，就不执行后续操作
	if(textOrtextArea.indexOf('text') === -1 || textOrtextArea.indexOf('textarea') === -1)return;
	var isFireFox = document.getBoxObjectFor || 'mozInnerScreenX' in window,//是否火狐浏览器
		isOpera = window.opera && window.opera.toString().indexOf('opera');//是否opera浏览器
	//添加事件主流浏览器与IE浏览器的事件
	var addEvent = function(eventName,callback){
		el.addEventListener ? el.addEventListener(eventName,callback,false) : el.attachEvent('on' + eventName,callback);
	}
	// 获取元素的属性值。参数css属性名，如height
	var getStyle = el.currentStyle ? function(prop){
		var propName = el.currentStyle[prop];
		if(propName.indexOf('height') > -1 && propName.search(/px/i) > -1){
			var rect = el.getBoundingClientRect;//获取dom元素边框的所有位置属性
			//元素边框底部位置减去顶部边框位置减去上下内边距，就是获取到的元素的实际高度(IE标准盒子模型)
			return rect.bottom - rect.top - parseInt(getStyle('padding-bottom')) - parseInt(getStyle('padding-top')) + 'px';
		}
	} : function(prop){
		// 主流浏览器通过getComputedStyle()即可返回元素实际属性值,只返回高度
		return window.getComputedStyle(el,null)[prop];
	};
	//设置resize属性
	el.style.resize = 'none';
	//输入框的最小高度
	var minHeight = parseInt(getStyle('height'));
	// 实际内容被改变
	var contentHeightChange = function(){
		// 默认内边距为0，元素滚动距离顶部的距离，设置元素的样式
		var padding = 0,
			style = el.style,
			currentHeight;
		//如果不是火狐浏览器也不是opera浏览器，则内边距等于上下边距相加
		if(!isFireFox && !isOpera){
			padding = parseInt(getStyle('padding-bottom')) + parseInt(getStyle('padding-top'));
		}
		//文本框初始高度就为最小高度
		style.height = minHeight + 'px';
		//如果滚动高度大于了最小高度
		if(el.scrollHeight > minHeight){
			//如果最大高度存在，且滚动高度大于最大高度
			if(maxHeight && el.scrollHeight > maxHeight){
				//当前高度为最大高度减去内边距
				currentHeight = maxHeight - padding;
				style.overflowY = 'auto';
			}else{
				//当前高度等于滚动高度减去内边距
				currentHeight = el.scrollHeight - padding;
				style.overflowY = 'hidden';
			}
			//元素高度就等于当前高度加上光标与元素之间的距离
			style.height = currentHeight + extra + 'px';
		}
	}
	addEvent('propertychange',contentHeightChange)//除非表单元素被禁止，否则就会触发该事件，功能类似input事件
	addEvent('focus',contentHeightChange);
	addEvent('input',contentHeightChange);
	contentHeightChange();
}
/*变量定义部分*/
var type = qr('.lang-panel').eq(0).children;//获取语言类型标签
var result = qr('.result').eq(0);//获取语言选择后的结果标签
var input = qr('.input').eq(0),//获取输入内容标签
	output = qr('.output').eq(0);//获取输出结果标签
var transBtn = qr('.transbtn').eq(0),//获取翻译按钮
	clear = qr('.clear').eq(0);//获取清除按钮
var readBtn = qr('.playing-btn').eq(0);//获取读取播报
var readAudio = null;
var readFlag = false;
var readAPI = "";
var lang = "en",//语言类型
	timer = null,//定时器
	len = type.length;//语言类型标签的长度
var flag = true;
/**
 * 加载移动版
 */
function loadMobile(){
	var link = qr('link').eq(0),more = qr('.more').eq(0);
	link.href ="./css/indexmobile.css";
	qr('.lang-panel').eq(0).style.display = 'none';
	more.style.display = 'block';
	qr('.more').click(function(){
		if(flag){
			qr('.lang-panel').eq(0).style.display = 'block';
			flag = false;
		}else{
			qr('.lang-panel').eq(0).style.display = 'none';
			flag = true;
		}
	})
}
(function () {
	//如果是移动端
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
		loadMobile();
	}
	// 窗口拖动变化，小于1132，则切换移动版
	window.onresize = function(){
		var width = document.body.clientWidth || document.documentElement.clientWidth;
		if(width < 1132){
			loadMobile();
		}else{
			qr('link').eq(0).href = './css/index.css';
			qr('.more').eq(0).style.display = 'none';
			qr('.lang-panel').eq(0).style.display = 'block';
		}
	}
	function createScript(src) {
		//创建一个script标签
		var script = document.createElement('script');
		//添加src和id属性
		script.id = 'scriptSrc';
		script.src = src;
		//将script标签添加到body页面中
		document.body.appendChild(script);
	}
	function changeType() {
		//获取到属性data-type,此时this指向获取的语言类型标签
		lang = this.getAttribute('data-type');
		var width = document.body.clientWidth || document.documentElement.clientWidth;
		this.className = 'checked';
		for (var j = 0; j < len; j++) {
			if (this !== type[j]) {
				type[j].classList.remove('checked');
				if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) || width < 1132){
					qr('.lang-panel').eq(0).style.display = 'none';
					flag = true;
				}
			}
		}
		//然后将语言类型值赋值给结果标签
		result.innerHTML = this.innerHTML;
	}
	function translate() {
		//获取接口
		var value = 'https://api.fanyi.baidu.com/api/trans/vip/translate?';
		//获取当前时间
		var date = Date.now();
		//此处拼接接口数据,好转换成jsonp数据格式,实现跨域访问
		var str = '20180416000147222' + input.value + date + 'IvlTe9ogsiBHl9Muevzu';
		//使用加密算法计算数据
		var md5 = MD5(str);
		//然后得到的数据
		var data = 'q=' + input.value + '&from=auto&to=' + lang + '&appid=20180416000147222' + '&salt=' + date + '&sign=' + md5 + "&callback=callbackName";
		//引入src路径
		var src = value + data;
		//调用创建script标签函数
		createScript(src);
	}
	function init() {
		//循环添加点击事件
		for (var i = 0; i < len; i++) {
			//点击时间就是改变语言类型
			type[i].onclick = changeType;
		}
		//清除按钮点击事件
		clear.onclick = function () {
			input.value = "";
			this.className = 'checked';
			transBtn.className = '';
		}
		//点击翻译
		transBtn.onclick = function () {
			this.className = 'checked';
			clear.className = ''
			//如果输入内容为空则返回
			if (!input.value) {
				return;
			}
			//获取创建的script标签
			var s = document.getElementById('scriptSrc');
			//如果script标签已经存在删除了重新创建
			if (s) {
				s.parentNode.removeChild(s);
				translate();
			} else {
				translate();
			}
		}
		//点击读取单词
		readBtn.onclick = function(){
			readFlag = !readFlag;
			if(readFlag){
				if(output.value){
					this.classList.remove('playing-default-btn');
					this.classList.add('playing-pause-btn');
					readAudio = null;
					readAPI = "https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&per=3&text=" + encodeURI(output.value);
					readWord(readAPI);

				}
			}else{
				this.classList.remove('playing-pause-btn');
				this.classList.add('playing-default-btn');
				if(readAudio){
					readAudio.pause();
				}
			}
		}
	}
	init();
})();
//回调函数定义
function callbackName(str) {
	// console.log(str);
	return output.innerHTML = str.trans_result[0].dst;
}
/**
 *  读取单词
 * @param {*} word 
 */
function readWord(readAPI){
	readAudio = new Audio();
	readAudio.src = readAPI;
	readAudio.play();
	readAudio.addEventListener('ended',function(){
		readBtn.classList.add('playing-default-btn');
		readBtn.classList.remove('playing-pause-btn');
		readFlag = false;
	},false)
}