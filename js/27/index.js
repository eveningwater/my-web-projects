function $(e) {
    return document.getElementById(e);
}
$('setUnicode').onclick = function () {
    setUnicode();
}
$('getUnicode').onclick = function () {
    getUnicode();
}
function setUnicode() {
    var in_val = $('unicodeInput').textContent;
    var in_str = '';
    if (in_val) {
        for (var i = 0, len = in_val.length; i < len; i++) {
            in_str += '\\u' + in_val[i].charCodeAt(0).toString(16);
        }
        $('unicodeOutput').textContent = in_str;
    }
}
function getUnicode() {
    var out_val = $('unicodeInput').textContent;
    if (out_val && out_val.indexOf('\\u') !== -1) {
        var valArr = out_val.split('\\u'), result = '';
        for (var j = 0, length = valArr.length; j < length; j++) {
            result += String.fromCharCode(parseInt(valArr[j], 16));
        }
        //如果不截取，则会出现空白字符，如何也消除不了
        $('unicodeOutput').textContent = result.slice(1);
    } else {
        alert('不是unicode字符，无需解码!')
    }
}