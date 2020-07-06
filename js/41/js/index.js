/*
*功能:守卫星球游戏
*作者:eveningwater
*日期:2017/7/14
*/
//获取body
var body = document.getElementsByTagName('body')[0];
//往body页面添加canvas元素
body.innerHTML = '<canvas id="canvas"></canvas>';
//启动游戏
window.addEventListener("DOMContentLoaded", game);
//加载图片
var sprite = new Image();//雪碧图
var spriteExplosion = new Image();//爆炸雪碧图
//加载图片路径
sprite.src = 'img/sprite.png';//雪碧图路径
//页面加载时运行
window.onload = function () {
    //加载图片路径
    spriteExplosion.src = 'img/explosion.png';//爆炸雪碧图路径
}
/*
*功能:自定义函数开始游戏
*/
function game() {
    //获取canvas画布
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),//绘图
        cWidth = context.canvas.width = window.innerWidth,//canvas宽
        cHeight = context.canvas.height = window.innerHeight;//canvas高
    //游戏道具
    var bullets = [],//子弹
        asteroids = [],//小行星
        explosions = [],//爆炸
        destroyed = 0,//毁坏
        record = 0,//记录分数
        count = 0,//计数
        playing = false,//开始游戏
        gameOver = false,//结束游戏
        _planet = { deg: 0 };//行星程度
    //飞机距离守卫的小行星位置
    var player = {
        posX: -35,//以守卫小行星圆心为初始建立的x轴坐标
        posY: -(100 + 82),//以守卫小行星圆心为初始建立的y轴坐标
        width: 70,//飞机宽度
        height: 79,//飞机高度
        deg: 0//飞机程度
    }
    //向画布添加事件
    canvas.addEventListener('click', action);//鼠标点击事件
    canvas.addEventListener('mousemove', action);//鼠标移动事件
    window.addEventListener('resize', update);//屏幕大小改变事件
    //屏幕大小改变函数
    function update() {
        cWidth = context.canvas.width = window.innerWidth;//宽度
        cHeight = context.canvas.height = window.innerHeight;//高度
    }
    //飞机移动函数,飞机只能围绕守卫的小行星边缘旋转移动
    function move(e) {
        player.deg = Math.atan2(e.offsetX - (cWidth / 2), -(e.offsetY - (cHeight / 2)));//atan2()方法返回PI 到 PI 之间的值，是从 X 轴正向逆时针旋转到点 (x,y) 时经过的角度。
    }
    //撞击小行星的陨石移动函数
    function action(e) {
        e.preventDefault();//阻止默认事件的发生
        //判断如果游戏开始
        if (playing) {
            //子弹对象
            var bullet = {
                x: -8,//x坐标
                y: -179,//y坐标
                sizeX: 2,//x轴大小
                sizeY: 10,//y轴大小
                realX: e.offsetX,//反正就是子弹移动位置的x和y坐标
                realY: e.offsetY,//
                dirX: e.offsetX,//
                dirY: e.offsetY,//
                deg: Math.atan2(e.offsetX - (cWidth / 2), -(e.offsetY - (cHeight / 2))),//因为子弹要往相反的方向打中陨石所以y坐标是负值
                destroyed: false//最开始没有打烂陨石,所以为false
            };
            //将子弹添加到数组中
            bullets.push(bullet);
        } else {
            if (gameOver) {
                //定义距离
                var dist;
                dist = Math.sqrt((e.offsetX - cWidth / 2) * (e.offsetX - cWidth / 2) + (e.offsetY - (cHeight / 2 + 45 + 22)) * (e.offsetY - (cHeight / 2 + 45 + 22)));//陨石距离可以调整,sqrt()方法返回参数的平方根
                //判断如果距离小于27游戏就结束,疑问:为啥是27?(其实我也不知道啦)
                if (dist < 27) {
                    //判断如果点击开始
                    if (e.type == 'click') {
                        gameOver = false;//游戏开始
                        count = 0;//计数为0
                        bullets = [];//子弹数为空
                        asteroids = [];//小行星数(其实也就是我所说的陨石啦)
                        explosions = [];//爆炸数也为空
                        destroyed = 0;//毁坏数即打烂小行星数
                        player.deg = 0;//飞机不动
                        canvas.removeEventListener('contextmenu', action);//移除鼠标右键事件
                        canvas.removeEventListener('mousemove', move);//移除鼠标移动
                        canvas.style.cursor = 'default';//未开始
                    } else {
                        canvas.style.cursor = 'pointer';//开始
                    }
                } else {
                    canvas.style.cursor = 'default';//未开始
                }
            } else {
                dist = Math.sqrt((e.offsetX - cWidth / 2) * (e.offsetX - cWidth / 2) + (e.offsetY - cHeight / 2) * (e.offsetY - cHeight / 2));//距离值更换
                //判断距离小于27时
                if (dist < 27) {
                    if (e.type == 'click') {
                        playing = true;//开始游戏
                        canvas.removeEventListener('mousemove', action);//移除鼠标移动事件
                        canvas.addEventListener('contextmenu', action);//添加鼠标右键事件
                        canvas.addEventListener('mousemove', move);//添加鼠标移动事件
                        canvas.setAttribute('class', 'playing');//为canvas添加class
                        canvas.style.cursor = 'default';
                    } else {
                        canvas.style.cursor = 'pointer';//开始
                    }
                } else {
                    canvas.style.cursor = 'default';//未开始
                }
            }
        }
    }
    //爆炸函数
    function fire() {
        var distance;//定义距离
        //循环遍历添加子弹
        for (var i = 0; i < bullets.length; i++) {
            //判断如果子弹没有打烂陨石
            if (!bullets[i].destroyed) {
                context.save();//save方法以及后面的三个方法都是画布context对象里的方法,一个变换矩阵,表示保存当前图像
                context.translate(cWidth / 2, cHeight / 2);
                context.rotate(bullets[i].deg);
                context.drawImage(sprite, 211, 100, 50, 75, bullets[i].x, bullets[i].y -= 20, 19, 30);
                context.restore();
                //子弹对象值也就是射击数
                bullets[i].realX = (0) - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
                bullets[i].realY = (0) + (bullets[i].y + 10) * Math.cos(bullets[i].deg);
                //子弹
                bullets[i].realX += cWidth / 2;
                bullets[i].realY += cHeight / 2;
                //打中爆炸遍历添加
                for (var j = 0; j < asteroids.length; j++) {
                    //判断如果陨石没有毁坏
                    if (!asteroids[j].destroyed) {
                        distance = Math.sqrt(Math.pow(asteroids[j].realX - bullets[i].realX, 2) + Math.pow(asteroids[j].realY - bullets[i].realY, 2));//又是求平方又是求幂,表示我也懵逼了这算法
                        //判断如果距离小于行星宽度除以宽度大小(这算法我也不知道)
                        if (distance < (((asteroids[j].width / asteroids[j].size) / 2) - 4) + ((19 / 2) - 4)) {
                            destroyed += 1;//毁坏数从1开始相加
                            asteroids[j].destroyed = true;//陨石开始毁坏
                            bullets[i].destroyed = true;//子弹开始毁坏
                            //爆炸数添加
                            explosions.push(asteroids[j]);
                        }
                    }
                }
            }
        }

    }
    //构造守卫的星球函数
    function planet() {
        context.save();//不解释了
        context.fillStyle = '#fff';//填充颜色
        context.shadowBlur = 100;//
        context.shadowOffsetX = 0;//这些方法自己查询了解不解释了
        context.shadowOffsetY = 0;//
        context.shadowColor = '#999';//
        context.arc(cWidth / 2, cHeight / 2, 100, 0, Math.PI * 2);
        context.fill();
        context.translate(cWidth / 2, cHeight / 2);
        context.rotate((_planet.deg += 0.1) * (Math.PI / 180));
        context.drawImage(sprite, 0, 0, 200, 200, -100, -100, 200, 200);//无非就是雪碧图中取出图片,位置通过计算出来的
        context.restore();
    }
    //构造飞机函数
    function _player() {
        context.save();
        context.translate(cWidth / 2, cHeight / 2);
        context.rotate(player.deg);
        context.drawImage(sprite, 200, 0, player.width, player.height, player.posX, player.posY, player.width, player.height);
        context.restore();
        //以上方法不解释了,全是画布当中的方法自己查询了解
        //判断
        if (bullets.length - destroyed && playing) {
            //调用函数
            fire();
        }
    }
    //构造小行星就是陨石函数
    function newAsteriod() {
        var type = random(1, 4),//随机1到4之间的数
            coordsX,//射击x轴
            coordsY;//射击y轴
        //判断随机数
        switch (type) {
            case 1:
                coordsX = random(0, cWidth);
                coordsY = 0 - 150;
                break;
            case 2:
                coordsX = cWidth + 150;
                coordsY = random(0, cHeight);
                break;
            case 3:
                coordsX = random(0, cWidth);
                coordsY = cHeight + 150;
                break;
            case 4:
                coordsX = 0 - 150;
                coordsY = random(0, cHeight);
                break;
        }
        //构造陨石
        var asteroid = {
            x: 278,
            y: 0,
            state: 0,
            stateX: 0,
            width: 134,
            height: 123,
            realX: coordsX,
            realY: coordsY,
            moveY: 0,
            coordsX: coordsX,
            coordsY: coordsY,
            size: random(1, 3),
            deg: Math.atan2(coordsX - cWidth / 2, -(coordsY - cHeight / 2)),
            destroyed: false
        }
        //添加陨石
        asteroids.push(asteroid);
    }
    //陨石移动函数
    function _asteroids() {
        //定义距离
        var distance;
        //遍历出现陨石的数量
        for (var i = 0; i < asteroids.length; i++) {
            //判断如果陨石没有开始毁坏
            if (!asteroids[i].destroyed) {
                context.save();
                context.translate(asteroids[i].coordsX, asteroids[i].coordsY);
                context.rotate(asteroids[i].deg);
                context.drawImage(sprite, asteroids[i].x, asteroids[i].y, asteroids[i].width, asteroids[i].height, -(asteroids[i].width / asteroids[i].size) / 2, asteroids[i].moveY += 1 / (asteroids[i].size), asteroids[i].width / asteroids[i].size, asteroids[i].height / asteroids[i].size);
                //陨石数量大小不一
                context.restore();
                //得分
                asteroids[i].realX = (0) - (asteroids[i].moveY + (asteroids[i].height / asteroids[i].size / 2)) * Math.sin(asteroids[i].deg);
                asteroids[i].realY = (0) + (asteroids[i].moveY + (asteroids[i].height / asteroids[i].size / 2)) * Math.cos(asteroids[i].deg);
                asteroids[i].realX += asteroids[i].coordsX;
                asteroids[i].realY += asteroids[i].coordsY;
                //游戏结束
                distance = Math.sqrt(Math.pow(asteroids[i].realX - cWidth / 2, 2) + Math.pow(asteroids[i].realY - cHeight / 2, 2));
                //判断距离
                if (distance < (((asteroids[i].width / asteroids[i].size) / 2) - 4) + 100) {
                    gameOver = true;//游戏结束
                    playing = false;//飞机返回原位置
                    canvas.addEventListener('mousemove', action);//添加鼠标移动事件
                }
            }
            //如果陨石正在毁坏中游戏没有结束时
            else if (!asteroids[i].extinct) {
                //添加陨石爆炸数
                explosion(asteroids[i]);
            }
        }
        //判断
        if (asteroids.length - destroyed < 10 + (Math.floor(destroyed / 6))) {
            newAsteriod();
        }
    }
    //爆炸函数参数:陨石数量
    function explosion(asteroid) {
        context.save();
        context.translate(asteroid.realX, asteroid.realY);
        context.rotate(asteroid.deg);
        //定义雪碧图x轴与y轴
        var spriteY, spriteX = 256;
        //判断
        if (asteroid.state == 0) {
            spriteX = 0;
            spriteY = 0;
        } else if (asteroid.state < 8) {
            spriteY = 0;
        } else if (asteroid.state < 16) {
            spriteY = 256;
        } else if (asteroid.state < 24) {
            spriteY = 512;
        } else {
            spriteY = 768;
        }
        //判断如果状态等于8,16,24
        if (asteroid.state == 8 || asteroid.state == 16 || asteroid.state == 24) {
            asteroid.stateX = 0;
        }
        context.drawImage(spriteExplosion, asteroid.stateX += spriteX, spriteY, 256, 256, -(asteroid.width / asteroid.size) / 2, -(asteroid.height / asteroid.size) / 2, asteroid.width / asteroid.size, asteroid.height / asteroid.size);
        asteroid.state += 1;
        //判断如果状态等于31
        if (asteroid.state == 31) {
            asteroid.extinct = true;
        }
        context.restore();
    }
    //游戏开始函数
    function start() {
        //判断如果游戏没有结束
        if (!gameOver) {
            //清空
            context.clearRect(0, 0, cWidth, cHeight);
            context.beginPath();
            //调用构造行星函数
            planet();
            //调用构造飞机函数
            _player();
            //判断如果游戏开始
            if (playing) {
                //调用毁灭陨石函数
                _asteroids();
                context.font = '20px Verdana';//设置字体
                context.fillStyle = '#fff';//设置背景颜色
                context.textBaseline = 'middle';//
                context.textAlign = 'left';//
                context.fillText('最高分数:' + record + '', 20, 30);//得分
                context.font = "40px Verdana";
                context.fillStyle = "#fff";
                context.strokeStyle = "#000";
                context.textAlign = "center";
                context.textBaseline = 'middle';
                context.strokeText('' + destroyed + '', cWidth / 2, cHeight / 2);
                context.fillText('' + destroyed + '', cWidth / 2, cHeight / 2);
            } else {
                context.drawImage(sprite, 428, 12, 70, 70, cWidth / 2 - 35, cHeight / 2 - 35, 70, 70);
            }
        } else if (count < 1) {
            count = 1;
            context.fillStyle = 'rgba(0,0,0,0.75)';
            context.rect(0, 0, cWidth, cHeight);
            context.fill();
            context.font = '40px Verdana';
            context.fillStyle = '#fff';
            context.textAlign = 'center';
            context.fillText("游戏结束!", cWidth / 2, cHeight / 2 - 150);
            context.font = '20px Verdana';
            context.fillStyle = '#fff';
            context.textAlign = 'center';
            context.fillText('总共毁坏:' + destroyed, cWidth / 2, cHeight + 140);
            //三元表达式得出得分
            record = destroyed > record ? destroyed : record;
            context.font = '20px Verdana';
            context.fillStyle = '#fff';
            context.textAlign = 'center';
            context.fillText('得分:' + record, cWidth / 2, cHeight / 2 + 185);
            context.drawImage(sprite, 500, 18, 70, 70, cWidth / 2 - 35, cHeight / 2 + 40, 70, 70);
            //移除class样式
            canvas.removeAttribute('class');
        }
    }
    //页面初始化函数
    function init() {
        //当页面所有图片加载完成时
        window.requestAnimationFrame(init);
        //调用开始游戏函数
        start();
    }
    //调用初始化函数
    init();
    //任取随机数函数,参数最低值到最高值
    function random(from, to) {
        //返回随机数
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }
}