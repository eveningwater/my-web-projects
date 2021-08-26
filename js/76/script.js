const $ = v => document.querySelector(v);
const $$ = v => document.querySelectorAll(v);
const background = $("#background");
const prev = $("#prev");
const next = $("#next");
const slideItems = $$('.slide-container .slide-item');
let currentActive = 0;
function setBackgroundImage(){
    if(!slideItems[currentActive])return;
    const url = slideItems[currentActive].style.backgroundImage;
    background.style.backgroundImage = url;
}
function setSlideItem(){
    const currentSlide = slideItems[currentActive];
    if(!currentSlide)return;
    const siblings = [].filter.call(slideItems,slide => slide !== currentSlide);
    currentSlide.classList.add('active');
    siblings.forEach(slide => slide.classList.remove('active'));
}
function slideHandler(){
    setBackgroundImage();
    setSlideItem();
}
function prevHandler(){
    prev.addEventListener('click',() => {
        if(currentActive < 0){
            currentActive = slideItems.length - 1;
        }else{
            currentActive--;
        }
        slideHandler();
    });
}
function nextHandler(){
    next.addEventListener('click',() => {
        if(currentActive >= slideItems.length - 1){
            currentActive = 0;
        }else{
            currentActive++;
        }
        slideHandler();
    });
}
window.onload = () => {
    prevHandler();
    nextHandler();
    slideHandler();
}