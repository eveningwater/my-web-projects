// https://github.com//eveningwater/my-web-projects
const $ = v => document.querySelector(v);
const board = $("#draw-board");
const ctx = board.getContext("2d");
const decrease = $("#decrease");
const increase = $("#increase");
const inputSize = $("#size");
const clear = $("#clear");
let size = 10;//线或者圆半径大小
let x,y;//x与y坐标
let color = "black";//画笔颜色
let colorPicker = null;//颜色选择器实例
let isPressed = false;//按下状态
function on(el,type,handler,useCapture = true){
    if(el && type && handler){
        el.addEventListener(type,handler,useCapture);
    }
}
function mouseDownHandler(e){
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
}
function mouseUpHandler(e){
    isPressed = false;
    x = undefined;
    y = undefined;
}
function mouseMoveHandler(e){
    if(isPressed){
        const x2 = e.offsetX,y2 = e.offsetY;
        drawCircle(x2,y2);
        drawLine(x,y,x2,y2);
        x = x2;
        y = y2;
    }
}
function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}
function initColorPicker(){
    colorPicker = new ewColorPicker({
        el:"#color",
        pickerAnimation:"height",
        pickerAnimationTime:300,
        predefineColor:[
            "red",
            "orange",
            "#2396ef",
            "#4097ef",
            "#fff",
            {
                color:"#9744ee"
            },
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#c71585',
            'rgba(255, 69, 0, 0.68)',
            'rgba(255, 120, 0, 1)',
            'rgba(51, 100, 98, 1)',
            'rgba(120, 40, 94, 0.5)',
            'hsl(181, 100%, 37%)',
            'hsla(209, 100%, 56%, 0.73)',
            '#c7158577'
        ],
        alpha:true,
        size:{
            width:35,
            height:35
        },
        alphaDirection:"horizontal",
        defaultColor:color,
        clear:() => {
            color = "black";
        },
        sure:(value) => {
            color = value;
        }
    });
}
function clearHandler(){
    ctx.clearRect(0,0,board.width,board.height);
}
function updateSize(){
    inputSize.value = size;
}
function decreaseHandler(){
    size -= 5;
    if(size <= 5){
        size = 5;
    }
    updateSize();
}
function increaseHandler(){
    size += 5;
    if(size >= 50){
        size = 50;
    }
    updateSize();
}
function sizeChangeHandler(e){
    const sizeValue = Number(e.target.value);
    if(isNaN(sizeValue)){
        size = 5;
    }
    size = sizeValue;
    if(sizeValue >= 50){
        size = 50;
    }
    if(sizeValue <= 5){
        size = 5;
    }
    updateSize();
}
function throttle(fn,wait = 100){
    let done = false;
    return (...args) => {
        if(!done){
            fn.call(this,args);
            done = true;
        }
        setTimeout(() => {
            done = false;
        },wait);
    }
}
window.onload = () => {
    initColorPicker();
    updateSize();
    const handlers = [
        {
            type:"mousedown",
            handler:mouseDownHandler
        },
        {
            type:"mouseup",
            handler:mouseUpHandler
        },
        {
            type:"mousemove",
            handler:mouseMoveHandler
        }
    ];
    for(let i = 0,l = handlers.length;i < l;i++){
        on(board,handlers[i].type,handlers[i].handler);
    }
    on(clear,'click',clearHandler);
    on(decrease,'click',decreaseHandler);
    on(increase,'click',increaseHandler);
    on(inputSize,'input',sizeChangeHandler);
}