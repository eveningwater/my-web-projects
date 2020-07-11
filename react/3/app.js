//导入资源
import 'classlist-polyfill';
import Promise from 'bluebird';
import Markdown from 'markdown';
const md = Markdown.markdown.toHTML;
import workText from 'raw-loader!./work.txt';
import otherText from 'raw-loader!./other.txt';
import bottomHTML from 'raw-loader!./bottom.html';
let styleText = [0, 1, 2, 3].map(function(i) { return require('raw-loader!./styles' + i + '.css'); });
import preStyles from 'raw-loader!./prestyles.css';
import replaceURLs from './lib/replaceURLs';
import {default as writeChar, writeSimpleChar, handleChar} from './lib/writeChar';
import getPrefix from './lib/getPrefix';

//定义帮助我们干事的变量
const isDev = window.location.hostname === 'localhost';
const speed = isDev ? 0 : 16;
let style,styleEL,workEL,otherEL,skipAnimationEL,pauseEl,musicEL;
let animationSkipped = false,done = false,paused = false,musicpause = true;
let browserPrefix;

//开始时等待加载内容
document.addEventListener('DOMContentLoaded',function(){
	//分别调用浏览器链接地址获取函数,底部添加导航函数,获取元素函数,创建字符函数,开始动画函数
	getBrowserPrefix();
	populateBottom();
	getEls();
	createEventHandlers();
	startAnimation();
});
//开始动画函数
async function startAnimation(){
	try{
		await writeTo(styleEL,styleText[0],0,speed,true,1);
		await writeTo(workEL,workText,0,speed,false,1);
		await writeTo(styleEL,styleText[1],0,speed,true,1);
		createWorkBox();
		await Promise.delay(1000);
		await writeTo(styleEL,styleText[2],0,speed,true,1);
		await writeTo(otherEL,otherText,0,speed,false,1);
		await writeTo(styleEL,styleText[3],0,speed,true,1);
		createMusic();
	}
	catch(e){
		if(e.message === 'SKIP IT'){
			loadAnimationFast();
		}else{
			throw e;
		}
	}
}
//快速加载动画
async function loadAnimationFast(){
	if(done){
		return;
	}
	done = true;
	otherEL.innerHTML = md(otherText);
	let txt = styleText.join('\n');
	//加载work.txt的动画
	style.textContent = "#work-text * {" + browserPrefix + "transition:2s;}";
	style.textContent += txt;
	//定义stylehtml
	let styleHTML = "";
	//循环遍历添加html标签元素
	for(let i = 0,len = txt.length;i < len;i++){
		styleHTML = handleChar(styleHTML,txt[i]);
	}
	styleEL.innerHTML = styleHTML;
	//调用创建编辑器函数
	createWorkBox();
	//这里有一个滚动问题,获取当前时间
	let start = Date.now();
	while(Date.now() - 1000 > start){
		//Infinity 属性用于存放表示正无穷大的数值
		workEL.scrollTop = Infinity;
		styleEL.scrollTop = otherEL.scrollTop = Infinity;
		//延迟25s
		await Promise.delay(25);
	}
}
//定义变量用于判断写每一段就结束一段的正则
let endOfSentence = /[\.\?\!]\s$/;
let comma = /\D[\,]\s$/;
let endOfBlock = /[^\/]\n\n$/;
//写字函数
async function writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval){
	//判断动画,抛出异常错误
	if(animationSkipped){
		throw new Error('SKIP IT');
	}
	//在编辑器中写入字符或多个字符
	let chars = message.slice(index,index + charsPerInterval);
	index += charsPerInterval;
	//最终保证滚动条位置在底部
	el.scrollTop = el.scrollHeight;
	//如果遇到复杂的style样式不好写时,继续写就是了
	if(mirrorToStyle){
		writeChar(el,chars,style);
	}else{
		writeSimpleChar(el,chars);
	}
	//另一个编辑器的写法
	if(index < message.length){
		let thisInterval = interval;
		let thisSlice = message.slice(index - 2,index + 1);
		//匹配正则
		if(comma.test(thisSlice)){
			//定时时间赋值
			thisInterval = interval * 30;
		}
		if(endOfBlock.test(thisSlice)){
			thisInterval = interval * 50;
		}
		if(endOfSentence.test(thisSlice)){
			thisInterval = interval * 70;
		}
		//当点击暂停的时候暂停动画
		do{
			await Promise.delay(thisInterval);
		}while(paused);
		//返回写字函数
		return writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval);
	}
}
//根据浏览器的版本来确定css样式的渲染,最好是谷歌浏览器
function getBrowserPrefix(){
	browserPrefix = getPrefix();
	//遍历浏览器类型添加样式
	styleText = styleText.map(function(text){
		return text.replace(/-webkit-/g,browserPrefix);
	});
}
//获取元素
function getEls(){
	//在html里面创建style标签并添加样式
	let preStyleEL = document.createElement('style');
	preStyleEL.textContent = preStyles;
	//往头部前添加
	document.head.insertBefore(preStyleEL,document.getElementById('style-Tag'));
	//其它标签的获取与赋值
	style = document.getElementById('style-tag');
	styleEL = document.getElementById('style-text');
	workEL = document.getElementById('work-text');
	otherEL = document.getElementById('other-text');
	skipAnimationEL = document.getElementById('skip-animation');
	pauseEl = document.getElementById('pause');
	musicEL = document.getElementById('music');
}
//创建导航在底部
function populateBottom(){
	let bottom = document.getElementById('bottom');
	bottom.innerHTML = bottomHTML;
}

