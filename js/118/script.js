class TimerManager {
    constructor(){
        this.timers = [];
        this.args = [];
        this.isTimerRun = false;
    }
    add(timer,args){
        this.timers.push(timer);
        this.args.push(args);
        this.timerRun();
    }
    timerRun(){
        if (!this.isTimerRun) {
            const timer = this.timers.shift(),
                args = this.args.shift();
            if (timer && args) {
                this.isTimerRun = true;
                timer(args[0], args[1]);
            }
        }
    }
    next(){
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
    constructor(options={}){
        this.animation = Object.create(null);
        this.initAnimation();
        this.container = RabbitAlbum.$(options.el) || document.body;
        this.imageList = options.resources || [];
        this.createAlbum();
    }
    createAlbum(){
        const randomSort = this.imageList.sort((a,b) => Math.random() > 0.5 ? -1 : 1);
        let template = '';
        randomSort.forEach(item => {
            template += `
                <div class="rabbit-box-album-item" data-title="${item.title}" data-content="${item.content}">
                    <img src="${item.src}" alt="图片加载中" class="rabbit-box-album-item-img">
                </div>
            `;
        });
        this.container.innerHTML = template;
        this.container.addEventListener('click',e => {
            if(e.target.className.includes('rabbit-box-album-item')){
                if(e.target.firstElementChild){
                    const src = e.target.firstElementChild.getAttribute('src');
                    this.preview(src);
                }
            }
        })
    }
    initAnimation(){
        const _self = this;
        if(typeof this.animation['fadeIn'] !== 'function'){
            this.animation['fadeIn'] = function(element,time = 400){
                TimerManager.makeTimerManage(element);
                element.TimerManage.add(_self.fadeIn, arguments);
                return this;
            }
        }
        if(typeof this.animation['fadeOut'] !== 'function'){
            this.animation['fadeOut'] = function(element,time = 400){
                TimerManager.makeTimerManage(element);
                element.TimerManage.add(_self.fadeOut, arguments);
                return this;
            }
        }
    }
    preview(src,time = 600){
        const imgTag = RabbitAlbum._create('img'),
              imgMask = RabbitAlbum._create('div');
        imgMask.style.cssText += 'position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;';
        imgTag.style.cssText += 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:auto;height:auto;border-radius:5px;';
        imgMask.id = 'previewMask';
        imgTag.src = src;
        imgMask.appendChild(imgTag);
        const mask = RabbitAlbum.$("#previewMask");
        if (!mask) {
            document.body.appendChild(imgMask);
            this.animation.fadeIn(imgMask, time);
        } else {
            document.body.replaceChild(imgMask, mask);
            this.animation.fadeIn(imgMask, time);
        }
        imgMask.addEventListener('click',  e => {
            const el = e.target.tagName.toLowerCase().indexOf('img') > -1 ? e.target.parentElement : e.target;
            this.animation.fadeOut(el, time);
        }, false)
    }
    fadeIn(element,time){
        element.style.transition = "opacity" + time + " ms";
        if (!Number(RabbitAlbum.getCss(element, 'opacity')) || !parseInt(RabbitAlbum.getCss(element, 'opacity')) <= 0) {
            element.style.display = "none";
            element.style.opacity = 0;
            let curAlpha = 0,
                addAlpha = 1 * 100 / (time / 10),
                timer = null;
            let handleFade = function () {
                curAlpha += addAlpha;
                if (element.style.display === 'none'){
                    element.style.display = "block";
                }
                element.style.opacity = (curAlpha / 100).toFixed(2);
                if (curAlpha >= 100) {
                    if (timer) clearTimeout(timer);
                    element.style.opacity = 1;
                    TimerManager.runNext(element);
                } else {
                    timer = setTimeout(handleFade, 10);
                }
            }
            handleFade();
        } else {
            TimerManager.runNext(element);
        }
    }
    fadeOut(element,time){
        element.style.transition = "opacity" + time + " ms";
        if (parseInt(RabbitAlbum.getCss(element, 'opacity')) >= 1) {
            element.style.opacity = 1;
            element.style.display = "block";
            let curAlpha = 100,
                reduceAlpha = 1 * 100 / (time / 10),
                timer = null;
            let handleFade = function () {
                curAlpha -= reduceAlpha;
                element.style.opacity = (curAlpha / 100).toFixed(2);
                if (curAlpha <= 0) {
                    if (timer){
                        clearTimeout(timer);
                    }
                    element.style.opacity = 0;
                    element.style.display = "none";
                    TimerManager.runNext(element);
                } else {
                    timer = setTimeout(handleFade, 10);
                }
            }
            handleFade();
        } else {
            TimerManager.runNext(element);
        }
    }
}

RabbitAlbum.getCss = (el, prop) => window.getComputedStyle(el, null)[prop];
RabbitAlbum.$ = (selector,el = document) => el.querySelector(selector);
RabbitAlbum._create = name => document.createElement(name);

