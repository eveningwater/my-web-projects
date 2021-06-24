let boxElements = null;
function debounce(fn,time = 100){
    let timer = null;
    return function(){
        if(timer)clearTimeout(timer);
        timer = setTimeout(fn,time);
    }
}
function createTemplate(num){
    let _create = t => document.createElement(t);
    const body = document.body;
    for(let i = 0;i < num;i++){
        const parent = _create("div");
        parent.classList.add('box');
        const child = _create("h3");
        child.textContent = "content";
        parent.appendChild(child);
        body.appendChild(parent);
    }
    return [].filter.call(body.children,el => el.classList.contains('box'));
}
function showBox(){
    if(!boxElements){
        return;
    }
    let triggerBottom = window.innerHeight / 5 * 4;
    boxElements.forEach((box,index) => {
        const top = box.getBoundingClientRect().top;
        if(top <= triggerBottom){
            box.classList.add('show');
        }else{
            box.classList.remove('show');
        }
    })
}
window.onload = function(){
    boxElements = createTemplate(30);
    showBox();
    window.addEventListener('scroll',debounce(showBox));
}