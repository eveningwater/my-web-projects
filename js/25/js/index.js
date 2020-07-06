/**
 * 动画函数兼容性写法
 */
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (function (time) {
    return window.setTimeout(time, 1000 / 60, new Date().getTime());
})();
/**
 * 取范围随机数
 * @param {*} max 
 * @param {*} min 
 */
function random(max, min) {
    return Math.floor(Math.random() * (max + min - 1) + min);
}
/**
 * 创建月亮和星星
 * @param {*} options 配置对象
 */
function moonAndStar(options) {
    // 如果传入的参数不是对象，则提示传入对象
    if (typeof options !== 'object' || !options) {
        console.warn('The best way is that you should pass an object params!');
    }
    // 默认的配置对象
    const defaultConfig = {
        width: window.innerWidth,
        height: window.innerHeight,
        container: document.body
    }
    let config = this.config = Object.assign(defaultConfig, options);
    this._init(config);
    let context = this;
    function repeatCanvas() {
        context.resetCanvas();
        context.createStar(150);
        context.createMoon();
        requestAnimationFrame(repeatCanvas);
    }
    repeatCanvas();
    // 窗口大小变化时
    window.onresize = function(){
        config.width = window.innerWidth;
        config.height = window.innerHeight;
        context._init(config);
        repeatCanvas();
    }
}
moonAndStar.prototype._init = function (config) {
    const _canvas = document.getElementById('ew-moon-star');
    let canvas = null;
    if (!_canvas) {
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', "ew-moon-star");
    } else {
        canvas = _canvas;
    }
    const ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.ctx = ctx;
    canvas.width = config.width;
    canvas.height = config.height;
    if (!_canvas) config.container.appendChild(canvas);
    // 星星的属性
    this.star = function (x, y, r) {
        this.x = x; //x坐标
        this.y = y; //y坐标
        this.r = r; //半径
        return this;
    }
    // 星星数组
    this.stars = [];
    this.resetCanvas();
    this.createStar(200);
    this.createMoon();
}
moonAndStar.prototype.createMoon = function () {
    // 月亮渐变
    let gradient = this.ctx.createRadialGradient(80, 80, 40, 80, 80, 400);
    [{
        alpha: 0,
        color: "rgb(255,255,255)"
    }, {
        alpha: 0.01,
        color: "rgb(23,30,38)"
    }, {
        alpha: 0.2,
        color: "rgb(23,30,38)"
    }, {
        alpha: 0.4,
        color: "rgb(23,30,38)"
    }, {
        alpha: 1,
        color: "rgb(23,30,38)"
    }].forEach((item) => {
        gradient.addColorStop(item.alpha, item.color);
    });
    this.ctx.save();
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, 200, 200);
    this.ctx.restore();
}

moonAndStar.prototype.resetCanvas = function () {
    this.ctx.clearRect(0, 0, this.config.width, this.config.height);
    this.ctx.fillStyle = "#171e26";
    this.ctx.fillRect(0, 0, this.config.width, this.config.height);
}

moonAndStar.prototype.createStar = function (num) {
    let Star = this.star;
    let ctx = this.ctx;
    let addStars = function (x, y, r) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    if (!this.stars.length) {
        for (let i = 0; i < num; i++) {
            let x = Math.random() * this.config.width;
            let y = Math.random() * this.config.height;
            let r = random(1.5, 0.4);
            let s = new Star(x, y, r);
            addStars(x, y, r);
            this.stars.push(s);
        }
    } else {
        for (let j = 0; j < num; j++) {
            this.stars[j].r = random(2, 0.8);
            addStars(this.stars[j].x, this.stars[j].y, this.stars[j].r);
        }
    }
}
