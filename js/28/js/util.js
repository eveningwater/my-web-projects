
/*
* the animation API
*/

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
        || window.oRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
})();

function lerpDistance(aim, cur, ratio) {
    return aim + (cur - aim) * ratio;
}

function lerpAngle(a, b, t) {
    var d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
}

function caleLength(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

