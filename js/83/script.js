const leftSlide = document.querySelector(".left-slide");
const rightSlide = document.querySelector(".right-slide");
const arrowDown = document.querySelector(".arrow-down-btn");
const arrowUp = document.querySelector(".arrow-up-btn");
const l = leftSlide.querySelectorAll(".left-slide-item").length;
let currentIndex = 0;
let slideContainer = document.querySelector(".slide-container");
let position = window.innerHeight;
function setPosition(el){
    el.style.top = "-" + (l - 1) * 100 +"vh";
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
function setTransform(){
    leftSlide.style.transform = "translateY(" + (position * currentIndex) +"px)";
    rightSlide.style.transform = "translateY(" + -(position * currentIndex) +"px)";
}
window.onload = () => {
    setPosition(leftSlide);
    window.addEventListener("resize",() => {
        position = window.innerHeight;
        setTransform();
    })
    arrowDown.addEventListener("click",() => changeSlide("down"));
    arrowUp.addEventListener("click",() => changeSlide("up"));
}