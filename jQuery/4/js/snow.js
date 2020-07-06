/**
 *  功能:雪花特效
 *  日期:2019/5/29
 */

/**
 * **************** 动画函数兼容写法**********************
 */
var requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame || function (callback) { setTimeout(callback, 1000 / 60); };
})();
var cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
        window.webkitCancelAnimationFrame || window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame;
})();
/*
* 功能:判断是否是一个DOM元素
* 参数:元素
*/
function isDom(el) {
    return typeof HTMLElement === 'object' ? el instanceof HTMLElement : el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string' || el instanceof HTMLCollection || el instanceof NodeList;
}
/**
 * 构造函数
 * @param {*} 元素 
 * @param {*} 雪花配置对象 
 */
function ewSnow(element, option) {
    //配置属性
    var snowOption = option || {};
    this.snowNumber = snowOption.snowNumber || 200;//雪花数量
    this.snowShape = snowOption.snowShape || 5;//雪花形状
    this.fallSpeed = snowOption.speed || 1;//下落速度
    this.el = element;//添加的元素
    return this;
}
/**
 *   雪花初始化
 * 
 */
ewSnow.prototype.init = function () {
    //创建画布
    this.createSnowCanvas();
    //创建雪花形状
    this.createSnowShape();
    //画雪花
    this.drawSnow();
}
/**
 *  创建canvas画布
 * 
 */
ewSnow.prototype.createSnowCanvas = function () {
    this.snowCan = document.createElement('canvas');//创建canvas标签
    this.snowCtx = this.snowCan.getContext('2d');//获取画布
    this.snowCan.id = "snowCanvas";//为canvas标签设置id
    this.snowCan.style.cssText += 'position:absolute;z-index:1;left:0;top:0;';//设置canvas标签css样式
    this.snowCan.width = isDom(this.el) && !this.el.length ? this.el.offsetWidth : document.documentElement.clientWidth;//设置canvas宽
    this.snowCan.height = isDom(this.el) && !this.el.length ? this.el.offsetHeight : document.documentElement.clientHeight;//设置canvas高
    //当窗口大小发生变化
    window.onresize = function () {
        this.snowCan.width = document.documentElement.clientWidth;
        this.snowCan.height = document.documentElement.clientHeight;
    }.apply(this);
    //将canvas元素添加到页面中
    if (isDom(this.el)) {
        if (this.el.length) return;
        this.el.appendChild(this.snowCan);
    } else {
        document.body.appendChild(this.snowCan);
    }
}
/**
 * 创建雪的形状
 */
ewSnow.prototype.createSnowShape = function () {
    var maxNumber = this.snowNumber,
        can = this.snowCan,
        snowArr = this.snowArr = [];//用一个数组存储形状
    for (var i = 0; i < maxNumber; i++) {
        snowArr.push(new ewSnowMove(can.width, can.height, this.snowShape, maxNumber, this));
    }
}
/**
 * 画雪花
 */
ewSnow.prototype.drawSnow = function () {
    var self = this;
    //画之前清除一下画布
    this.snowCtx.clearRect(0, 0, this.snowCan.width, this.snowCan.height);
    for (var j = 0; j < this.snowNumber; j++) {
        this.snowArr[j].render(this.snowCtx);
        this.snowArr[j].update(this.snowCan, this);
    }
    //重复画雪花
    requestAnimationFrame(function () {
        self.drawSnow();
    })
}
/*
*  雪花运动函数
* 参数:canvas的宽，canvas的高，雪花形状，雪花数量,作用域
*/
function ewSnowMove(w, h, s, n, context) {
    this.x = Math.floor(Math.random() * w);//x坐标
    this.y = Math.floor(Math.random() * h);//y坐标
    this.shape = Math.random() * s;//形状
    this.fallSpeed = Math.random() * 1 + context.fallSpeed;//坠落速度
    this.verY = context.fallSpeed;//y方向上的速度
    this.verX = 0;//x方向上的速度
    this.step = Math.random() * 30;//步长
    this.stepNum = 0;//步数
    return this;
}
/*
 *  重置雪花运动量
 * 参数:canvas,作用域对象
 */
ewSnowMove.prototype.reset = function (can, context) {
    this.x = Math.floor(Math.random() * can.width);//x坐标
    this.y = 0;//y坐标
    this.shape = Math.random() * context.snowShape + 2;//形状
    this.fallSpeed = Math.random() * 1 + context.fallSpeed;//坠落速度
    this.verY = this.fallSpeed;//y方向上的速度
    this.verX = 0;//x方向上的速度
}
/*
 *  雪花坠落改变
 * 参数:canvas
 */
ewSnowMove.prototype.update = function (can, context) {
    //左右摆动，用余弦
    this.verX *= 0.95;
    if (this.verY <= this.fallSpeed) this.verY = this.fallSpeed;

    this.verX += Math.cos(this.step += .4) * this.stepNum;

    this.y += this.verY;
    this.x += this.verX;

    //飞出边界的处理
    if (this.x <= 0 || this.x > can.width || this.y <= 0 || this.y > can.height) {
        this.reset(can, context);
    }
}
/*
 *  渲染雪花
 * 参数:canvas画布ctx
 */
ewSnowMove.prototype.render = function (ctx) {
    //雪花颜色为渐变颜色参数createRadialGradient(
    // 参数	描述
    // 渐变的开始圆的 x 坐标
    // 渐变的开始圆的 y 坐标
    // 开始圆的半径
    // 渐变的结束圆的 x 坐标
    // 渐变的结束圆的 y 坐标
    // 结束圆的半径)
    var snowStyle = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.shape);
    snowStyle.addColorStop(0.8, 'rgba(255,255,255,1)');
    snowStyle.addColorStop(0.1, '#e3bcdf');

    //画圆 arc
    // 参数	描述
    // x	圆的中心的 x 坐标。
    // y	圆的中心的 y 坐标。
    // r	圆的半径。
    // sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
    // eAngle	结束角，以弧度计。
    // counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
    ctx.save();
    ctx.fillStyle = snowStyle;
    //开始一条路径
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.shape, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}
