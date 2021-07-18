const $ = v => document.querySelector(v);
const count = $("#count");
const love = $("#love");
const btn = $("#clickLoveBtn");
let clickTime = 0,timesClicked = 0;
function clickHandler(e){
    if(clickTime === 0){
        clickTime = Date.now();
    }else{
        if(Date.now() - clickTime < 400){
            createHeart(e);
            clickTime = 0;
        }else{
            clickTime = Date.now();
        }
    }
}
function createHeart(event){
    const heart = document.createElement("div");
    heart.className="heart grow";
    const x = event.clientX,y = event.clientY;
    const leftOffset = event.target.offsetLeft,topOffset = event.target.offsetTop;
    const xInside = x - leftOffset,yInside = y - topOffset;
    heart.style.left = `${ xInside }px`;
    heart.style.top = `${ yInside}px`;
    love.appendChild(heart);
    count.innerHTML = ++timesClicked;
    setTimeout(() => heart.remove(),2000);
}
window.onload = () => {
    love.addEventListener("click",clickHandler);
    btn.addEventListener("click",clickHandler);
}