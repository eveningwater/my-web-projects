function Halo() {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}
Halo.prototype.init = function () {
    for(var i = 0;i < global.haloNum;i++){
        this.x[i] = 0;
        this.y[i] = 0;
        this.r[i] = 0;
        this.alive[i] = false;
    }
}
Halo.prototype.draw = function(){
    global.ewctx1.save();
    global.ewctx1.lineWidth = 2;
    global.ewctx1.shadowBlur = 10;
    global.ewctx1.shadowColor = 'rbga(203,91,0,1)';
    global
    for(var i = 0;i < global.haloNum;i++){
        if(this.alive[i]){
            //draw
            // console.log('draw')
            this.r[i] += global.deltaTime * 0.05;
            if(this.r[i] > 100){
                this.alive[i] = false;
                break;
            }
            var alpha = 1 - this.r[i] / 100;

            global.ewctx1.beginPath();
            global.ewctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);
            global.ewctx1.closePath();
            global.ewctx1.strokeStyle = 'rgba(203,91,0,' + alpha + ')';
            global.ewctx1.stroke();
            

        }
    }
    global.ewctx1.restore();
}
Halo.prototype.born = function(x,y){
    for(var i = 0;i < global.haloNum;i++){
        if(!this.alive[i]){
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 10;
            this.alive[i] = true;
        }
    }
}