// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (n,inMin,inMax,outerMin,outerMax) => (n - inMin) * (outerMax - outerMin) / (inMax - inMin) + outerMin;
const text = document.querySelector('.loading-text');
const bg = document.querySelector('.background');
let load = 0;
let timer = null;
let blurryLoadingHandler = function(){
    load++;
    if(load > 99){
        clearTimeout(timer)
    }else{
        timer = setTimeout(blurryLoadingHandler,20);
    }
    text.textContent = `页面加载${ load }%`;
    text.style.opacity = scale(load,0,100,1,0);
    bg.style.filter = `blur(${scale(load,0,100,20,0)}px)`;
}
blurryLoadingHandler();