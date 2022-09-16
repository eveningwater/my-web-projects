const globalImageList = [
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/1.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/2.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/3.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/4.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/5.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/6.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/7.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/8.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/9.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/10.jpg'
]

class Game {
    constructor(originSource, bindElement) {
        this.doc = document;
        this.originSource = originSource;
        this.bindElement = bindElement || this.doc.body;
        // 存储随机打乱的元素
        this.source = [];
        // 存储点击的元素
        this.temp = {};
        // dom元素
        this.box = null;
        this.leftSource = null;
        this.rightSource = null;
        this.collection = null;
        // 需要调用bind方法修改this指向
        this.init().then(this.startHandler.bind(this));
    }
    startHandler() {
        this.box = this.$('#ew-box');
        this.leftSource = this.$('#ew-left-source');
        this.rightSource = this.$('#ew-right-source');
        this.collection = this.$('#ew-collection');
        this.resetHandler();
        for (let i = 0; i < 12; i++) {
            this.originSource.forEach((src, index) => {
                this.source.push({
                    src,
                    index
                })
            })
        }
        this.source = this.randomList(this.source);
        for (let k = 5; k > 0; k--) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < k; j++) {
                    const item = this.create('div');
                    item.setAttribute('x', i);
                    item.setAttribute('y', j);
                    item.setAttribute('z', k);
                    item.className = `ew-box-item ew-box-${i}-${j}-${k}`;
                    item.style.position = 'absolute';
                    const image = this.source.splice(0, 1);
                    // 1.44为item设置的宽度与高度
                    item.style.left = 1.44 * j + Math.random() * .1 * k + 'rem';
                    item.style.top = 1.44 * i + Math.random() * .1 * k + 'rem';
                    item.setAttribute('index', image[0].index);
                    item.style.backgroundImage = `url(${image[0].src})`;
                    const clickHandler = () => {
                        // 如果是在收集框里是不能够点击的
                        if(item.parentElement.className === 'ew-collection'){
                            return;
                        }
                        // 没有阴影效果的元素才能够点击
                        if (!item.classList.contains('ew-shadow')) {
                            const currentIndex = item.getAttribute('index');
                            if (this.temp[currentIndex]) {
                                this.temp[currentIndex] += 1;
                            } else {
                                this.temp[currentIndex] = 1;
                            }
                            item.style.position = 'static';
                            this.collection.appendChild(item);
                            // 重置阴影效果
                            this.$$('.ew-box-item',this.box).forEach(item => item.classList.remove('ew-shadow'));
                            this.createShadow();
                            // 等于3个就消除掉
                            if (this.temp[currentIndex] === 3) {
                                this.$$(`div[index="${currentIndex}"]`, this.collection).forEach(item => item.remove());
                                this.temp[currentIndex] = 0;
                            }
                            let num = 0;
                            for (let i in this.temp) {
                                num += this.temp[i];
                            }
                            if (num > 7) {
                                item.removeEventListener('click', clickHandler);
                                this.gameOver();
                            }
                        }
                    }
                    item.addEventListener('click', clickHandler)
                    this.box.append(item);
                }
            }
        }
        let len = Math.ceil(this.source.length / 2);
        this.source.forEach((item, index) => {
            let div = this.create('div');
            div.classList.add('ew-box-item')
            div.setAttribute('index', item.index);
            div.style.backgroundImage = `url(${item.src})`;
            div.style.position = 'absolute';
            div.style.top = 0;
            if (index > len) {
                div.style.right = `${(5 * (index - len)) / 100}rem`;
                this.rightSource.appendChild(div);
            } else {
                div.style.left = `${(5 * index) / 100}rem`;
                this.leftSource.appendChild(div)
            }
            const clickHandler = () => {
                if(div.parentElement.className === 'ew-collection'){
                    return;
                }
                const currentIndex = div.getAttribute('index');
                if (this.temp[currentIndex]) {
                    this.temp[currentIndex] += 1;
                } else {
                    this.temp[currentIndex] = 1;
                }
                div.style.position = 'static';
                this.collection.appendChild(div);
                if (this.temp[currentIndex] === 3) {
                    this.$$(`div[index="${currentIndex}"]`, this.collection).forEach(item => item.remove());
                    this.temp[currentIndex] = 0;
                }
                let num = 0;
                for (let i in this.temp) {
                    num += this.temp[i];
                }
                if (num > 7) {
                    div.removeEventListener('click', clickHandler);
                    this.gameOver();
                }
            }
            div.addEventListener('click', clickHandler);
        });
        this.createShadow();
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
            content: "游戏结束，别灰心，你能行的！",
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
        this.temp = {};
        this.source = [];
    }
    init() {
        return new Promise(resolve => {
            const template = `<div class="ew-box" id="ew-box"></div>
            <div class="ew-left-source" id="ew-left-source"></div>
            <div class="ew-right-source" id="ew-right-source"></div>
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
    console.log(game);
}