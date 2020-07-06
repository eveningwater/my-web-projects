function fishSon() {
    this.x;
    this.y;
    this.angle;
    
    this.fishSonEye = new Image();
    this.fishSonBody = new Image();
    this.fishSonTail = new Image();

    //the animation about the fish tail
    this.fishSonTailTimer = 0;
    this.fishSonTailCount = 0;

    //  the animation about the fish eye
    this.fishSonEyeTime = 0;
    this.fishSonEyeCount = 0;
    this.fishSonEyeInterval = 1000;

    // the animation about the fish body
    this.fishSonBodyTime = 0;
    this.fishSonBodyCount = 0;
}
fishSon.prototype.init = function () {
    this.x = global.canWidth * 0.5 - 50;
    this.y = global.canHeight * 0.5 + 50;

    this.angle = 0;

    // this.fishSonEye.src = './image/babyEye0.png';
    // this.fishSonBody.src = './image/babyFade0.png';
    // this.fishSonTail.src = './image/babyTail0.png';
}
fishSon.prototype.draw = function () {
    //ctx1
    //translate()
    //lerp distance
    this.x = lerpDistance(global.fishMom.x,this.x,0.98);
    this.y = lerpDistance(global.fishMom.y,this.y,0.98);

    //delta angle,Math.atan2();
    var deltaY = global.fishMom.y - this.y,deltaX = global.fishMom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;

    this.angle = lerpAngle(beta,this.angle,0.6);

    //son fish tail count(mean to load 8 image)
    this.fishSonTailTimer += global.deltaTime;
    //let the fish tail move
    if(this.fishSonTailTimer > 50){
        this.fishSonTailCount = (this.fishSonTailCount + 1) % 8;
        this.fishSonTailTimer %= 50;
    }
    //son fish eye
    this.fishSonEyeTime += global.deltaTime;
    if(this.fishSonEyeTime > this.fishSonEyeInterval){
        this.fishSonEyeCount = (this.fishSonEyeCount + 1) % 2;
        this.fishSonEyeTime %= this.fishSonEyeInterval;
        if(!this.fishSonEyeCount){
            this.fishSonEyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
        }else{
            this.fishSonEyeInterval = 200;
        }
    }
    //son fish body
    this.fishSonBodyTime += global.deltaTime;
    if(this.fishSonBodyTime > 300){
        this.fishSonBodyCount = this.fishSonBodyCount + 1;
        this.fishSonBodyTime %= 30;
        if(this.fishSonBodyCount > 19){
            this.fishSonBodyCount = 19;
            //game over
            global.score.gameStatus = true;
        }
    }

    global.ewctx1.save();
    global.ewctx1.translate(this.x,this.y);
    global.ewctx1.rotate(this.angle);

    var tailCurCount = this.fishSonTailCount,eyeCurCount = this.fishSonEyeCount,bodyCurCount = this.fishSonBodyCount;

    global.ewctx1.drawImage(global.fishSonTail[tailCurCount],-global.fishSonTail[tailCurCount].width * 0.5 + 23,-global.fishSonTail[tailCurCount].height * 0.5);
    global.ewctx1.drawImage(global.fishSonBody[bodyCurCount],-global.fishSonBody[bodyCurCount].width * 0.5,-global.fishSonBody[bodyCurCount].height * 0.5);
    global.ewctx1.drawImage(global.fishSonEye[eyeCurCount],-global.fishSonEye[eyeCurCount].width * 0.5,-global.fishSonEye[eyeCurCount].height * 0.5);
    global.ewctx1.restore();
}