function Dust() {
    this.x = [];
    this.y = [];
    this.angle;
    // the amplitude array
    this.amp = [];

    this.dustCount = [];

}
Dust.prototype.init = function () {
    for (var i = 0; i < global.dustNum; i++) {
        this.x[i] = Math.random() * global.canWidth;
        this.y[i] = Math.random() * global.canHeight;
        this.amp[i] = 20 + Math.random() * 25;
        this.dustCount[i] = Math.floor(Math.random() * 7);//[0,7)
    }
    this.angle = 0;
}
Dust.prototype.draw = function () {
    this.angle += global.deltaTime * 0.0008;
    var l = Math.sin(this.angle);

    for (var i = 0; i < global.dustNum; i++) {

        var no = this.dustCount[i];
        global.ewctx1.drawImage(global.dustPicArr[no],this.x[i] + this.amp[i] * l,this.y[i]);

    }
}