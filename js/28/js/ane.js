function Ane(){

    this.rootX = [];
    // this.len = [];
    //start point,control point,end point(sin)
    this.headX = [];
    this.headY = [];

    // the amplitude array
    this.amp = [];
    this.angle = 0;
}
Ane.prototype.init = function(){
    var h = global.canHeight;
    for(var i = 0;i < global.aneNum;i++){
         this.rootX[i] = i * 16 + Math.random() * 20;
        //  this.len[i] = 200 + Math.random() * 50;
        //  console.log(this)
        this.headX[i] = this.rootX[i];
        this.headY[i] = h - 200  + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}
Ane.prototype.draw = function(){

    this.angle += global.deltaTime * 0.0008;
    var l = Math.sin(this.angle);//[-1,1]

    global.ewctx2.save();
    global.ewctx2.globalAlpha = 0.6;
    global.ewctx2.lineWidth = 20;
    global.ewctx2.lineCap = 'round';
    global.ewctx2.strokeStyle = '#3b154e';
   
     for(var i = 0;i < global.aneNum;i++){
        //beginPath(),moveTo(),lineTo,closePath(),strokeStyle,storke(),lineWidth,lineCap,globleAlpha,quadraticCurveTo
        global.ewctx2.beginPath();
        global.ewctx2.moveTo(this.rootX[i],global.canHeight);
        // global.ewctx2.lineTo(this.x[i],global.canHeight - this.len[i]);
        this.headX[i] = this.rootX[i] + l * this.amp[i];
        global.ewctx2.quadraticCurveTo(this.rootX[i],global.canHeight - 100,this.headX[i],this.headY[i]);
        global.ewctx2.stroke();
     }
     global.ewctx2.restore();
}