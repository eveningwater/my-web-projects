import { isDom, on } from "./util";
class Snow {
    public el: GlobalModule.ElementType;
    public snowOption: GlobalModule.SnowOptionType;
    public defaultSnowOption: Required<GlobalModule.SnowOptionType> = {
        snowNumber: 200,
        snowShape: 5,
        speed: 1
    };
    public snowCan: HTMLCanvasElement | null;
    public snowCtx: CanvasRenderingContext2D | null;
    public snowArr: SnowMove [];
    constructor(element: GlobalModule.ElementType, option?: GlobalModule.SnowOptionType) {
        this.el = element;
        this.snowOption = option || this.defaultSnowOption;
        this.snowCan = null;
        this.snowCtx = null;
        this.snowArr = [];
    }
    createCanvas() {
        this.snowCan = document.createElement('canvas');//创建canvas标签
        this.snowCtx = this.snowCan.getContext('2d');//获取画布
        this.snowCan.id = "snowCanvas";//为canvas标签设置id
        this.snowCan.style.cssText += 'position:absolute;z-index:1;left:0;top:0;';//设置canvas标签css样式
        this.snowCan.width = isDom(this.el) ? (this.el as HTMLElement).offsetWidth : document.documentElement.clientWidth;//设置canvas宽
        this.snowCan.height = isDom(this.el) ? (this.el as HTMLElement).offsetHeight : document.documentElement.clientHeight;//设置canvas高
        on(window, 'resize', () => {
            (this.snowCan as HTMLCanvasElement).width = document.documentElement.clientWidth;
            (this.snowCan as HTMLCanvasElement).height = document.documentElement.clientHeight;
        })
        //将canvas元素添加到页面中
        if (isDom(this.el)) {
            (this.el as HTMLElement).appendChild(this.snowCan);
        } else {
            document.body.appendChild(this.snowCan);
        }
    }
    createSnowShape() {
        const maxNumber = this.snowOption.snowNumber || this.defaultSnowOption.snowNumber,
            shape = this.snowOption.snowShape || this.defaultSnowOption.snowShape,
            { width, height } = this.snowCan as HTMLCanvasElement,
            snowArr:SnowMove [] = this.snowArr = [];
        for (let i = 0; i < maxNumber; i++) {
            snowArr.push(new SnowMove(width,height,shape,{ ...this.defaultSnowOption,...this.snowOption}));
        }
    }
    drawSnow() {
        //画之前清除一下画布
        this.snowCtx?.clearRect(0, 0, this.snowCan?.width as number, this.snowCan?.height as number);
        for (var j = 0; j < (this.snowOption.snowNumber || this.defaultSnowOption.snowNumber); j++) {
            this.snowArr[j].render(this.snowCtx as CanvasRenderingContext2D);
            this.snowArr[j].update(this.snowCan as HTMLCanvasElement,  {...this.defaultSnowOption,...this.snowOption});
        }
        //重复画雪花
        requestAnimationFrame(() => this.drawSnow())
    }
    remove() {
        if (isDom(this.el) && this.snowCan) {
            (this.el as HTMLElement).removeChild(this.snowCan);
        } else if (this.snowCan) {
            document.body.removeChild(this.snowCan);
        }
    }
    init() {
        this.createCanvas();
        this.createSnowShape();
        this.drawSnow();
    }
}
class SnowMove {
    public x: number;
    public y: number;
    public shape: number;
    public fallSpeed: number;
    public verX: number;
    public verY: number;
    public step: number;
    public stepNum: number;
    public context: Required<GlobalModule.SnowOptionType>;
    constructor(w: number, h: number, s: number, context: Required<GlobalModule.SnowOptionType>) {
        this.x = Math.floor(Math.random() * w);
        this.y = Math.floor(Math.random() * h);
        this.shape = Math.random() * s;
        this.fallSpeed = Math.random() * 1 + context.speed;//坠落速度                
        this.verY = context.speed;//y方向上的速度
        this.verX = 0;//x方向上的速度
        this.step = Math.random() * 30;//步长
        this.stepNum = 0;//步数
        this.context = context;
    }
    reset(can: HTMLCanvasElement, context: Required<GlobalModule.SnowOptionType>) {
        this.x = Math.floor(Math.random() * can.width);//x坐标
        this.y = 0;//y坐标
        this.shape = Math.random() * context.snowShape + 2;//形状
        this.fallSpeed = Math.random() * 1 + context.speed;//坠落速度
        this.verY = this.fallSpeed;//y方向上的速度
        this.verX = 0;//x方向上的速度
    }
    update(can: HTMLCanvasElement, context: Required<GlobalModule.SnowOptionType>) {
        this.verX *= 0.95;
        if (this.verY <= this.fallSpeed) this.verY = this.fallSpeed;
        this.verX += Math.cos(this.step += .4) * this.stepNum;
        this.y += this.verY;
        this.x += this.verX;                
        if (this.x <= 0 || this.x > can.width || this.y <= 0 || this.y > can.height) {
            this.reset(can, context);
        }
    }
    render(ctx: CanvasRenderingContext2D) {                
        const snowStyle = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.shape);
        snowStyle.addColorStop(0.8, 'rgba(255,255,255,1)');
        snowStyle.addColorStop(0.1, 'rgba(255,255,255,.4)');
        ctx.save();
        ctx.fillStyle = snowStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.shape, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
export default Snow;