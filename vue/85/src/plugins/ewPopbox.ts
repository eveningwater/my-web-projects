import { closeIcon } from "../const/icon";
import ewWebsiteBaseUtils from "../utils/baseUtils";
import { PopBoxOptions } from "./confirm";
const defaultCloseTime = 600;
export default class createPopBox extends ewWebsiteBaseUtils {
    config: PopBoxOptions;
    defaultConfig: PopBoxOptions = {
        title: '提示',
        content: '默认内容',
        sure: () => this.close(defaultCloseTime),
        cancel: () => this.close(defaultCloseTime),
        showCancel: false,
        closeTime: defaultCloseTime,
        isClickModal: true,
        sureText: '确认',
        container: document.body,
        showClose: true,
        center: false
    }
    $el: HTMLElement | null = null;
    constructor(options: string | PopBoxOptions) {
        super();
        this.config = this.defaultConfig;
        if (this.isString(options)) {
            this.config.content = <string>options;
        } else if (this.isObject(options)) {
            this.config = this.assign(this.config, <PopBoxOptions>options);
        }
        this.render();
        this.renderStyle();
    }
    renderStyle() {
        const style = this.create("style");
        style.id = "ew-alert-style";
        style.textContent = `
            .ew-popbox {
                position: fixed;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 2000;
                transition: all 0.3s;
            }
            .ew-popbox.center, .ew-popbox.center .ew-popbox-footer {
                text-align: center;
            }
            /* 显示 */
            .ew-popbox.show {
              transform: scale(1);
              opacity: 1;
            }
            /* 隐藏 */
            .ew-popbox.hidden {
              transform: scale(0);
              opacity: 0;
            }
            /* 遮罩层样式 */
            .ew-popbox-mask {
              position: fixed;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.6);
              z-index: 2001;
              transition: all 0.6s;
            }
            .ew-popbox-title {
              padding: 8px 9px;
              font-weight: 500;
              font-size: 18px;
              position: relative;
            }
            .ew-popbox-title-close-btn {
              width: 20px;
              height: 20px;
              position: absolute;
              right: 8px;
              top: 8px;
              cursor: pointer;
              transition: all 0.1s;
            }
            .ew-popbox-title-close-btn:hover {
              opacity: 0.5;
            }
            .ew-popbox-wrapper {
              min-width: 300px;
              min-height: 80px;
              background-color: #ffffff;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              border-radius: 5px;
              z-index: 2002;
            }
            .ew-popbox-content {
                word-break: break-all;
                 padding: 20px;
                 font-size: 15px;
                 line-height: 25px;
             }
            .ew-popbox-footer {
              padding: 8px 10px;
              text-align: right;
            }
            .ew-popbox-footer-btn {
              outline: none;
              letter-spacing: 2px;
              display: inline-block;
              line-height: 1;
              white-space: nowrap;
              background: #fff;
              border: 1px solid #dcdfe6;
              color: #606266;
              -webkit-appearance: none;
              transition: 0.1s;
              font-weight: 500;
              -moz-user-select: none;
              -webkit-user-select: none;
              -ms-user-select: none;
              padding: 12px 20px;
              font-size: 14px;
              border-radius: 4px;
              cursor: pointer;
            }
            .ew-popbox-footer-btn:hover,
            .ew-popbox-footer-btn:active {
              color: #57a3f3;
              background-color: #fff;
              border-color: #57a3f3;
            }
            .ew-popbox-footer-sure-btn {
              color: #fff;
              background-color: #409eff;
              border-color: #409eff;
            }
            .ew-popbox-footer-btn.ew-popbox-footer-sure-btn:hover,
            .ew-popbox-footer-btn.ew-popbox-footer-sure-btn:active {
              background: #66b1ff;
              border-color: #66b1ff;
              color: #fff;
            }`;
        const head = <HTMLHeadElement>this.$('head');
        const existStyleElement = this.$('#ew-alert-style', head);
        if (!existStyleElement) {
            head?.appendChild(style)
        }
    }
    render() {
        const { title: defaultTitle, sureText: defaultSureText, showCancel: defaultShowCancel, showClose: defaultShowClose, content: defaultContent, container: defaultContainer, isClickModal: defaultIsClickModal, closeTime: defaultCloseTime, sure: defaultSure, cancel: defaultCancel, center: defaultCenter } = this.defaultConfig;
        const { title = defaultTitle, isClickModal = defaultIsClickModal, content = defaultContent, sureText = defaultSureText, cancelText = '取消', showCancel = defaultShowCancel, showClose = defaultShowClose, container = defaultContainer, closeTime = defaultCloseTime, sure = defaultSure, cancel = defaultCancel, center = defaultCenter } = this.config;
        const renderTemplate = <HTMLElement>this.createElement(`
            <div class="ew-popbox hidden${this.handleClassName('center', center)}">
                <div class="ew-popbox-mask"></div>
                <div class="ew-popbox-wrapper">
                    ${title ? `<div class="ew-popbox-title">
                            ${title}
                            ${showClose ? `<span class="ew-popbox-title-close-btn">${closeIcon()}</span>` : ''}
                        </div>` : ''
            }
                    <div class="ew-popbox-content">${content}</div>
                    <div class="ew-popbox-footer">
                        <button class="ew-popbox-footer-btn ew-popbox-footer-sure-btn" type="button">${sureText}</button>
                        ${showCancel ? `<button class="ew-popbox-footer-btn ew-popbox-footer-cancel-btn" type="button">${cancelText}</button>` : ''
            }
                    </div>
                </div>
            </div>
        `)
        const existPopboxElement = this.$('.ew-popbox', container);
        if (!existPopboxElement) {
            container?.appendChild(renderTemplate);
        }
        this.$el = this.$('.ew-popbox', container) as HTMLElement;
        //  判断如果展示标题和关闭按钮或者允许点击遮罩层关闭
        if ((title && showClose) || isClickModal) {
            // 为弹出框容器元素绑定事件
            this.on(this.$el!, "click", (e) => {
                // 获取当前点击的目标元素，断言是一个html元素
                const target = e.target as HTMLElement;
                // 获取当前元素的className
                const baseClassName = target?.className;
                // 获取父元素的className,如果点击的是svg元素
                const clickedSvgClassName = target?.parentElement?.className;
                // 获取父元素的父元素的className,如果点击的是path元素
                const clickedSvgPathClassName = target?.parentElement?.parentElement?.className;
                const className = this.isString(baseClassName) ? baseClassName : this.isString(clickedSvgClassName) ? clickedSvgClassName : this.isString(clickedSvgPathClassName) ? clickedSvgPathClassName : ''

                //  判断目标元素存在并且存在className属性
                if (
                    (className?.includes("ew-popbox-mask") && isClickModal) ||
                    className?.includes("ew-popbox-title-close-btn")
                ) {
                    // 调用关闭方法关闭抽屉，并回调一个方法将事件对象当作参数回调出去
                    this.close(closeTime);
                }
            });
        }

        this.on(<HTMLElement>this.$('.ew-popbox-footer-sure-btn', this.$el), 'click', e => {
            sure?.(this, e);
        });
        this.on(<HTMLElement>this.$('.ew-popbox-footer-cancel-btn', this.$el), 'click', e => {
            cancel?.(this, e);
        })
        this.open(0);
    }
    baseToggle(status: boolean, time?: number) {
        //  从配置对象中获取关闭时间，这也是我们设计的参数
        const { closeTime } = this.config;
        setTimeout(() => {
            this.addClass(this.$el!, status ? "show" : "hidden");
            this.removeClass(this.$el!, status ? "hidden" : "show");
        }, time || closeTime);
    };

    async close(time?: number) {
        const { afterClose } = this.config;
        this.baseToggle(false, time);
        afterClose?.(this);
    }
    open(time?: number) {
        this.baseToggle(true, time);
    }
}

export const ewConfirm = (options: PopBoxOptions | string) => new createPopBox(options);

export type ConfirmInstance = ReturnType<typeof ewConfirm>;