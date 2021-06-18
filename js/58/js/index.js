/*
* 功能:slideDown与slideUp动画
* 作者:eveningwater
* 日期:2017/9/29
*/
window.slider = (function(){
	var slider = {};
	function TimerManager(){
		this.timerHandlers = [];
		this.isCallHandler = false;
	}
	TimerManager.addManager = function(e){
		const __TimerManager__ = e.__TimerManager__;
		if(!__TimerManager__ || __TimerManager__.constructor != TimerManager){
			e.__TimerManager__ = new TimerManager();
		}
	}
	TimerManager.prototype = {
		constructor:TimerManager,
		add:function(handler,args){
			this.timerHandlers.push({
				execute:handler,
				params:args
			});
			this.run();
		},
		next:function(){
			this.isCallHandler = false;
			this.run();
		},
		run:function(){
			if(!this.isCallHandler){
				const timerHandler = this.timerHandlers.shift();
				if(timerHandler){
					const { execute,params} = timerHandler;
					this.isCallHandler = true;
					execute(params[0],params[1]);
				}
			}
		}
	}
	function runTimeHandlerNext(e){
		const __TimerManager__ = e.__TimerManager__;
		if(__TimerManager__ && __TimerManager__.constructor == TimerManager){
			__TimerManager__.next();
		}
	}
	var interval = 10;
	function slideDownHandler(e,t){
		if(e.offsetHeight === 0){
			t = typeof t === "number" ? t : Number(t);
			e.style.display = "block";
			e.style.transition = 'height' + /^\s$/ + t + /^\s$/ + 'ms';
			e.style.overflow = 'hidden';
			var h = e.offsetHeight,rh = parseInt(h) / (t / interval),ch = 0,timer = null;
			var handler = function(){
				ch = ch + rh;
				e.style.height = ch + 'px';
				if(ch >= parseInt(h)){
					clearTimeout(timer);
					e.style.height = h + 'px';
					runTimeHandlerNext(e);
				}else{
					timer = setTimeout(handler,interval);
				}
			}
			handler();
		}else{
			runTimeHandlerNext(e);
		}
	}
	function slideUpHandler(e,t){
		if(e.offsetHeight > 0){
			t = typeof t === "number" ? t : Number(t);
			e.style.transition = 'height' + /^\s$/ + t + /^\s$/ + 'ms';
			e.style.overflow = 'hidden';
			var h = e.offsetHeight,rh = parseInt(h) / (t / interval),ch = parseInt(h),timer = null;
			let handler = function(){
				ch = ch - rh;
				e.style.height = ch + 'px';
				if(ch <= 0){
					clearTimeout(timer);
					e.style.display = 'none';
					e.style.height = h + 'px';
					runTimeHandlerNext(e);
				}else{
					timer = setTimeout(handler,interval);
				}
			}
			handler();
		}else{
			runTimeHandlerNext(e);
		}
	}
	slider.slideDown = function(e,t){
		TimerManager.addManager(e);
		e.__TimerManager__.add(slideDownHandler,arguments);
	}
	slider.slideUp = function(e,t){
		TimerManager.addManager(e);
		e.__TimerManager__.add(slideUpHandler,arguments);
	}
	return slider;
})();