const $ = v => document.querySelector(v);
const $$ = v => document.querySelectorAll(v);
const prevBtn = $("#prev");
const nextBtn = $("#next");
const progress = $("#progress");
const circleElements = $$(".circle");
const min = 0,max = circleElements.length - 1;
let currentActive = 0;
nextBtn.addEventListener("click",() => {
    if(nextBtn.classList.contains('disabled'))return;
    if(currentActive >= max - 1){
        // currentActive = min;
        handleClass(prevBtn).addClass("active").removeClass("disabled");
        handleClass(nextBtn). addClass("disabled").removeClass("active");
    }
    if(currentActive <= max - 1){
        currentActive++;
    }
    update();
});
prevBtn.addEventListener("click",() => {
    if(prevBtn.classList.contains('disabled'))return;
    if(currentActive <= 1){
        // currentActive = max -  1;
        handleClass(prevBtn).addClass("disabled").removeClass("active");
        handleClass(nextBtn).addClass("active").removeClass("disabled");
    }
    if(currentActive > 0){
        currentActive--;
    }
    update();
});
function handleClass(el){
    let methods = {
        addClass,
        removeClass
    };
    function addClass(c){
        el.classList.add(c);
        return methods;
    };
    function removeClass(c){
        el.classList.remove(c);
        return methods;
    }
    return methods
}
function update(){
    circleElements.forEach((item,index) => {
        if(index <= currentActive){
            item.classList.add('active');
        }else{
            item.classList.remove('active');
        }
    });
    progress.style.width = (100 / max * currentActive).toFixed(4) + '%';
}