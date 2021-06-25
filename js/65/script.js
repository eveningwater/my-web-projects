const $ = v => document.querySelector(v);
const container = $('.container');
const leftSplit = $('.split-left');
const rightSplit = $('.split-right');
HTMLElement.prototype.addClass = function(className) {
    this.classList.add(className);
};
HTMLElement.prototype.removeClass = function(className){
    this.classList.remove(className);
}
const on = (el,type,handler,useCapture = false) => {
    if(el && type && handler) {
        el.addEventListener(type,handler,useCapture);
    }
}
on(leftSplit,'mouseenter',() => container.addClass('hover-left'));
on(leftSplit,'mouseleave',() => container.removeClass('hover-left'));
on(rightSplit,'mouseenter',() => container.addClass('hover-right'));
on(rightSplit,'mouseleave',() => container.removeClass('hover-right'));