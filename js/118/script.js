class TimerManager {
    constructor() {
        this.timers = [];
        this.args = [];
        this.isTimerRun = false;
    }
    add(timer, args) {
        this.timers.push(timer);
        this.args.push(args);
        this.timerRun();
    }
    timerRun() {
        if (!this.isTimerRun) {
            const timer = this.timers.shift(),
                args = this.args.shift();
            if (timer && args) {
                this.isTimerRun = true;
                timer(args[0], args[1]);
            }
        }
    }
    next() {
        this.isTimerRun = false;
        this.timerRun();
    }
}
TimerManager.makeTimerManage = element => {
    if (!element.TimerManage || element.TimerManage.constructor !== TimerManager) {
        element.TimerManage = new TimerManager();
    }
}
TimerManager.runNext = element => {
    if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
        element.TimerManage.next();
    }
}

class RabbitAlbum {
    constructor(options = {}) {
        this.animation = Object.create(null);
        this.container = RabbitAlbum.$(options.el) || document.body;
        this.imageList = options.resources || [];
        this.createAlbum();
        this.viewer = null;
    }
    isValidImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        })
    }
    createAlbum() {
        const randomSort = this.imageList.sort((a, b) => Math.random() > 0.5 ? -1 : 1);
        let template = '';
        randomSort.forEach((item, index) => {
            template += `
                <div class="rabbit-box-album-item" data-title="${item.title}" data-content="${item.content}">
                    <img src="${item.src}" alt="图片加载中" class="rabbit-box-album-item-img" data-index="${index}">
                </div>
            `;
        });
        this.container.innerHTML = template;
        const imageList = [...document.querySelectorAll('.rabbit-box-album-item-img')];
        Promise.allSettled([...imageList].map(item => this.isValidImage(item?.getAttribute('src')))).then((res) => {
            if (res.filter(item => item.status === 'fulfilled').length === imageList.length) {
                this.viewer = new ewViewer({
                    img: [...imageList],
                    previewMode: 'img'
                });
            }
        })
        this.container.addEventListener('click', e => {
            if (e.target.className.includes('rabbit-box-album-item')) {
                if (e.target.firstElementChild) {
                    const imgIndex = e.target.firstElementChild.getAttribute('data-index');
                    this.viewer?.viewImage(imgIndex);
                }
            }
        })
    }

}

RabbitAlbum.getCss = (el, prop) => window.getComputedStyle(el, null)[prop];
RabbitAlbum.$ = (selector, el = document) => el.querySelector(selector);
RabbitAlbum._create = name => document.createElement(name);

