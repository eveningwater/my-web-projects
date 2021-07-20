// https://github.com//eveningwater/my-web-projects
const $ = v => document.querySelector(v);
const $$ = v => document.querySelectorAll(v);
const remind = $("#remind");
const percent = $("#percent");
const cups = $$('.select-cup .cup');
const remindText = remind.querySelector('.cup-container');
const hasClass = (el, className) => el.classList.contains(className);
const addClass = (el, className) => el.classList.add(className);
const removeClass = (el, className) => el.classList.remove(className);
const setText = (el, text) => el.textContent = text;
const setStyle = (el, propValue = {}) => {
    Object.keys(propValue).forEach(key => el.style[key] = propValue[key]);
}
function setHeightVisible(h1, v1, h2, v2) {
    let o1 = {
        height: h1,
        visibility: v1
    }, o2 = {
        height: h2,
        visibility: v2
    };
    [remind, percent].forEach((el, index) => setStyle(el, (index === 0 ? o1 : o2)));
}
function setTextContent(t1, t2) {
    [percent, remindText].forEach((el, index) => setText(el, (index === 0 ? t1 : t2)));
}
function handler() {
    const l = cups.length;
    const unitHei = 350 / l;
    for (let i = 0; i < l; i++) {
        cups[i].addEventListener('click', () => {
            if (hasClass(cups[i], 'active')) {
                if (!cups[i + 1]) return;
                const last = hasClass(cups[i + 1], 'active');
                for (let j = i + 1; j < l; j++) {
                    removeClass(cups[j], 'active');
                }
                if (!last) {
                    removeClass(cups[i], 'active');
                }
            } else {
                for (let j = 0; j <= i; j++) {
                    addClass(cups[j], 'active');
                }
            }
            const actives = $$('.cup.active');
            if (actives.length === l) {
                setHeightVisible('0', 'hidden', '350px', 'visible');
                setTextContent("100%", "0L");
            } else if (actives.length === 0) {
                setHeightVisible('350px', 'visible', '0', 'hidden');
                setTextContent("12.5%", "2L");
            } else {
                const h1 = unitHei * (l - actives.length) + 'px';
                const h2 = unitHei * actives.length + 'px';
                setHeightVisible(h1, 'visible', h2, 'visible');
                const t1 = (unitHei * actives.length / 350) * 100 + "%";
                const t2 = (cups[i].textContent.replace(/ml/, "").replace(/\s+/, "") - 0) * (l - actives.length) / 1000 + 'L';
                setTextContent(t1, t2);
            }
        })
    }
}
window.onload = () => {
    setHeightVisible('350px', 'visible', '0', 'hidden');
    handler();
}