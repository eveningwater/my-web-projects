export default class ewWebsiteBaseUtils {
    eventType: string[];
    constructor() {
        this.eventType = this.isMobile()
            ? ['touchstart', 'touchmove', 'touchend']
            : ['mousedown', 'mousemove', 'mouseup'];
    }
    isMobile() {
        return !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
    }
    $(selector: string, el: Document | HTMLElement = document) {
        return el.querySelector(selector);
    }
    $$(selector: string, el: Document | HTMLElement = document) {
        return el.querySelectorAll(selector);
    }

    getStyle(
        el: HTMLElement,
        selector: string | null | undefined = null,
        prop: string
    ) {
        const getComputedStyle = window.getComputedStyle || document.defaultView;
        return getComputedStyle(el, selector).getPropertyValue(prop);
    }
    hasClass(el: HTMLElement, className: string) {
        if (el.classList.contains) {
            return el.classList.contains(className);
        } else {
            const matchRegExp = new RegExp('(^|\\s)' + className + '(\\s|$)');
            return matchRegExp.test(el.className);
        }
    }
    handleClassName(className?: string, status?: boolean) {
        const condition = this.isBoolean(status) ? status : this.isString(className) && className;
        return condition ? ` ${className}` : '';
    }
    handleTemplate(isRender?: boolean, template?: string) {
        return this.isBoolean(isRender) && isRender && this.isString(template) && template ? template : '';
    }

    isObject<T>(v: T) {
        return v && typeof v === 'object';
    }
    isString<T>(value: T) {
        return typeof value === 'string';
    }

    isBoolean<T>(v: T) { return typeof v === 'boolean'; }


    on(
        element: HTMLElement | Document | Element | Window,
        type: string,
        handler: EventListenerOrEventListenerObject,
        useCapture = false
    ) {
        if (element && type && handler) {
            element.addEventListener(type, handler, useCapture);
        }
    }
    off(
        element: HTMLElement | Document | Element | Window,
        type: string,
        handler: EventListenerOrEventListenerObject,
        useCapture = false
    ) {
        if (element && type && handler) {
            element.removeEventListener(type, handler, useCapture);
        }
    }

    create(tagName: string) {
        return document.createElement(tagName);
    }
    createElement(str: string) {
        const element = this.create('div');
        element.innerHTML = str;
        return element.firstElementChild;
    }
    assign(target: Record<string, any>, ...args: Record<string, any>[]) {
        if (Object.assign) {
            return Object.assign(target, ...args);
        } else {
            if (target === null) {
                return;
            }
            const _ = Object(target);
            args.forEach(item => {
                if (this.isObject(item)) {
                    for (let key in item) {
                        if (Object.prototype.hasOwnProperty.call(item, key)) {
                            _[key] = item[key];
                        }
                    }
                }
            });
            return _;
        }
    }
    addClass(el: HTMLElement, className: string) {
        return el.classList.add(className);
    }
    removeClass(el: HTMLElement, className: string) {
        return el.classList.remove(className);
    }
}
