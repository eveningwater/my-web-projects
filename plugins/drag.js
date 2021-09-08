
/*
* 功能:判断是否是一个字符串
* params@1:字符串
*/

export function isStr(str) {
    return typeof str === 'string';
}

/*
* 功能:判断是否是一个undefined
* params@1:值
*/

export function isUndefined(value) {
    return typeof value === 'undefined';
}
/*
* 功能:判断是否是一个函数
* params@1:值
*/

export function isFunction(fn) {
    return typeof fn === 'function';
}

/*
* 功能:判断是否是一个对象
* params@1:对象
*/

export function isShallowObject(obj) {
    return obj !== null && typeof obj === 'object';
};
/*
* 功能:判断是否是一个对象
* params@1:对象
*/

export function isDeepObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
};

/*
* 功能:判断是否是一个数组
* params@1:对象
*/

export function isDeepArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};

/*
* 功能:将类数组对象转换成数组
* params@1:类数组对象
*/
export function ewObjToArray(obj) {
    if (obj && obj.length) {
        return Array.prototype.slice.call(obj);
    }
}
/*
* 功能:是否是绝对定位
* params@1:字符串
*/
export function isAbs(str) {
    return str.indexOf('absolute') > -1;
}
/*
* 功能:判断是否是一个DOM元素
* params@1:元素
*/
export function isDom(el) {
    return typeof HTMLElement === 'object' ? el instanceof HTMLElement : el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string' || el instanceof HTMLCollection || el instanceof NodeList;
}
/*
* 功能:合并对象
* params@1:源数据对象
* params@2~...:多个对象
*/

export function ewAssign(target, args) {
    if (target === null) return;
    if (Object.assign) {
        return Object.assign(target, args);
    } else {
        var _ = Object(target);
        for (var j = 1; j < arguments.length; j++) {
            var source = arguments[j];
            if (source) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        _[key] = source[key];
                    }
                }
            }
        }
        return _;
    }
};

/*
* 功能:错误函数
* params@1:字符串
*/

export function ewError(str) {
    return new Error(str);
}

/*
* 功能:深度克隆对象
* params@1:对象
*/

export function deepCloneObjByJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/*
* 功能:深度克隆对象
* params@1:对象
*/
export const deepCloneObjByRecursion = (function f(obj) {
    if (!isShallowObject(obj)) return;
    let cloneObj = isDeepArray(obj) ? [] : {};
    for (var k in obj) {
        cloneObj[k] = isShallowObject(obj[k]) ? f(obj[k]) : obj[k];
    }
    return cloneObj;
})
/*
* 功能:将CSS对象转成CSStext字符串
* 参数:css对象
*/
export function cssObjToStr(obj) {
    if (!isShallowObject(obj)) return;
    // 将大写字母换成短横线加小写字母

    var cssStr = '';
    for (var key in obj) {
        cssStr += keba(key) + ':' + obj[key] + ';';
    }
    return cssStr;
}
/*
* 功能:将大写字母换成短横线加小写字母
* 参数:字符串
*/
export function keba(str) {
    if (!isStr(str)) return;
    return str.replace(/A-Z/g, function (w) {
        return '-' + w.toLowerCase();
    })
}
/*
* 功能:获取css属性值
* params@1:元素对象
* params@2:css属性名
*/

