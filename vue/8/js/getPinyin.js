function getPinYin(str) {
    var length = str.length, unstr = '', result = '', regx = /[a-zA-Z]/g;
    if (regx.test(str)) return;
    if (length > 1) {
        for (var i = 0; i < length; i++) {
            unstr += '\\u' + str.charCodeAt(i).toString(16);
        }
    } else {
        unstr = '\\u' + str.charCodeAt(0).toString(16);
    }
    for (var name in PinYin) {
        if (PinYin[name].indexOf(str) !== -1) {
            result = name; break;
        }
    }
    return result;
}
