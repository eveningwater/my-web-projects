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
        nextBtn.classList.add('disabled');
        prevBtn.classList.remove("disabled");
        nextBtn.classList.remove("active");
        prevBtn.classList.add("active");
    }
    if(currentActive <= max - 1){
        currentActive++;
    }
    progress.style.width = (100 / max * currentActive).toFixed(4) + '%';
    circleElements.forEach((item,index) => {
        if(index <= currentActive){
            item.classList.add('active');
        }
    });
});
prevBtn.addEventListener("click",() => {
    if(prevBtn.classList.contains('disabled'))return;
    if(currentActive <= 1){
        nextBtn.classList.remove('disabled');
        prevBtn.classList.add("disabled");
        nextBtn.classList.add("active");
        prevBtn.classList.remove("active");
        // currentActive = max -  1;
    }
    if(currentActive > 0){
        currentActive--;
    }
    progress.style.width = (100 / max * currentActive).toFixed(4) + '%';
    circleElements[currentActive + 1].classList.remove('active');
});