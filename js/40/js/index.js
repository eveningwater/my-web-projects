/**************************/
/*功能:首页*/
/*作者:loho*/
/*日期:2017-1-18*/
/**************************/
//定义一个空对象
var can = {};
//创建context对象
can.ctx = document.getElementById("canvas").getContext("2d");
//坐标
can.Point = function(x,y){
	this.x = x;
	this.y = y;
};
/*擦除canvas上的所有图形*/ 
can.clearCxt = function(){
	var canThis = this,
	    canvas = canThis.ctx.canvas;
	    canThis.ctx.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight);
};
/*时钟*/
can.Clock = function(){
	var canThis = can,
	    ctx = canThis.ctx,
	    r = 150,/*半径*/
	    scale =20,/*刻度长度*/
	    minAng = (1/30)*Math.PI,/*一分钟的弧度*/ 
	    hourAng = (1/6)*Math.PI,/*一小时的弧度*/
	    hourLen = r / 2,/*时针长度*/
	    minLen = r / 3 * 2,/*分针长度*/
	    secLen = r / 10 * 9,/*秒针长度*/
	    center = new canThis.Point(ctx.canvas.width / 2,ctx.canvas.height / 2);/*圆心*/
	   /*绘制圆心（表盘中心）*/ 
	   function drawCenter(){
	   	/*控制坐标系*/
	   	 ctx.save();
	   	 /*圆心平移变换*/
	   	 ctx.translate(center.x,center.y);
	   	 /*圆心颜色*/
	   	ctx.fillStyle = "#fc22cf";
	   	/*开始路径方法*/
	   	ctx.beginPath();
	   	/*绘制圆心小圆(参数:x坐标，y坐标,半径,起始角，结束角，绘图方向)*/
	   	ctx.arc(0,0,r / 20,0,2*Math.PI);
	   	/*结束路径方法*/
	   	ctx.closePath();
	   	/*填充路径方法*/
	   	ctx.fill();
	   	/*绘出实际路径方法*/
	   	ctx.stroke();
	   	/*控制坐标系*/
	   	ctx.restore();
	   }
	    /*通过坐标变换绘制表盘*/
	   function drawBackGround(){
	   	 ctx.save(); 
        ctx.translate(center.x, center.y); /*平移变换*/ 
        /*绘制刻度*/ 
        function drawScale(){ 
           ctx.moveTo(r - scale, 0); 
           ctx.lineTo(r, 0);  
        }; 
        ctx.beginPath();
        ctx.strokeStyle = "#fe0cfe";
        ctx.arc(0, 0, r, 0, 2*Math.PI, true); 
        ctx.closePath(); 
        for (var i = 1; i <= 12; i++) { 
           drawScale(); 
           ctx.rotate(hourAng); /*旋转变换*/ 
        }; 
        /*绘制时间(3,6,9,12)*/ 
        ctx.font = " bold 30px '宋体'";
        ctx.fillStyle = "#0c1ffe";
        ctx.fillText("1", 54, -87);
        ctx.fillText("2", 94, -44);
        ctx.fillText("3", 110, 10);
        ctx.fillText("4", 94, 64);
        ctx.fillText("5", 54, 107);
        ctx.fillText("6", -7, 120);
        ctx.fillText("7", -64, 107);
        ctx.fillText("8", -110, 62);
        ctx.fillText("9", -120, 10);
        ctx.fillText("10", -112, -45);
        ctx.fillText("11", -67, -86);
        ctx.fillText("12", -16, -100); 
        ctx.stroke(); 
        ctx.restore(); 
	   }
	   	 /*绘制时针(h: 当前时（24小时制）)*/ 
	   	 this.drawHour = function(h){
	   	 	/*判断时针*/
	   	 	h = h === 0 ? 24 : h;
	   	 	ctx.save();
	   	 	ctx.translate(center.x, center.y);  
            ctx.rotate(3/2*Math.PI); 
            ctx.rotate(h*hourAng); 
            ctx.beginPath(); 
            ctx.moveTo(0, 0); 
            ctx.lineTo(hourLen, 0);
            ctx.strokeStyle =" #0ce2fe";
            ctx.lineWidth = 4;
            ctx.stroke();
	   	 	ctx.restore();
	   	 };
	   	 /*绘制分针（m: 当前分）*/ 
	   	this.drawMin = function(m){ 
        m = m === 0? 60: m; 
        ctx.save(); 
        ctx.translate(center.x, center.y);  
        ctx.rotate(3/2*Math.PI); 
        ctx.rotate(m*minAng); 
        ctx.beginPath(); 
        ctx.moveTo(0, 0); 
        ctx.lineTo(minLen, 0); 
        ctx.strokeStyle ="#0cfe31";
        ctx.lineWidth = 4;
        ctx.stroke(); 
        ctx.restore(); 
        };
         /*绘制秒针（s：当前秒）*/ 
    this.drawSec = function(s){ 
        s = s === 0? 60: s; 
        ctx.save(); 
        ctx.translate(center.x, center.y);  
        ctx.rotate(3/2*Math.PI); 
        ctx.rotate(s*minAng); 
        ctx.beginPath(); 
        ctx.moveTo(0, 0); 
        ctx.lineTo(secLen,0);
        ctx.strokeStyle = "#ebfe0c";
        ctx.lineWidth =4;
        ctx.stroke(); 
        ctx.restore(); 
    };
    this.drawClock = function(){ 
        var canThis = this; 
        function draw(){ 
           var date = new Date(); 
           can.clearCxt(); 
           drawBackGround(); 
           drawCenter(); 
           canThis.drawHour(date.getHours() + date.getMinutes()/60); 
           canThis.drawMin(date.getMinutes() + date.getSeconds()/60); 
           canThis.drawSec(date.getSeconds()); 
        } 
        draw(); 
        setInterval(draw, 1000); 
    };
}
/*页面加载时触发*/
window.onload = function(){
	var clock = new can.Clock(); 
    clock.drawClock(); 
}