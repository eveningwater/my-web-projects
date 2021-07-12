const dragItems = document.querySelectorAll('.drag-list > .drag-item');
const dragFill = document.querySelector('.drag-fill');
function random(){
    return Math.floor(Math.random() * 15);
}
function setFillImage(){
    dragFill.style.backgroundImage = `url("https://www.eveningwater.com/my-web-projects/js/26/img/${ random() }.jpg")`
}
function on(el,type,handler,useCapture = false){
    if(el && type && handler){
        el.addEventListener(type,handler,useCapture);
    }
}
function off(el,type,handler,useCapture = false){
    if(el && type && handler){
        el.removeEventListener(type,handler,useCapture);
    }
}
function onDragStart(){
    this.classList.add('drag-move');
    setTimeout(() => this.className = "invisible",200);
}
function onDragEnd(){
    this.classList.add("drag-fill");
}

function onDragOver(e){
    e.preventDefault();
}
function onDragEnter(e){
    e.preventDefault();
    this.classList.add('drag-active');
}
function onDragLeave(){
    this.className = "drag-item";
}
function onDrop(){
    this.className = "drag-item";
    this.appendChild(dragFill);
}
window.onload = () => {
    setFillImage();
    on(dragFill,'dragstart',onDragStart);
    on(dragFill,'dragend',onDragEnd);
    for(const item of dragItems){
        on(item,'dragover',onDragOver);
        on(item,'dragenter',onDragEnter);
        on(item,'dragleave',onDragLeave);
        on(item,'drop',onDrop);
    }
}