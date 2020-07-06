// the global variable
var global = {
    ewcan1:null,//canvas1
    ewctx1:null,//context1
    ewcan2:null,//canvas2
    ewctx2:null,//context2
    lastTime:null,//last time
    deltaTime:null,//delta time
    bgImage:null,//the class of background
    canWidth:0,//the width of canvas
    canHeight:0,//the height of canvas
    ane:null,//the ane
    aneNum:50,//the number of ane
    fruit:null,//the fruit
    fruitNum:50,//the number of fruit
    fishMom:null,//the big fish(mom fish)
    mx:0,//the x of mouse
    my:0,//the y of mouse
    fishSon:null,//the small fish(son fish)
    fishSonTail:[],//the tails of son fish
    fishSonEye:[],// the eyes of son fish
    fishSonBody:[],//the bodys of son fish
    fishMomTail:[],//the tails of mom fish
    fishMomEye:[],//the eyes of mom fish
    fishMomBodyOrange:[],// the orange body of mom fish
    fishMomBodyBlue:[],// the blue body of mom fish
    score:null,// the score
    wave:null,// the wave
    waveNum:10,// the number of wave
    halo:null,//the halo
    haloNum:5,//the number of halo
    dust:null,//the dust
    dustPicArr:[],// the image array of dust
    dustNum:60,//the number of dust
    evt:null
}

global.bgImage = new Image();

window.onload = function(){
    game();
}


function game(){
    init();
    global.lastTime = Date.now();
    global.deltaTime = 0;
    gameLoop();
}

function init(){
    global.ewcan1 = document.getElementById('ew-canvas-1');//fishes dust ui circle,halo
    global.ewctx1 = global.ewcan1.getContext('2d');
    global.ewcan2 = document.getElementById('ew-canvas-2');//ane background fruit
    global.ewctx2 = global.ewcan2.getContext('2d');

    global.evt = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? 'touchmove' : 'mousemove';
    global.ewcan1.addEventListener(global.evt,onMouseMove,false);

    global.bgImage.src = './image/background.jpg';
    global.ewcan1.width = global.ewcan2.width = window.innerWidth;
    global.ewcan1.height = global.ewcan2.height = window.innerHeight;
    global.canWidth = global.ewcan1.width;
    global.canHeight = global.ewcan1.height;

    global.aneNum = global.canWidth / 16;
    global.fruitNum = global.canWidth / 15;

    global.ane = new Ane();
    global.ane.init();

    global.fruit = new Fruit();
    global.fruit.init();

    global.fishMom = new fishMom();
    global.fishMom.init();

    mx = global.canWidth * 0.5;
    my = global.canHeight * 0.5;

    global.fishSon = new fishSon();
    global.fishSon.init();

    for(var i = 0;i < 8;i++){
        global.fishSonTail[i] = new Image();
        global.fishSonTail[i].src = './image/babyTail' + i + '.png';
    }
    for(var i = 0;i < 2;i++){
        global.fishSonEye[i] = new Image();
        global.fishSonEye[i].src = './image/babyEye' + i + '.png';
    }

    for(var i = 0;i < 20;i++){
        global.fishSonBody[i] = new Image();
        global.fishSonBody[i].src = './image/babyFade' + i + '.png';
    }

    for(var i = 0;i < 8;i++){
        global.fishMomTail[i] = new Image();
        global.fishMomTail[i].src = './image/bigTail' + i + '.png';
    }

    for(var i = 0;i < 2;i++){
        global.fishMomEye[i] = new Image();
        global.fishMomEye[i].src = './image/bigEye' + i + '.png';
    }

    global.score = new score();

    for(var i = 0;i < 8;i++){
        global.fishMomBodyOrange[i] = new Image();
        global.fishMomBodyBlue[i] = new Image();

        global.fishMomBodyOrange[i].src  = './image/bigSwim' + i +'.png';
        global.fishMomBodyBlue[i].src  = './image/bigSwimBlue' + i +'.png';
    }

    global.ewctx1.font = '20px verdana';
    global.ewctx1.textAlign = 'center';//left center right

    global.wave = new Wave();
    global.wave.init();

    global.halo = new Halo();
    global.halo.init();

    for(var i = 0;i < 7;i++){
        global.dustPicArr[i] = new Image();
        global.dustPicArr[i].src = './image/dust' + i + '.png';
    }
    global.dust = new Dust();
    global.dust.init();


}

function gameLoop(){
    window.requestAnimationFrame(gameLoop);

    var now = Date.now();
    global.deltaTime = now - global.lastTime;
    if(global.deltaTime > 40) global.deltaTime = 40;
    global.lastTime = now;

    drawBackground();

    global.ane.draw();

    fruitMonitor();

    global.fruit.draw();

    global.ewctx1.clearRect(0,0,global.canWidth,global.canHeight);
    global.fishMom.draw();

    fishMomFruitCollision();
    fishMomFishSonCollision();

    global.fishSon.draw();
    // console.log(global.deltaTime);
    global.score.draw();

    global.wave.draw();

    global.halo.draw();
    global.dust.draw();
}

function onMouseMove(e){
    if(!global.score.gameStatus){
        if(global.evt.indexOf('touch') === -1){
            global.mx = typeof e.offsetX === 'undefined' ? e.layX : e.offsetX;
            global.my = typeof e.offsetY === 'undefined' ? e.layY : e.offsetY;
        }else{
            global.mx = e.touches[0].clientX;
            global.my = e.touches[0].clientY;
        }
    }
}