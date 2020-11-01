/**
 * 变量定义部分
 */
const app = document.querySelector('#app');
let iconHTML = '';
const n = 520;
const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
/**
 * 创建爱心
 */
function createHeart() {
    for (let i = 0; i <= n; i++) {
        iconHTML += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" class="heart heart-${(i + 1)}" fill=${getRandomColor()}>
            <path
                d="M516.809433 921.67163S-142.389927 480.534026 144.538823 164.134706c18.112122-19.954032 40.522035-35.712601 65.592485-45.84311C335.278905 67.843709 429.932647 119.417208 478.026981 157.995003c20.568002 16.577196 50.038573 16.577196 70.606576 0C597.648846 118.700909 694.963126 65.797142 823.794544 121.259119c19.851704 8.595583 38.066154 20.670331 53.517737 35.814929C1183.78575 456.691516 516.809433 921.67163 516.809433 921.67163">
            </path>
        </svg>`;
    }
    app.innerHTML = iconHTML;
}
/**
 * 设置随机颜色
 */
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},${Math.random()})`;
}
/**
 * 取随机数
 * @param {*} scale 
 */
function getRandomScale(scale) {
    return Math.floor(Math.random() * scale + 1);
}
/**
 * 设置动画
 */
function setAnimate() {
    for (let j = 0; j <= n; j++) {
        let item = `heart-${(j + 1)}`;
        let boxWidth = getRandomScale(666) - getRandomScale(pageWidth);
        let boxHeight = getRandomScale(666) - getRandomScale(pageHeight);
        document.querySelector('.' + item).animate([
            {
                transform: `scale(${getRandomScale(1)})`, left: 0, top: 0
            },
            {
                transform: `scale(${getRandomScale(1)})`, left: `${pageWidth / 2}px`, top: `${pageHeight / 2}px`
            },
            {
                transform: `scale(${getRandomScale(1)})`, left: `${boxWidth * 2}px`, top: `${boxHeight * 2}px`
            }
        ], {
            duration: 6000,
            iterations: Infinity,
            easing: "ease-out"
        })
    }
}
window.onload = function () {
    createHeart();
    setTimeout(setAnimate, 1000);
}