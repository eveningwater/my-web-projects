function Fruit() {
    this.alive = [];//boolean
    this.x = [];
    this.y = [];
    this.l = [];
    this.aneNo = [];
    this.speed = [];
    this.fruitType = [];
    this.fruitOrange = new Image();
    this.fruitBlue = new Image();
}
Fruit.prototype.init = function () {

    this.fruitOrange.src = './image/fruit.png';
    this.fruitBlue.src = './image/blue.png';

    for (var i = 0; i < global.fruitNum; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.speed[i] = Math.random() * 0.017 + 0.003; //[0.003,0.02]
        this.l[i] = 0;
        this.aneNo[i] = 0;
        this.born(i);
    }
}
Fruit.prototype.draw = function () {
    for (var i = 0; i < global.fruitNum; i++) {
        //draw fruit
        //find an ane,grow,fly up
        if(this.alive[i]){
            var pic = this.fruitType[i].indexOf('blue') > -1 ? this.fruitBlue : this.fruitOrange;
            //grow
            if(this.l[i] <= 14){
                this.x[i] = global.ane.headX[this.aneNo[i]]; 
                this.y[i] = global.ane.headY[this.aneNo[i]]; 
                this.l[i] += global.deltaTime * this.speed[i];
            }else{
                this.y[i] -= global.deltaTime * this.speed[i] * 7;
            }
            global.ewctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            if(this.y[i] < 10)this.alive[i] = false;
        }
    }
}
// Fruit.prototype.update = function () {
//     var num = 0;
//     for (var i = 0; i < global.fruitNum; i++) {
//         if (this.alive[i]) num++;
//     }
// }
Fruit.prototype.born = function (i) {
    // the location of ane
    // var aneId = Math.floor(Math.random() * global.aneNum);
    this.aneNo[i] = Math.floor(Math.random() * global.aneNum);
    // this.x[i] = global.ane.headX[aneId];
    // this.y[i] = global.ane.headY[aneId];
    this.l[i] = 0;
    this.alive[i] = true;

    //the condition of the orange fruit or the blue fruit borned
    var ran = Math.random();
    this.fruitType[i] = ran > 0.2 ? "orange" : "blue";
}
Fruit.prototype.dead = function (i) {
    this.alive[i] = false;
}
function fruitMonitor(){
    var num = 0;
    for (var i = 0; i < global.fruitNum; i++) {
        if(global.fruit.alive[i])num++;
    }

    //if the number of fruit less than 20,that's need to born the fruit
    if(num < global.fruitNum - global.canWidth / 40){
        //send fruit
        sendFruit();
        return;
    }
}

function sendFruit(){
    for (var i = 0; i < global.fruitNum; i++) {
        if(!global.fruit.alive[i]){
            global.fruit.born(i);
            return;
        }
    }
}