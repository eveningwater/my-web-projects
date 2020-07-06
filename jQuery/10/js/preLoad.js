/*
* 预加载封装
*/
(function($){
	//加载函数的定义,参数图片数组与属性
	function preLoad(imgs,options){
		//接收图片参数与属性参数,并作处理
		this.imgs = typeof imgs === 'string' ? [imgs] : imgs;
		//这里是将默认属性还有传入的参数合并成一个新对象
		this.opts = $.extend({},preLoad.DEFAULTS,options);
		//定义内部方法无序加载图片
		this._unordered();
	}
	//默认属性设置
	preLoad.DEFAULTS = {
		each:null,//每一张图片加载完成后
		all:null//所有图片加载完成后
	}
	//通过原型链来定义无序加载函数
	preLoad.prototype._unordered = function(){
		//图片接收与属性接收
		let imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;
		//遍历图片数组,参数,数组索引,图片路径
		$.each(imgs,function(i,src){
			//处理一下图片的src
			if(typeof src !== 'string'){
				return;
			}
			//重新创建一个图片对象
			let imgObj = new Image();
			//加载图片时
			$(imgObj).on('load error',function(){
				//每一张图片的遍历判断,加载一张图片传入count参数
				opts.each && opts.each(count);
				if(count >= len - 1){
					opts.all && opts.all();
				}
				count++;
			});
			//图片src属性赋值
			imgObj.src = src;
		})
	}
	//封装成函数,参数图片数组,属性
	$.extend({
		preload:function(imgs,opts){
			new preLoad(imgs,opts)
		}
	})
})(jQuery)