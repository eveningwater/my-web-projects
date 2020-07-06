function fishMom(){
    this.x;
    this.y;
    this.angle;
    this.fishEye = new Image();
    this.fishBody = new Image();
    this.fishTail = new Image();

    //the animation of fish mom tail
    this.fishMomTailTimer = 0;
    this.fishMomTailCount = 0;

    //the animation of fish mom eye
    this.fishMomEyeTimer = 0;
    this.fishMomEyeCount = 0;
    this.fishMomEyeInterval = 1000;

    //the animation of fish mom body
    this.fishMomBodyCount = 0;

}
fishMom.prototype.init = function(){

    this.x = global.canWidth * 0.5;
    this.y = global.canHeight * 0.5;

    this.angle = 0;

    // this.fishEye.src = "./image/bigEye0.png";
    // this.fishBody.src = './image/bigSwim0.png';
    // this.fishTail.src = './image/bigTail0.png';
}
fishMom.prototype.draw = function(){

    //lerp distance
    this.x = lerpDistance(global.mx,this.x,0.99);
    this.y = lerpDistance(global.my,this.y,0.99);

    //delta angle,Math.atan2();
    var deltaY = global.my - this.y,deltaX = global.mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;

    this.angle = lerpAngle(beta,this.angle,0.6);
    //fish mom tail
    this.fishMomTailTimer += global.deltaTime;
    if(this.fishMomTailTimer > 50){
        this.fishMomTailCount = (this.fishMomTailCount + 1) % 8;
        this.fishMomTailTimer %= 50;
    }
    //fish mom eye
    this.fishMomEyeTimer += global.deltaTime;
    if(this.fishMomEyeTimer > this.fishMomEyeInterval){
        this.fishMomEyeCount = (this.fishMomEyeCount + 1) % 2;
        this.fishMomEyeTimer %= this.fishMomEyeInterval;
        if(!this.fishMomEyeCount){
            this.fishMomEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.fishMomEyeInterval = 200;
        }
    }

    global.ewctx1.save();
    global.ewctx1.translate(this.x,this.y);
    global.ewctx1.rotate(this.angle);

    var tailCurCount = this.fishMomTailCount,eyeCurCount = this.fishMomEyeCount,bodyCurCount = this.fishMomBodyCount;
    // eat the orange fruit and the body change to orange
    if(global.score.double === 1){
        global.ewctx1.drawImage(global.fishMomBodyOrange[bodyCurCount],-global.fishMomBodyOrange[bodyCurCount].width * 0.5,-global.fishMomBodyOrange[bodyCurCount].height*0.5);
    }else{
        global.ewctx1.drawImage(global.fishMomBodyBlue[bodyCurCount],-global.fishMomBodyBlue[bodyCurCount].width * 0.5,-global.fishMomBodyBlue[bodyCurCount].height*0.5);
    }
    global.ewctx1.drawImage(global.fishMomTail[tailCurCount],-global.fishMomTail[tailCurCount].width * 0.5 + 28,-global.fishMomTail[tailCurCount].height*0.5);
    global.ewctx1.drawImage(global.fishMomEye[eyeCurCount],-global.fishMomEye[eyeCurCount].width * 0.5,-global.fishMomEye[eyeCurCount].height*0.5);
    global.ewctx1.restore();
}