export function getCss(el, prop) {
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
/*
* 功能:获取dom元素
* params@1:元素字符串
*/
export const getDom = function (ident) {
    var selector,
        sType = ident.slice(0, 1),
        identTxt = ident.slice(1);
    if (/^[#\.]/.test(sType)) {
        if (sType === "#") {
            selector = document.getElementById(identTxt);
        }
        else if (sType === ".") {
            selector = document.getElementsByClassName(identTxt);
        }
    } else {
        selector = document.getElementsByTagName(ident);
    }
    return selector;
};
//the event
export const eventType = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
var configArr = [];

/*
   * 功能:还原位置
   * params@1:元素，与还原属性名
*/

function restore(el,prop,spd){
    var timer = null;
    var speed = parseInt(el.style[prop]);
    let reduceSpeed = !isNaN(spd) && spd > 0 && spd <= speed ? spd : 50;
    el.style.transition = prop + ' .3s ease-out .1s';
    var clearValue = function () {
        speed -= reduceSpeed;
        el.style[prop] = speed + 'px';
        if (timer && speed <= 0) {
            el.style[prop] = '';
            clearTimeout(timer);
        }
        else {
            timer = setTimeout(clearValue, 100)
        }
    }
    clearValue();
}

/*
   * 功能:构造函数
   * params@1:配置对象
*/

function ewDrag(option) {
    var config,
        el,
        scopeEl,
        designEl,
        disabledButton;
    // 默认配置
    if (isStr(option) || isDom(option)) {
        el = isStr(option) ? getDom(option) : option;
        config = {
            width: window.innerWidth,
            height: window.innerHeight,
            isWindow: true
        };
    } else if (isDeepObject(option) && option.el) {
        el = isStr(option.el) ? getDom(option.el) : option.el;//拖动元素
        scopeEl = isStr(option.scopeEl) ? getDom(option.scopeEl) : option.scopeEl; // 限制范围元素
        designEl = isStr(option.designEl) ? getDom(option.designEl) : option.designEl;//指定拖动元素
        disabledButton = isStr(option.disabledButton) ? getDom(option.disabledButton) : option.disabledButton;//禁止按钮
        config = {
            width: option.width || window.innerWidth,
            height: option.height || window.innerHeight,
            scopeEl: option.scopeEl || null,
            isWindow: !isUndefined(option.isWindow) ? option.isWindow : true,
            origin: option.origin || false,
            designEl: designEl || null,
            startCB: isFunction(option.startCB) ? option.startCB : null,
            moveCB: isFunction(option.moveCB) ? option.moveCB : null,
            endCB: isFunction(option.endCB) ? option.endCB : null,
            dragDisabled: option.dragDisabled || false,
            disabledButton: disabledButton || null,
            grid: option.grid || [],
            ani_transition: isStr(option.ani_transition) || isDeepObject(option.ani_transition) ? option.ani_transition : null
        };
        // 限制拖拽
        if (config.scopeEl) {
            config.scopeEl = scopeEl.length ? scopeEl[0] : scopeEl;
            config.width = getCss(config.scopeEl, "width");
            config.height = getCss(config.scopeEl, "height");
        }
        if (option.axis) config.axis = option.axis;
    } else {
        return ewError('you should pass a string param or an object param!');
    }
    configArr.push(config);
    this.config = configArr;
    this.beforeInit(el, config);
    if (disabledButton) this.clickDisable(disabledButton, el, config);
    return this;
}
/*
* 功能:点击禁用
* params@1:禁用属性
* params@2:拖拽元素
* params@3:配置对象
*/

ewDrag.prototype.clickDisable = function (el, dragEl, config) {
    if (el && el.length > 0) {
        for (var d = 0, len = el.length; d < len; d++) {
            clickEvent(this, el[d]);
        }
    } else {
        clickEvent(this, el);
    }
    function clickEvent(scope, ele) {
        if (!ele) return;
        ele.onclick = function () {
            if (scope.config.length > 1) {
                scope.config.forEach(function (con) {
                    if (ewObjToArray(con.disabledButton).indexOf(ele) > -1) {
                        con.dragDisabled = !con.dragDisabled;
                        scope.beforeInit(con.el, con);
                    }
                })
            } else if (dragEl.length > 0) {
                scope.config[0].dragDisabled = !scope.config[0].dragDisabled;
                ewObjToArray(dragEl).forEach(function (drag) {
                    scope.beforeInit(drag, scope.config[0]);
                })
            } else {
                config.dragDisabled = !config.dragDisabled;
                scope.beforeInit(config.el, config);
            }
        }
    }
}

/*
* 功能:初始化前的一些配置设置
* params@1:元素字符串
*/

ewDrag.prototype.beforeInit = function (el, config) {
    //判断是单个还是多个拖动元素
    if (el && el.length > 0) {
        for (var j = 0, len = el.length; j < len; j++) {
            this.init(ewAssign(config, { el: el[j] }));
            this.resize(this, ewAssign(config, { el: el[j] }));
        }
    } else {
        config.el = el;
        this.init(config);
        this.resize(this, config);
    }
}

/*
* 功能:窗口拖动
* params@1:作用域
* params@2：配置对象
*/

ewDrag.prototype.resize = function (context, params) {
    window.onresize = function () {
        if (!params.scopeEl) {
            params.width = window.innerWidth;
            params.height = window.innerHeight;
        }
        context.init(params);
    };
};
/*
* 功能:初始化拖拽事件
* params@1:配置属性对象
*/

ewDrag.prototype.init = function (obj) {
    obj.width = parseInt(obj.width) <= parseInt(getCss(obj.el, "width")) ? window.innerWidth : parseInt(obj.width);
    obj.height = parseInt(obj.height) <= parseInt(getCss(obj.el, "height")) ? window.innerHeight : parseInt(obj.height);
    this.onMouseDown(obj);
};
/*
* 功能:鼠标按下
* params@1:配置对象
*/

ewDrag.prototype.onMouseDown = function (option) {
    // 指定拖拽区域的元素
    if (isDom(option.designEl)) {
        if (option.designEl.length > 0) {
            var _this = this;
            ewObjToArray(option.designEl).forEach(function (de) {
                if (_this.config.length > 1) {
                    _this.config.map(function (con) {
                        if (con.designEl && ewObjToArray(con.designEl).indexOf(de) > -1) {
                            mouseDown(_this, con.el, de, con);
                        }
                    })
                } else if (de.parentElement) {
                    mouseDown(_this, de.parentElement, de, _this.config[0]);
                } else {
                    mouseDown(_this, option.el, de, _this.config[0]);
                }
            })
        } else {
            mouseDown(this, option.el, option.designEl, option);
        }
    } else {
        mouseDown(this, option.el, option.el, option);
    }
    // 添加光标样式
    function setCursor() {
        this.style.cursor = 'move';
    }
    // 移除光标样式
    function deleteCursor() {
        this.style.cursor = '';
    }
    function mouseDown(scope, el, element, config) {
        // 禁用拖拽
        if (config.dragDisabled) {
            element.removeEventListener('mouseenter', setCursor);
            element.removeEventListener('mouseleave', deleteCursor);
            element['on' + eventType[0]] = null;
            document['on' + eventType[1]] = document['on' + eventType[2]] = null;
        } else {
            element.addEventListener('mouseenter', setCursor);
            element.addEventListener('mouseleave', deleteCursor);
            element['on' + eventType[0]] = function (e) {
                // 拖动开始时回调
                if (config.startCB) config.startCB();
                // 添加过渡效果
                if (config.ani_transition) el.style.cssText += isStr(config.ani_transition) && config.ani_transition.indexOf('transition') > -1 ? config.ani_transition : (cssObjToStr(config.ani_transition)).indexOf('transition') > -1 ? cssObjToStr(config.ani_transition) : '';
                var disX = eventType[0].indexOf('touch') > -1 ? e.changedTouches[0].clientX - el.offsetLeft : e.clientX - el.offsetLeft;
                var disY = eventType[0].indexOf('touch') > -1 ? e.changedTouches[0].clientY - el.offsetTop : e.clientY - el.offsetTop;
                scope.onMouseMove(el, config, disX, disY, eventType);
                scope.onMouseUp(el, element, config, eventType);
            };
        }
    }
};
/*
* 功能:鼠标拖动
* params@1:拖动元素
* params@2:设置的浮动属性
* params@3:配置对象
* params@4:当前拖动元素左偏移量
* params@5:当前拖动元素右偏移量
*/
ewDrag.prototype.onMouseMove = function (el, option, disX, disY, eventType) {
    var pos = getCss(el, 'position');
    document['on' + eventType[1]] = function (e) {
        var moveX, moveY, limitX, limitY;
        var clientX = eventType[0].indexOf('touch') > -1 ? e.changedTouches[0].clientX : e.clientX,
            clientY = eventType[0].indexOf('touch') > -1 ? e.changedTouches[0].clientY : e.clientY;
        el.style.margin = 0;
        // 由于相对定位影响因素太多，暂时修改成绝对定位，后期再考虑相对定位情况
        if (!isAbs(pos)) el.style.position = 'absolute';
        // 移动时回调
        if (option.moveCB) option.moveCB();
        // 网格
        if (isDeepArray(option.grid) && option.grid.length && option.grid.length <= 2) {
            var curX = clientX - disX, gridX = parseInt(option.grid[0]),
                curY = clientY - disY, gridY = parseInt(option.grid[1]);
            if (!isNaN(gridX)) moveX = gridX * (parseInt(curX / gridX));
            if (!isNaN(gridY)) moveY = gridY * (parseInt(curY / gridY));
        } else {
            moveX = clientX - disX;
            moveY = clientY - disY;
        }
        limitX = option.width - el.offsetWidth;
        limitY = option.height - el.offsetHeight;
        if (option.axis) {
            if (option.axis.toLowerCase().indexOf('x') > -1) {
                this.moveLeft(el, option, moveX, limitX);
            } else if (option.axis.toLowerCase().indexOf('y') > -1) {
                this.moveTop(el, option, moveY, limitY);
            } else {
                throw ewError('a Invalid value of axis!');
            }
        } else {
            this.moveLeft(el, option, moveX, limitX);
            this.moveTop(el, option, moveY, limitY);
        }
    }.bind(this);
};


/*
* 功能:left偏移量
* params@1:元素
* params@2:配置对象
* params@3:移动X轴坐标
* params@4:限制X轴坐标
*/

ewDrag.prototype.moveLeft = function (el, option, moveX, limitX) {
    var left = moveX <= 0 && option.isWindow ? 0 : moveX >= limitX && option.isWindow ? limitX : moveX;
    el.style.left = left + 'px';
}
/*
* 功能:top偏移量
* params@1:元素
* params@2:配置对象
* params@3:移动y轴坐标
* params@4:限制y轴坐标
*/

ewDrag.prototype.moveTop = function (el, option, moveY, limitY) {
    var top = moveY <= 0 && option.isWindow ? 0 : moveY >= limitY && option.isWindow ? limitY : moveY;
    el.style.top = top + 'px';
}
/*
* 功能:还原left偏移量
* params@1:元素
*/
ewDrag.prototype.restoreX = function (el,spd) {
    restore(el,'left',spd);
}

/*
* 功能:还原top偏移量
* params@1:元素
*/
ewDrag.prototype.restoreY = function (el,spd) {
    restore(el,'top',spd);
}

/*
* 功能:鼠标停止拖动
* params@1:元素
* params@2:指定拖拽元素
* params@2:配置对象
*/

ewDrag.prototype.onMouseUp = function (el, element, option, eventType) {
    document['on' + eventType[2]] = function () {
        // 结束回调
        if (option.endCB) option.endCB();
        document['on' + eventType[1]] = document['on' + eventType[2]] = null;
        // 鼠标光标还原 
        element.style.cursor = '';
        // 还原位置
        if (option.origin) {
            if (option.axis) {
                if (option.axis.toLowerCase().indexOf('x') > -1) {
                    this.restoreX(el,option.originSpeed);
                } else if (option.axis.toLowerCase().indexOf('y') > -1) {
                    this.restoreY(el,option.originSpeed);
                } else {
                    throw ewError('a Invalid value of axis!');
                }
            } else {
                this.restoreX(el,option.originSpeed);
                this.restoreY(el,option.originSpeed);
            }
            el.style.cssText = 'margin:0;position:"";';
        }
    }.bind(this);
};

export default ewDrag;