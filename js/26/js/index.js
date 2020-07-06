/*
* 功能:图片画廊函数封装
* 作者:eveningwater
* 日期:2017/9/5
*/
var Gallery = (function(){
	//变量定义部分
	var data = {},//转化的图片对象
		datalen = 0,//初始长度
		currentItem = null,//当前图片为空
		navHei = 60,//底部导航高度
		resizeTimeout = null,//延迟动画
		xmlhttp = new XMLHttpRequest(),//ajax对象
		url = 'data/data.json';//json数据
	//ajax加载json数据
	function Gallery(){
		//调用dom变动器函数
		observe();
		//监听页面状态
		xmlhttp.onreadystatechange = function(){
			// 如果XMLHttpRequest的状态为“请求已完成，且响应已就绪，并且状态为成功后执行回调函数
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				//接收json数据
				var myArr = JSON.parse(xmlhttp.responseText);
				//调用创建图片画廊函数
				setGallery(myArr);
				//初始化函数
				init();
			}
		}
		//异步请求url
		xmlhttp.open('GET',url,true);
		//发送请求
		xmlhttp.send();
	}
	//调用dom变动器函数
	function observe(){
		//定义dom操作
		var observeDom = (function(){
			//定义dom变动器监听dom变化
			var mutationObserver = window.MutationObserver || window.webkitMutationObserver,
				eventListenerSupport = window.addEventListener;
			//返回函数,参数对象与回调函数
			return function(obj,callback){
				//判断dom变化
				if(mutationObserver){
					//dom变化函数,参数
					var obs = new mutationObserver(function(mutations,observer){
						//判断新增的dom对象与删除的dom对象从而执行回调函数
						if(mutations[0].addedNodes.length || mutations[0].removedNodes.length){
							callback(mutations);
						}
					});
					//子元素的变动以及所有下属节点的变动的设置
					obs.observe(obj,{childList:true,subtree:false});
				}else if(eventListenerSupport){
					//给对象添加节点添加事件
					obj.addEventListener('DOMNodeInserted',callback,false);
				}
			}
		})();
		//图片dom元素操作
		observeDom(document.getElementById('gallery'),function(mutations){
			//原型链继承对象节点添加与层级的定义
			var gallery = [].slice.call(mutations[0].addedNodes),
				zIndex = 1;
			//遍历为dom添加图片元素
			gallery.forEach(function(item){
				//获取第一张图片
				var img = item.getElementsByTagName('img')[0],
					first = true;
				//为图片添加加载事件
				img.addEventListener('load',function(){
					//判断第一张状态
					if(first){
						currentItem = item;
						first = false;
					}
					//对象的赋值
					data[item.id] = {item:item,width:item.offsetWidth,height:item.offsetHeight};
					//长度自加
					datalen++;
					//点击事件添加
					item.addEventListener('click',function(){
						select(item);
						defaultArrangeAll();
					});
					defaultArrange(item,zIndex++);
				})
			})
		})
	}
	//创建图片画廊函数
	function setGallery(arr){
		//定义空字符串
		var str = "";
		//循环遍历json数据并添加到页面中
		for(var i = 0;i < arr.length;i++){
			str += `<section id = ${i}>
						<img src = "img/${arr[i].name}" alt = "${arr[i].name}" />
						<span>${arr[i].caption}</span>
					</section>`;
		}
		document.getElementById('gallery').innerHTML = str;
	}
	//初始化
	function init(){
		//调用控制上一张下一张函数
		nextPrevFun();
		//监听页面窗口大小事件
		window.addEventListener('resize',function(){
			//判断延迟动画状态
			if(resizeTimeout){
				//清空延迟动画
				clearTimeout(resizeTimeout);
			}
			resizeTimeout = setTimeout(function(){
				//调用默认排列所有图片函数
				defaultArrangeAll();
				//判断当前选择的图片来调用函数
				if(currentItem){
					//调用选择图片画廊函数
					select(currentItem);
				}
			},1000)
		});
	}
	//选择图片点击函数
	function select(item){
		//缩放程度
		var scale = 1.2;
		//取随机数
		var randomNum = 0;
		//初始化宽度和高度
		var initWidth = data[item.id].width,
			initHeight = data[item.id].height;
		//变换的宽度和高度
		var newWidth = initWidth * scale,
			newHeight = initHeight * (newWidth / initWidth);
		//位移变换x值与y值
		var x = (window.innerWidth - newWidth) / 2,
			y = (window.innerHeight - newHeight - navHei) / 2;
		//设置相关变换动画
		item.style.tranformOrigin = '0 0';//变换起点
		item.style.transform = `translate(${x}px,${y}px) rotate(${randomNum}deg) scale(${scale})`;//变换
		item.style.zIndex = 999;//设置层级
		//当前图片就为设置后的图片
		currentItem = item;
	}
	//默认加载时图片排列函数,参数(图片本身,与层级)
	function defaultArrange(item,zIndex){
		//随机x坐标与y坐标
		var randomX = Math.random(),
			randomY = Math.random();
		//最大和最小旋转角度
		var maxR = 45,
			minR = -45;
		//计算旋转角度
		var randomNum = Math.random() * (maxR - minR) + minR,
			randomCount = randomNum * Math.PI / 180;
		//旋转宽度与高度
		var rWidth = Math.abs(item.offsetWidth * Math.cos(randomCount)) + Math.abs(item.offsetHeight * Math.sin(randomCount)),
			rHeight = Math.abs(item.offsetWidth * Math.sin(randomCount)) + Math.abs(item.offsetHeight * Math.cos(randomCount));
		//旋转x坐标与y坐标
		var x = Math.floor((window.innerWidth - rWidth) * randomX),
			y = Math.floor((window.innerHeight - rHeight) * randomY);
		//设置相关变换动画
		item.style.tranformOrigin = '0 0';//变换起点
		item.style.transform = `translate(${x}px,${y}px) rotate(${randomNum}deg) scale(1)`;//变换
		item.style.zIndex = zIndex;//设置层级
	}
	//默认初始化所有图片排列函数
	function defaultArrangeAll(){
		//初始化层级
		var zIndex = 0;
		//遍历元素
		for(var x in data){
			//判断如果当前选择的图片id不等于遍历的下标
			if(x !=  currentItem.id){
				//调用默认加载时排列图片函数
				defaultArrange(data[x].item,zIndex++);
			}
		}
	}
	//控制上一张下一张函数
	function nextPrevFun(){
		//获取上一张下一张按钮
		var prev = document.getElementById('prev'),
			next = document.getElementById('next');
		//事件监听
		prev.addEventListener('click',function(){
			//设置当前图片索引
			var currentIndex = Number(currentItem.id) - 1;
			//判断如果索引小于0,则为图片最大索引
			if(currentIndex < 0){
				currentIndex = datalen - 1;
			}
			//调用选择图片函数
			select(data[currentIndex].item);
			//调用默认初始化所有图片排列函数
			defaultArrangeAll();
		});
		next.addEventListener('click',function(){
			//设置当前图片索引
			var currentIndex = Number(currentItem.id) + 1;
			//判断如果当前图片索引大于等于图片数组长度
			if(currentIndex >= datalen){
				currentIndex = 0;
			}
			//调用选择图片函数
			select(data[currentIndex].item);
			//调用默认初始化所有图片排列函数
			defaultArrangeAll();
		});
	}
	
	//返回函数对象
	return Gallery;
})();