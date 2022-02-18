function AllBalloon(options){
    const defaultOptions = {
        phrases: [
            "Don't die\nit's not hard", 
            "You're the Best", 
            "Every day,\nYou're beautiful", 
            "Every occasion,\nYou're clever", 
            "A world without You?\nNah",
            "Keep kicking ass", 
            "You're better than them,\nwhoever they are",
            "You're just amazing",
            "You are,\ntherefore I am",
            "Nothing better than You \ncould have happened to the world"
        ],
        balloons: 10,
        baseVelY: -1,
        addedVelY: -1,
        baseVelX: -.25,
        addedVelX: .5,
        baseSize: 40,
        addedSize: 10,
        baseSizeAdder: 2,
        addedSizeAdder: 2,
        baseIncrementer: .01,
        addedIncrementer: .03,
        baseHue: -10,
        addedHue: 30,
        font: '15px Verdana',
        loadMusic:true,
        musicSrc:"https://www.eveningwater.com/static/resouces/audio/5.mp3"
    };
    if(!options.el){
        return;
    }
    let canvasElement = options.el,
        width = canvasElement.width = window.innerWidth,
        height = canvasElement.height = window.innerHeight,
        ctx = canvasElement.getContext("2d"),
        cycle = 0,
        balloons = [],
        opts = { ...defaultOptions,...options.opts };
    ctx.font = opts.font;
    opts.phrases = opts.phrases.map(item => {
        if(item.length > 4){
            let newItem = "";
            for(let i = 0;i < item.length;i++){
                if(i % 4 === 0 && i !== 0){
                    newItem += item[i] + "\n";
                }else{
                    newItem += item[i];
                }
            }
            return newItem;
        }else{
            return item;
        }
    });
    function Balloon(){
        this.reset();
    }
    Balloon.prototype.reset = function(){
        this.size = opts.baseSize + opts.addedSize * Math.random();
        this.sizeAdder = opts.baseSizeAdder + opts.addedSizeAdder * Math.random();
        this.incrementer = opts.baseIncrementer + opts.addedIncrementer * Math.random();
        this.tick = 0;
        this.x = Math.random() * width;
        this.y = height + this.size;
        this.vx = opts.baseVelX + opts.addedVelX * Math.random();
        this.vy = opts.baseVelY + opts.addedVelY * Math.random();
        this.color = "hsla(hue,70%,60%,.8)".replace("hue",opts.baseHue + opts.addedHue * Math.random());
        this.phrases = opts.phrases[++cycle % opts.phrases.length].split("\n");
        this.lengths = [];
        for(let i = 0;i < this.phrases.length;i++){
            this.lengths.push(-ctx.measureText(this.phrases[i]).width / 2);
        }
    }
    Balloon.prototype.step = function(){
        this.tick += this.incrementer;
        this.x += this.vx;
        this.y += this.vy;
        let size = this.size + this.sizeAdder * Math.sin(this.tick);
        //画线
        ctx.lineWidth = size / 40;
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(this.x,this.y - 2);
        ctx.lineTo(this.x,this.y + size);
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.translate(this.x,this.y);
        ctx.rotate(Math.PI / 4);
        //画桃心
        ctx.beginPath();
        ctx.arc(-size / 2,-size / 2 + size / 4,size / 4,Math.PI / 2,Math.PI * 3 / 2);
        ctx.arc(-size / 2 + size / 4,-size / 2,size / 4,Math.PI,Math.PI * 2);
        ctx.lineTo(0,0);
        ctx.fill();
        ctx.rotate(-Math.PI / 4);
        ctx.translate(-this.x,-this.y);
        ctx.translate(this.x,this.y + size + 15);
        ctx.scale(size / this.size,size / this.size);
        ctx.fillStyle = "#e3300b";
        for(let i = 0;i < this.phrases.length;i++){
            ctx.fillText(this.phrases[i],this.lengths[i],i * 15);
        }
        ctx.scale(this.size / size,this.size / size);
        ctx.translate(-this.x,-(this.y + size + 15));
        if(this.y < -size * 3){
            this.reset();
        }
    }
    function anim(){
        window.requestAnimationFrame(anim);
        ctx.fillStyle = "#535455";
        ctx.fillRect(0,0,width,height);
        if(balloons.length < opts.balloons && Math.random() < .01){
            balloons.push(new Balloon);
        }
        for(let i = 0;i < balloons.length;i++){
            balloons[i].step();
        }
    }
    anim();
    if(opts.loadMusic && opts.musicSrc){
        let audioElement = null;
        document.body.addEventListener("click",() => {
            if(!audioElement){
                audioElement = new Audio();
                audioElement.src = opts.musicSrc;
                audioElement.loop = "loop";
                audioElement.autoplay = "autoplay";
                audioElement.load();
                audioElement.play();
            }
        })
    }
}