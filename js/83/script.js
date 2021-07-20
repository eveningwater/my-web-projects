// https://github.com//eveningwater/my-web-projects
const $ = v => document.querySelector(v);
const slideContainer = $(".slide-container");
const leftSlide = $(".left-slide");
const rightSlide = $(".right-slide");
const arrowDown = $(".arrow-down-btn");
const arrowUp = $(".arrow-up-btn");
const slideLeftItem = leftSlide.querySelectorAll(".left-slide-item");
const slideRightItem = rightSlide.querySelectorAll(".right-slide-item");
const l = slideLeftItem.length;
let currentIndex = 0,width = window.innerWidth,position;
function setPosition(el){
    let itemWidth,slideLeftWidth,slideRightWidth,left,top;
    if(isHorizontal()){
        itemWidth = width + 'px';
        slideLeftWidth = slideRightWidth = width * l + 'px';
        left = -(width * (l - 1)) + 'px';
        top = 0;
    }else{
        itemWidth = "100%";
        slideLeftWidth = "35%";
        slideRightWidth = "65%";
        left = 0;
        top = "-" + (l - 1) * 100 + "vh";
    }
    [...slideLeftItem,...slideRightItem].forEach(item => item.style.width = itemWidth);
    leftSlide.style.width= slideLeftWidth;
    rightSlide.style.width = slideRightWidth;
    [
        {
            prop:"left",
            value:left
        },
        {
            prop:"top",
            value:top
        }
    ].forEach(item => el.style[item.prop] = item.value);
}
function changeSlide(direction){
    if(direction === 'up'){
        currentIndex++;
        if(currentIndex > l - 1){
            currentIndex = 0;
        }
    }else if(direction === 'down'){
        currentIndex--;
        if(currentIndex < 0){
            currentIndex = l - 1;
        }
    }
    setTransform();
}
function isHorizontal(){
    return width <= 869;
}
function setTransform(){
    let translate = isHorizontal() ? "translateX" : "translateY";
    leftSlide.style.transform = `${ translate }(${position * currentIndex}px)`;
    rightSlide.style.transform = `${ translate }(${-(position * currentIndex)}px)`;
}
function setPositionValue(){
    position = isHorizontal() ? width : window.innerHeight
}
window.onload = () => {
    setPositionValue();
    setPosition(leftSlide);
    window.addEventListener("resize",() => {
        width = window.innerWidth;
        setPositionValue();
        setPosition(leftSlide);
        setTransform();
    })
    arrowDown.addEventListener("click",() => changeSlide("down"));
    arrowUp.addEventListener("click",() => changeSlide("up"));
}