//为用户输入创建基本事件处理程序。
function createEventHandlers(){
	//镜像用户创建样式元素
	styleEL.addEventListener('input',function(){
		style.textContent = styleEL.textContent;
	});
	//点击跳过动画
	skipAnimationEL.addEventListener('click',function(e){
		//因为要阻止超链接默认点击事件
		e.preventDefault();
		//加载完动画
		animationSkipped = true;
		createMusic();
	});
	//点击暂停动画
	pauseEl.addEventListener('click',function(e){
		e.preventDefault();
		//判断如果点击暂停
		if(paused){
			pauseEl.textContent = "暂停动画 ||";
			paused = false;
		}else{
			pauseEl.textContent = "继续动画 >>";
			paused = true;
		}
	});
	//点击暂停音乐
	musicEL.addEventListener('click',function(){
		if(musicpause){
			this.classList.remove('rotate');
			document.getElementById('audio').pause();
			musicpause = false;
		}else{
			this.classList.add('rotate');
			document.getElementById('audio').play();
			musicpause = true;
		}
	});
}

//在滚动“工作”框时触发侦听器
function createWorkBox(){
	//如果样式能够翻转呢
	if(workEL.classList.contains('flipped')){
		return;
	}
	//工作框里添加点东西
	workEL.innerHTML = '<div class="text">' + replaceURLs(workText) + '</div>'+
		'<div class = "md">' + replaceURLs(md(workText)) + '</div>';
	//添加翻转样式
	workEL.classList.add('flipped');
	//滚动条高度
	workEL.scrollTop = 9999;
	//翻转式编辑器
	let flipping = 0;
	//滚动翻转,参数x坐标和y坐标
	require('mouse-wheel')(workEL,async function(dx,dy){
		//如果翻转
		if(flipping){
			return;
		}
		//定义翻转变量
		let flipped = workEL.classList.contains('flipped');
		//定义翻转到一半就翻转到另一面
		let half = (workEL.scrollHeight - workEL.clientHeight) / 2;
		let pastHalf = flipped ? workEL.scrollTop < half : workEL.scrollTop > half;
		//如果滚动到一半高度就翻转
		if(pastHalf){
			workEL.classList.toggle('flipped');
			flipping = true;
			await Promise.delay(600);
			workEL.scrollTop = flipped ? 0 : 9999;
			flipping = false;
		}
		//如果翻转了改变滚动方向,也就是初始化滚动条
		workEL.scrollTop += (dy * (flipped ? -1 : 1));
	},true);
}
function createMusic(){
	//添加动画效果
	musicEL.classList.add('rotate');
	//往页面添加audio标签播放音乐
	musicEL.innerHTML = '<audio src="https://www.eveningwater.com/static/resouces/audio/2.mp3" loop="loop" style="opacity: 0;" id="audio" autoplay="autoplay"></audio>';
}