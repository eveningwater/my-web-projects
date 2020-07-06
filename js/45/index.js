var outer = document.getElementById("subject"),
    list = outer.getElementsByTagName("li");
function bind(e, eventType, callback) {
    if (typeof e.addEventListener === "function") {
        e.addEventListener(eventType, callback, false);
    } else if (e.attachEvent === "function") {
        e.attachEvent('on' + eventType, callback);
    }
}
function onMouseHandler(param) {
    var target = param.target || param.srcElement;
    for (var i = 0; i < list.length; i++) {
        list[i].className = "";
    }
    while (target.tagName.toLocaleLowerCase() != "li" && target.tagName.toLocaleLowerCase() != "body") {
        target = target.parentNode;
    }
    target.className = "big";
}
function initList() {
    for (var i = 0; i < list.length; i++) {
        bind(list[i], 'mouseover', onMouseHandler);
    }
}
initList();