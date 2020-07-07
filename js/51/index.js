window.onload = function () {
    var timer = null;
    var speed = 4;
    var od = document.getElementById("wrapper");
    var au = od.getElementsByTagName('ul')[0];
    var ali = au.getElementsByTagName('li');
    au.innerHTML = au.innerHTML + au.innerHTML;
    au.style.width = ali[0].offsetWidth * ali.length + 'px';
    timer = setInterval(move, 30)
    function move() {
        if (au.offsetLeft < -au.offsetWidth / 2) {
            au.style.left = '0';
        }
        if (au.offsetLeft > 0) {
            au.style.left = -au.offsetWidth / 2 + 'px';
        }
        au.style.left = au.offsetLeft + speed + 'px';
    }
    od.onmouseover = function () {
        clearInterval(timer);
    }
    od.onmouseout = function () {
        timer = setInterval(move, 30)
    }
    document.getElementById("btn1").onclick = function () {
        speed = -4;
    }
    document.getElementById("btn2").onclick = function () {
        speed = 4;
    }
}