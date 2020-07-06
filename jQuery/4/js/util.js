
/**
 * 功能:动画函数
 * @param {*} el 
 * @param {*} time 
 */
var ani = (function () {
    var animation = {};
    /**
     * 功能:创建一个时间类,用于处理定时器
     */
    function TimerManager() {
        this.timers = [];
        this.args = [];
        this.isTimerRun = false;
    }
    TimerManager.makeTimerManage = function (element) {
        if (
            !element.TimerManage ||
            element.TimerManage.constructor !== TimerManager
        ) {
            element.TimerManage = new TimerManager();
        }
    };
    TimerManager.prototype.add = function (timer, args) {
        this.timers.push(timer);
        this.args.push(args);
        this.timerRun();
    };
    TimerManager.prototype.timerRun = function () {
        if (!this.isTimerRun) {
            var timer = this.timers.shift(),
                args = this.args.shift();
            if (timer && args) {
                this.isTimerRun = true;
                timer(args[0], args[1]);
            }
        }
    };
    TimerManager.prototype.next = function () {
        this.isTimerRun = false;
        this.timerRun();
    };
    /**
     * 功能:jquery slideUp函数的封装
     * @param {*} element 
     * @param {*} time 
     */
    function slideUp(element, time) {
        if (element.offsetHeight > 0) {
            var totalHeight = element.offsetHeight;
            var currentHeight = totalHeight;
            var reduceValue = totalHeight / (time / 10);
            element.style.transition = "height " + time + " ms";
            element.style.overflow = "hidden";
            var timer = setInterval(function () {
                currentHeight -= reduceValue;
                element.style.height = currentHeight + "px";
                if (currentHeight <= 0) {
                    clearInterval(timer);
                    element.style.display = "none";
                    element.style.height = totalHeight + "px";
                    if (
                        element.TimerManage &&
                        element.TimerManage.constructor === TimerManager
                    ) {
                        element.TimerManage.next();
                    }
                }
            }, 10);
        } else {
            if (
                element.TimerManage &&
                element.TimerManage.constructor === TimerManager
            ) {
                element.TimerManage.next();
            }
        }
    }
    /**
     * 功能:jquery slideDown函数的封装
     * @param {*} element 
     * @param {*} time 
     */
    function slideDown(element, time) {
        if (element.offsetHeight <= 0) {
            element.style.display = "block";
            element.style.transition = "height" + time + " ms";
            element.style.overflow = "hidden";
            var totalHeight = element.offsetHeight;
            var currentHeight = 0;
            element.style.height = "0px";
            var addValue = totalHeight / (time / 10);
            var timer = setInterval(function () {
                currentHeight += addValue;
                element.style.height = currentHeight + "px";
                if (currentHeight >= totalHeight) {
                    clearInterval(timer);
                    element.style.height = totalHeight + "px";
                    if (
                        element.TimerManage &&
                        element.TimerManage.constructor === TimerManager
                    ) {
                        element.TimerManage.next();
                    }
                }
            }, 10);
        } else {
            if (
                element.TimerManage &&
                element.TimerManage.constructor === TimerManager
            ) {
                element.TimerManage.next();
            }
        }
    }
    /**
     * 功能:jquery fadeIn函数的封装
     * @param {*} element 
     * @param {*} time 
     */
    function fadeIn(element, time) {
        element.style.transition = "opacity" + time + " ms";
        element.style.display = 'block';
        if (!getCss(element, 'opactiy') || !parseInt(getCss(element, 'opactiy')) <= 0) {
            let curAlpha = 0;
            element.style.opacity = 0;
            let addAlpha = 1 * 100 / (time / 10);
            var timer = setInterval(function () {
                curAlpha += addAlpha;
                element.style.opacity = (curAlpha / 100).toFixed(2);
                if (curAlpha >= 100) {
                    clearInterval(timer);
                    element.style.opacity = 1;
                    if (
                        element.TimerManage &&
                        element.TimerManage.constructor === TimerManager
                    ) {
                        element.TimerManage.next();
                    }
                }
            }, 10);
        } else {
            if (
                element.TimerManage &&
                element.TimerManage.constructor === TimerManager
            ) {
                element.TimerManage.next();
            }
        }
    }
    /**
     * 功能:jquery fadeOut函数的封装
     * @param {*} element 
     * @param {*} time 
     */
    function fadeOut(element, time) {
        element.style.transition = "opacity" + time + " ms";
        if (!getCss(element, 'opactiy') || !parseInt(getCss(element, 'opactiy')) >= 1) {
            let curAlpha = 100;
            element.style.opacity = 1;
            let reduceAlpha = 1 * 100 / (time / 10);
            var timer = setInterval(function () {
                curAlpha -= reduceAlpha;
                element.style.opacity = (curAlpha / 100).toFixed(2);
                if (curAlpha <= 0) {
                    clearInterval(timer);
                    element.style.opacity = 0;
                    element.style.display = 'none';
                    if (
                        element.TimerManage &&
                        element.TimerManage.constructor === TimerManager
                    ) {
                        element.TimerManage.next();
                    }
                }
            }, 10);
        } else {
            if (
                element.TimerManage &&
                element.TimerManage.constructor === TimerManager
            ) {
                element.TimerManage.next();
            }
        }
    }
    //动画类管理这些动画函数
    animation.slideUp = function (element) {
        TimerManager.makeTimerManage(element);
        element.TimerManage.add(slideUp, arguments);
        return this;
    };
    animation.slideDown = function (element) {
        TimerManager.makeTimerManage(element);
        element.TimerManage.add(slideDown, arguments);
        return this;
    };
    animation.fadeIn = function (element) {
        TimerManager.makeTimerManage(element);
        element.TimerManage.add(fadeIn, arguments);
        return this;
    };
    animation.fadeOut = function (element) {
        TimerManager.makeTimerManage(element);
        element.TimerManage.add(fadeOut, arguments);
        return this;
    };
    return animation;
})();
/**
 * 功能:获取css样式
 * @param {*} el 
 * @param {*} prop 
 */
function getCss(el, prop) {
    var getStyle = el.currentStyle ? function (prop) {
        var propName = el.currentStyle[prop];
        if (propName.indexOf('height') > -1 && propName.search(/px/i) > -1) {
            var rect = el.getBoundingClientRect;
            return rect.bottom - rect.top - parseInt(getStyle('padding-bottom')) - parseInt(getStyle('padding-top')) + 'px';
        }
    } : function (prop) {
        return window.getComputedStyle(el, null)[prop];
    };
    return getStyle(prop);
};