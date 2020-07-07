function _class(str) {
    return document.getElementsByClassName(str);
}
var font_string = _class("fontString")[0];
var strExample = "网上打字测试，点开始之后可以开始打字，按下第一个键之后开始计时，" +
    "打字结束之后可以按计算速度计算你刚才打字的速度，下方同时显示错误的字数、经过的时间。" +
    "打错的字是红色显示，正确的是蓝色字，还没有打的是黑色。"
var constTimeEl = _class("time")[0];
var cost_time = 0;
var error_count = 0;
var timer;
var haveEnter = false;
var fontTextarea = _class("fontTextarea")[0];
var beginBtn = _class("beginBtn")[0],
    finishBtn = _class("finishBtn")[0];
var error = _class("error")[0],
    speed = _class("speed")[0];
window.onload = function () {
    fontTextarea.disabled = true;
    font_string.innerText = strExample;
    fontTextarea.onkeydown = function () {
        var str_count = 0;
        var str = "";
        if (fontTextarea.value == "") return;
        if (!haveEnter) {
            haveEnter = true;
            cost_time = 0;
            timer = setInterval(function () {
                showtimeFun();
            }, 1000);
        }
        for (var i = 0; i < strExample.length - 1; i++) {
            if (i < fontTextarea.value.length) {
                if (fontTextarea.value.slice(i, i + 1) == strExample.slice(i, i + 1)) {
                    str = str + "<span class='right-font'>" + strExample.slice(i, i + 1) + "</span>";
                }
                else {
                    str = str + "<span class='error-font'>" + strExample.slice(i, i + 1) + "</span>";
                    str_count++;
                }
            }
            else {
                str = str + strExample.slice(i, i + 1);
            }
        }
        error_count = str_count;
        font_string.innerHTML = str;
        error.innerText = error_count;
    }
    function showtimeFun() {
        cost_time++;
        constTimeEl.innerText = cost_time;
    }
    beginBtn.onclick = function () {
        error_count = 0;
        font_string.innerText = strExample;
        fontTextarea.value = "";
        fontTextarea.disabled = false;
        fontTextarea.focus();
        error.innerText = error_count;
        speed.innerText = "0";
    }
    finishBtn.onclick = function () {
        clearInterval(timer);
        constTimeEl.innerText = 0;
        fontTextarea.disabled = true;
        var sp = 0;
        if (fontTextarea.value == "") {
            return sp;
        } else {
            sp = Number(fontTextarea.value.length * 60 / cost_time).toFixed(2);
            speed.innerText = sp;
            haveEnter = false;
        }
    }
}