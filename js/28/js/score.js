function score(){
    this.fruitNum = 0;
    this.double = 1;

    // the score
    this.data = 0;

    //the status of game over
    this.gameStatus = false;
    this.alpha = 0;
}
score.prototype.reset = function(){
    this.fruitNum = 0;
    this.double = 1;
}
score.prototype.draw = function(){
    var w = global.ewcan1.width,h = global.ewcan1.height;

    global.ewctx1.save();
    global.ewctx1.shadowBlur = 10;
    global.ewctx1.shadowColor = '#fff';
    global.ewctx1.fillStyle = '#fff';
    // global.ewctx1.fillText('num'+this.fruitNum, w * 0.5,h - 50);
    // global.ewctx1.fillText('double'+this.double,w * 0.5,h - 80);
    global.ewctx1.fillText('SCORE: ' + this.data,w * 0.5,h - 10);
    if(this.gameStatus){
        this.alpha += global.deltaTime * 0.0005;

        if(this.alpha > 1)this.alpha = 1;

        global.ewctx1.fillStyle = 'rgba(255,255,255,'+ this.alpha +')';
        global.ewctx1.fillText('GAME OVER',w * 0.5,h * 0.5);
    }
    global.ewctx1.restore();

}
score.prototype.addScore = function(){
    this.data += this.fruitNum * 100 * this.double;
    this.reset();
}