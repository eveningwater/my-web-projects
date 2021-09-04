const $ = (v,el = document) => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);
class Carousel {
    constructor(options) {
        this.container = $(options.el);
        this.carouselItems = this.container.querySelectorAll('.carousel-item');
        this.carouselSigns = $$(('.carousel-sign li'),this.container);
        this.carouselCtrlL = $$(('.carousel-ctrl'),this.container)[0];
        this.carouselCtrlR = $$(('.carousel-ctrl'),this.container)[1];

        // 当前图片索引
        this.curIndex = 0;
        // 轮播盒内图片数量
        this.numItems = this.carouselItems.length;

        // 是否可以滑动
        this.status = true;

        // 轮播速度
        this.speed = options.speed || 600;
        // 等待延时
        this.delay = options.delay || 3000;

        // 轮播方向
        this.direction = options.direction || 'left';

        // 是否监听键盘事件
        this.monitorKeyEvent = options.monitorKeyEvent || false;
        // 是否监听屏幕滑动事件
        this.monitorTouchEvent = options.monitorTouchEvent || false;

        this.handleEvents();
        this.setTransition();
    }

    // 开始轮播
    start() {
        const event = {
            srcElement: this.direction == 'left' ? this.carouselCtrlR : this.carouselCtrlL
        };
        const clickCtrl = this.clickCtrl.bind(this);
        // 每隔一段时间模拟点击控件
        this.interval = setInterval(clickCtrl, this.delay, event);
    }

    // 暂停轮播
    pause() {
        clearInterval(this.interval);
    }

    /**
     * 设置轮播图片的过渡属性
     * 在文件头内增加一个样式标签
     * 标签内包含轮播图的过渡属性
     */
    setTransition() {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        const styleRule = `.carousel-item {transition: left ${this.speed}ms ease-in-out}`
        styleElement.sheet.insertRule(styleRule, 0);
    }

    // 处理点击控件事件
    clickCtrl(event) {
        if (!this.status) return;
        this.status = false;
        let fromIndex = this.curIndex, toIndex, direction;
        if (event.srcElement == this.carouselCtrlR) {
            toIndex = (this.curIndex + 1) % this.numItems;
            direction = 'left';
        } else {
            toIndex = (this.curIndex + this.numItems - 1) % this.numItems;
            direction = 'right';
        }
        this.slide(fromIndex, toIndex, direction);
        this.curIndex = toIndex;
    }

    // 处理点击标志事件
    clickSign(event) {
        if (!this.status) return;
        this.status = false;
        const fromIndex = this.curIndex;
        const toIndex = parseInt(event.srcElement.getAttribute('slide-to'));
        const direction = fromIndex < toIndex ? 'left' : 'right';
        this.slide(fromIndex, toIndex, direction);
        this.curIndex = toIndex;
    }

    // 处理滑动屏幕事件
    touchScreen(event) {
        if (event.type == 'touchstart') {
            this.startX = event.touches[0].pageX;
            this.startY = event.touches[0].pageY;
        } else {  // touchend
            this.endX = event.changedTouches[0].pageX;
            this.endY = event.changedTouches[0].pageY;

            // 计算滑动方向的角度
            const dx = this.endX - this.startX
            const dy = this.startY - this.endY;
            const angle = Math.abs(Math.atan2(dy, dx) * 180 / Math.PI);

            // 滑动距离太短
            if (Math.abs(dx) < 10 || Math.abs(dy) < 10) return;

            if (angle >= 0 && angle <= 45) {
                // 向右侧滑动屏幕，模拟点击左控件
                this.carouselCtrlL.click();
            } else if (angle >= 135 && angle <= 180) {
                // 向左侧滑动屏幕，模拟点击右控件
                this.carouselCtrlR.click();
            }
        }
    }

    // 处理键盘按下事件
    keyDown(event) {
        if (event && event.keyCode == 37) {
            this.carouselCtrlL.click();
        } else if (event && event.keyCode == 39) {
            this.carouselCtrlR.click();
        }
    }

    // 处理各类事件
    handleEvents() {
        // 鼠标移动到轮播盒上时继续轮播
        this.container.addEventListener('mouseleave', this.start.bind(this));
        // 鼠标从轮播盒上移开时暂停轮播
        this.container.addEventListener('mouseover', this.pause.bind(this));

        // 点击左侧控件向右滑动图片
        this.carouselCtrlL.addEventListener('click', this.clickCtrl.bind(this));
        // 点击右侧控件向左滑动图片
        this.carouselCtrlR.addEventListener('click', this.clickCtrl.bind(this));

        // 点击轮播标志后滑动到对应的图片
        for (let i = 0; i < this.carouselSigns.length; i++) {
            this.carouselSigns[i].setAttribute('slide-to', i);
            this.carouselSigns[i].addEventListener('click', this.clickSign.bind(this));
        }

        // 监听键盘事件
        if (this.monitorKeyEvent) {
            document.addEventListener('keydown', this.keyDown.bind(this));
        }

        // 监听屏幕滑动事件
        if (this.monitorTouchEvent) {
            this.container.addEventListener('touchstart', this.touchScreen.bind(this));
            this.container.addEventListener('touchend', this.touchScreen.bind(this));
        }
    }

    /**
     * 滑动图片
     * @param {number} fromIndex
     * @param {number} toIndex 
     * @param {string} direction
     */
    slide(fromIndex, toIndex, direction) {
        let fromClass, toClass;
        if (direction == 'left') {
            this.carouselItems[toIndex].className = "carousel-item next";
            fromClass = 'carousel-item active left';
            toClass = 'carousel-item next left';
        } else {
            this.carouselItems[toIndex].className = "carousel-item prev";
            fromClass = 'carousel-item active right';
            toClass = 'carousel-item prev right';
        }
        this.carouselSigns[fromIndex].className = "";
        this.carouselSigns[toIndex].className = "active";

        setTimeout((() => {
            this.carouselItems[fromIndex].className = fromClass;
            this.carouselItems[toIndex].className = toClass;
        }).bind(this), 50);

        setTimeout((() => {
            this.carouselItems[fromIndex].className = 'carousel-item';
            this.carouselItems[toIndex].className = 'carousel-item active';
            this.status = true;  // 设置为可以滑动
        }).bind(this), this.speed + 50);
    }
}
