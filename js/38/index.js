//获取canvas对象，创建绘图场景
var can = document.getElementById('canvas'),
    ctx = can.getContext('2d');
//设置canvas宽高，并自适应宽高
var width = can.width = window.innerWidth,
    height = can.height = window.innerHeight;
//浏览器窗口改变事件
window.onresize = function () {
    //宽高自适应
    width = can.width = window.innerWidth;
    height = can.height = window.innerHeight;
}
//创建一个雨滴类
function Drop() { };
Drop.prototype = {
    init: function () {
        this.x = random(0, width);//雨滴初始化x坐标
        this.y = 0;//雨滴初始化y坐标
        this.r = 1;//雨滴半径
        this.speedR = 1;//半径增加速度
        this.speed = random(8, 9);//下落速度
        this.hei = random(height * 0.8, height * 0.9);//下落高度
        this.changeOpactiy = .95;//不透明度变化
        this.num = 1;//记录雨滴数
    },
    draw: function () {
        //判断如果y坐标大于下落高度，则绘制雨滴降落到地面散开的效果，即绘制圆形
        if (this.y > this.hei) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(255,255,255,' + this.changeOpactiy + ')';
            ctx.stroke();
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
            ctx.fillRect(this.x, this.y, 2, 10);
        }
        //当下落到地面散开时重新绘制
        this.update();
    },
    update: function () {
        if (this.y < this.hei) {
            this.y += this.speed;
        } else {
            if (this.num > 0.02) {
                this.r += this.speedR;
                if (this.r > 50) {
                    this.num *= this.changeOpactiy;
                }
            } else {
                this.init();
            }
        }
    }
}
//实例化一个雨滴对象
var drops = [];
for (var i = 0; i < 40; i++) {
    setTimeout(function () {
        //构造一个雨滴类，然后初始化，并添加到雨滴数组
        var drop = new Drop();
        drop.init();
        drops.push(drop);
    }, i * 100)
}
console.log(drops);
//实例初始化
setInterval(function () {
    ctx.fillStyle = "rgba(9, 11, 11, 0.1)";
    ctx.fillRect(0, 0, width, height);
    for (var j = 0; j < drops.length; j++) {
        drops[j].draw();
    }
}, 40);
//取随机数
function random(min, max) {
    return Math.random() * (max - min) + min;
}