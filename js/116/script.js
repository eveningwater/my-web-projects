/**
 *  温馨提示
 *  本游戏设定就是一个死局，只需要学习如何实现的就行了，不要尝试去玩
 */

const global_image_url = 'https://www.eveningwater.com/my-web-projects/jQuery/7/img/';
const globalImageList = new Array(10).fill(null).map((item,index) => (`${global_image_url + (index + 1)}.jpg`))

class Game {
    constructor(originSource, bindElement) {
        this.doc = document;
        this.originSource = originSource;
        this.bindElement = bindElement || this.doc.body;
        // 存储随机打乱的元素
        this.source = [];
        // 存储点击的元素
        this.store = {};
        this.score = 0;
        // dom元素
        this.box = null;
        this.leftSource = null;
        this.rightSource = null;
        this.collection = null;
        this.scoreElement = null;
        // 需要调用bind方法修改this指向
        this.init().then(this.startHandler.bind(this));
    }
    startHandler() {
        this.box = this.$('#ew-box');
        this.leftSource = this.$('#ew-left-source');
        this.rightSource = this.$('#ew-right-source');
        this.collection = this.$('#ew-collection');
        this.scoreElement = this.$('#ew-score');
        this.resetHandler();
        const count = Math.max(this.source.length,20);
        for (let i = 0; i < count; i++) {
            this.originSource.forEach((src, index) => {
                this.source.push({
                    src,
                    index
                })
            })
        }
        this.source = this.randomList(this.source);
        for (let k = 6; k > 0; k--) {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < k; j++) {
                    const item = this.create('div');
                    item.setAttribute('x', i);
                    item.setAttribute('y', j);
                    item.setAttribute('z', k);
                    item.className = `ew-box-item ew-box-${i}-${j}-${k}`;
                    item.style.position = 'absolute';
                    const image = this.source.splice(0, 1);
                    if(!image.length){
                        continue;
                    }
                    // 1.33为item设置的宽度与高度
                    item.style.left = 1.33 * j + Math.random() * .1 * k + 'rem';
                    item.style.top = 1.33 * i + Math.random() * .1 * k + 'rem';
                    item.setAttribute('index', image[0].index);
                    item.style.backgroundImage = `url(${image[0].src})`;
                    const clickHandler = () => this.blockClickHandler(item,true,null,clickHandler);
                    item.addEventListener('click', clickHandler)
                    this.box.append(item);
                }
            }
        }
        // 平分两边
        const len = Math.ceil(this.source.length / 2);
        this.source.forEach((item, index) => {
            const div = this.create('div');
            div.classList.add('ew-box-item');
            div.setAttribute('index', item.index);
            div.style.backgroundImage = `url(${item.src})`;
            div.style.position = 'absolute';
            div.style.top = 0;
            if (index > len) {
                div.style.right = `${(6 * (index - len)) / 100}rem`;
                this.rightSource.appendChild(div);
            } else {
                div.style.left = `${(6 * index) / 100}rem`;
                this.leftSource.appendChild(div)
            }
            const clickHandler = () => this.blockClickHandler(div,false,div.parentElement.lastElementChild,clickHandler);
            div.addEventListener('click', clickHandler);
        });
        this.createShadow();
    }
    blockClickHandler(block,type = false,lastChild,clickHandler){
        if(block.parentElement.className === 'ew-collection' || (type && block.classList.contains('ew-shadow')) || (!type && lastChild !== block)){
            return;
        }
        const currentIndex = block.getAttribute('index');
        this.store[currentIndex] ? (this.store[currentIndex]++) : (this.store[currentIndex] = 1);
        block.style.position = 'static';
        this.collection.appendChild(block);
        if(type){
            this.$$('.ew-box-item',this.box).forEach(item => item.classList.remove('ew-shadow'));
            this.createShadow();
        }
        if (this.store[currentIndex] === 3) {
            this.score++;
            this.$$(`div[index="${currentIndex}"]`, this.collection).forEach(item => item.remove());
            this.store[currentIndex] = 0;
            this.scoreElement.textContent = this.scoreElement.textContent.replace(/\d+/g,this.score);
        }
        let num = Object.values(this.store).reduce((res,item) => res += item,0);
        if (num >= 7) {
            block.removeEventListener('click', clickHandler);
            this.gameOver();
        }
    }
    createShadow(){
        this.$$('.ew-box-item',this.box).forEach((item,index) => {
            let x = item.getAttribute('x'),
                y = item.getAttribute('y'),
                z = item.getAttribute('z'),
                ele = this.$$(`.ew-box-${x}-${y}-${z-1}`),
                eleOther = this.$$(`.ew-box-${x + 1}-${y + 1}-${z - 1}`);
            if (ele.length || eleOther.length) {
                item.classList.add('ew-shadow');
            }
        })
    }
    /**
     * 游戏结束
     */
    gameOver() {
        const self = this;
        ewConfirm({
            title: "温馨提示",
            content: "游戏已结束，别难过，重新试试，你能行的！",
            sureText: "重新开始",
            isClickModal:false,
            sure(context) {
                context.close();
                self.startHandler();
            }
        })
    }
    create(name) {
        return this.doc.createElement(name);
    }
    /**
     * 重置元素
     */
    resetHandler() {
        this.box.innerHTML = '';
        this.leftSource.innerHTML = '';
        this.rightSource.innerHTML = '';
        this.collection.innerHTML = '';
        this.store = {};
        this.source = [];
        this.score = 0;
    }
    init() {
        return new Promise(resolve => {
            const template = `<div class="ew-box" id="ew-box"></div>
            <div class="ew-left-source" id="ew-left-source"></div>
            <div class="ew-right-source" id="ew-right-source"></div>
            <div class="ew-score" id="ew-score">当前得分:${this.score}</div>
            <div class="ew-collection" id="ew-collection"></div>`;
            const div = this.create('div');
            this.bindElement.insertBefore(div, document.body.firstChild);
            this.createElement(div, template);
            div.remove();
            resolve();
        })
    }
    createElement(el, str) {
        return el.insertAdjacentHTML('beforebegin', str);
    }
    /**
     * 打乱顺序
     * @param {*} arr 
     * @returns 
     */
    randomList(arr) {
        const newArr = [...arr];
        for (let i = newArr.length - 1; i >= 0; i--) {
            const index = Math.floor(Math.random() * i + 1);
            const next = newArr[index];
            newArr[index] = newArr[i];
            newArr[i] = next;
        }
        return newArr;
    }
    $(selector, el = this.doc) {
        return el.querySelector(selector);
    }
    $$(selector, el = this.doc) {
        return el.querySelectorAll(selector);
    }
}
window.onload = () => {
    const game = new Game(globalImageList);
}