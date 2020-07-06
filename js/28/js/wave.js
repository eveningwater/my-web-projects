function Wave() {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}
Wave.prototype.init = function () {
    for(var i = 0;i < global.waveNum;i++){
        this.alive[i] = false;
        this.r[i] = 0;
    }
}

Wave.prototype.draw = function(){
    global.ewctx1.save();
    global.ewctx1.lineWidth = 2;
    global.ewctx1.shadowBlur = 10;
    global.ewctx1.shadowColor = '#fff';
    for(var i = 0;i < global.waveNum;i++){
        if(this.alive[i]){
            //draw wave
           //API beginPath,arc(x,y,r,sAngle,eAngle,direction),strokeStyle,stroke,lineWidth,closePath
           this.r[i] += global.deltaTime * 0.04;
           if(this.r[i] > 50){
                this.alive[i] = false; 
                break;
           }
           var alpha = 1 - this.r[i] / 50;
            global.ewctx1.beginPath();
            global.ewctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);
            global.ewctx1.strokeStyle = 'rgba(255,255,255,' + alpha +')';
            global.ewctx1.stroke();
            global.ewctx1.closePath();
        }
    }
    global.ewctx1.restore();
}

Wave.prototype.born = function (x,y) {
    for(var i = 0;i < global.waveNum;i++){
        if(!this.alive[i]){
            // console.log('born')
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            return;
        }
    }
}