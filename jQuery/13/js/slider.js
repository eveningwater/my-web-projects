/**
 * 滑块封装
 * @param {*} obj
 */
$.fn.rangeSlider = function (obj) {
    //浏览器兼容性处理
    var userAgent = navigator.userAgent;
    var isWebkit = (userAgent.indexOf("AppleWebKit") >= 0);
    var isIE = isIE();
    function isIE() {
        var isIE = false;
        if (window.ActiveXObject || "ActiveXObject" in window) {
            isIE = true;
        } else {
            isIE = (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1
                && !(userAgent.indexOf("Opera") > -1));
            isIE = false;
        }
        return isIE;
    }
    /**
     * 处理滑块的值
     * @param {*} value 
     */
    var handleValue = this.handleValue = function (value) {
        return ((Number(value) + Math.abs(min)) / (max + Math.abs(min))) * 100;
    }
    /**
     * 处理滑块的值
     * @param {*} el 
     * @param {*} value 
     */
    var changeCSS = this.changeCSS = function (el, value) {
        if (isWebkit) {
            return el.css('background', 'linear-gradient(to right, #059CFA, white ' + value + '%, white)');
        }
    };
    //对象参数
    this.sliderObj = {
        min: obj && isNaN(obj.min) ? 0 : Number(obj.min),
        max: obj && isNaN(obj.max) ? 0 : Number(obj.max),
        value: obj && isNaN(obj.value) ? 0 : Number(obj.value),
        step: obj && Number(obj.step) ? obj.step : 1,
        callback: obj && obj.callback ? obj.callback : null
    }
    //定义变量
    var $input = $(this),
        min = this.sliderObj.min,
        max = this.sliderObj.max,
        step = this.sliderObj.step,
        callback = this.sliderObj.callback;
    //向range添加属性,最小值,最大值,步长
    $input.attr('min', min).attr('max', max).attr('step', step).attr('value',this.sliderObj.value);
    //通过判断浏览器兼容性来触发不同的事件
    var event = isIE ? "change" : "input";
    changeCSS($input, handleValue($input.val()));
    //滑动事件
    $input.on(event, function () {
        //添加值
        $input.attr('value', this.value);
        // 改变滑块的背景样式
        changeCSS($(this), handleValue($(this).val()));
        //回调函数触发
        if ($.isFunction(callback)) {
            callback(this);
        }
    }); 
}