function isTextOverflow(element) {
    // use range width instead of scrollWidth to determine whether the text is overflowing
    // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
    if (!element || !element.childNodes || !element.childNodes.length) {
        return false;
    }
    const range = document.createRange();
    range.setStart(element, 0);
    range.setEnd(element, element.childNodes.length);
    const rangeWidth = range.getBoundingClientRect().width;
    // if the element has padding style,should add the padding value.
    const padding = (parseInt(getStyle(element, 'paddingLeft'), 10) || 0) + (parseInt(getStyle(element, 'paddingRight'), 10) || 0);
    return rangeWidth + padding > element.offsetWidth || element.scrollWidth > element.offsetWidth;
}
function hasClass(el, cls) {
    if (!el || !cls) {
        return false;
    }
    if (cls.indexOf(" ") > -1) {
        return console.error(`className should not contain space!`);
    }
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
    }
}
function camelCase(name) {
    return name.replace(/([\:\_\-]+(.))/g, (_, separator, letter, offset) => offset ? letter.toUpperCase() : letter).replace(/^moz([A-Z])/, "Moz$1")
}
// IE version more than 9
function getStyle(el, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        var computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element.style[styleName];
    }
}