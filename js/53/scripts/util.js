var EventUtil = Object.create(null);
EventUtil.addHandler = function(element,type,handler){
    return element.addEventListener ? element.addEventListener(type,handler,false) :
           element.attachEvent ? element.attachEvent('on' + type,handler) :
           element['on' + type] = handler;
}
EventUtil.removeHandler = function(element,type,handler){
    return element.removeEventListener ? element.removeEventListener(type,handler,false) :
           element.detachEvent ? element.detachEvent('on' + type,handler) :
           element['on' + type] = null;
}
function createUUID(){
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
}
function $(selector){
    return document.querySelector(selector);
}
function $$(selector){
    return document.querySelectorAll(selector);
}
function filterInt(value){
    return /^(\-|\+)?(\d+|Infinity)$/.test(value) ? Number(value) : NaN;
}
