function ewPopBox(options) {
  this.closeIcon = `<svg t="1690189203554" class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2272" fill="currentColor"><path d="M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z" p-id="2273"></path></svg>`;
  this.$el = null;
  this.defaultCloseTime = 600;
  this.defaultConfig = {
    title: '提示',
    content: '默认内容',
    sure: () => this.close(this.defaultCloseTime),
    cancel: () => this.close(this.defaultCloseTime),
    showCancel: false,
    closeTime: this.defaultCloseTime,
    footerAlign: 'right',
    isClickModal: true,
    sureText: '确认',
    container: document.body,
    showClose: true
  };
  this.config = { ...this.defaultConfig };
  if (this.isString(options)) {
    this.config.content = options;
  } else if (typeof options === 'object' && options) {
    this.config = { ...this.config, ...options };
  }
  this.render();
  this.renderStyle();
}

ewPopBox.prototype = {
  constructor: ewPopBox.prototype.constructor,
  render() {
    const {
      title: defaultTitle,
      sureText: defaultSureText,
      showCancel: defaultShowCancel,
      showClose: defaultShowClose,
      content: defaultContent,
      container: defaultContainer,
      isClickModal: defaultIsClickModal,
      closeTime: defaultCloseTime,
      sure: defaultSure,
      cancel: defaultCancel
    } = this.defaultConfig;
    const {
      title = defaultTitle,
      afterClose,
      isClickModal = defaultIsClickModal,
      content = defaultContent,
      sureText = defaultSureText,
      cancelText = '取消',
      showCancel = defaultShowCancel,
      showClose = defaultShowClose,
      container = defaultContainer,
      closeTime = defaultCloseTime,
      sure = defaultSure,
      cancel = defaultCancel
    } = this.config;
    const renderTemplate = this.createElement(`
                  <div class="ew-popBox hidden">
                      <div class="ew-popBox-mask"></div>
                      <div class="ew-popBox-wrapper">
                          ${
                            title
                              ? `<div class="ew-popBox-title">
                                  ${title}
                                  ${
                                    showClose
                                      ? `<span class="ew-popBox-title-close-btn">${this.closeIcon}</span>`
                                      : ''
                                  }
                              </div>`
                              : ''
                          }
                          <div class="ew-popBox-content">${content}</div>
                          <div class="ew-popBox-footer">
                              <button class="ew-popBox-footer-btn ew-popBox-footer-sure-btn" type="button">${sureText}</button>
                              ${
                                showCancel
                                  ? `<button class="ew-popBox-footer-btn ew-popBox-footer-cancel-btn" type="button">${cancelText}</button>`
                                  : ''
                              }
                          </div>
                      </div>
                  </div>
              `);
    const existPopBoxElement = this.$('.ew-popBox', container);
    if (!existPopBoxElement) {
      container?.appendChild(renderTemplate);
    }
    this.$el = this.$('.ew-popBox', container);
    //  判断如果展示标题和关闭按钮或者允许点击遮罩层关闭
    if ((title && showClose) || isClickModal) {
      // 为弹出框容器元素绑定事件
      this.on(this.$el, 'click', e => {
        // 获取当前点击的目标元素，断言是一个html元素
        const target = e.target;
        // 获取当前元素的className
        const baseClassName = target?.className;
        // 获取父元素的className,如果点击的是svg元素
        const clickedSvgClassName = target?.parentElement?.className;
        // 获取父元素的父元素的className,如果点击的是path元素
        const clickedSvgPathClassName =
          target?.parentElement?.parentElement?.className;
        const className = this.isString(baseClassName)
          ? baseClassName
          : this.isString(clickedSvgClassName)
          ? clickedSvgClassName
          : this.isString(clickedSvgPathClassName)
          ? clickedSvgPathClassName
          : '';

        //  判断目标元素存在并且存在className属性
        if (
          (className?.includes('ew-popBox-mask') && isClickModal) ||
          className?.includes('ew-popBox-title-close-btn')
        ) {
          // 调用关闭方法关闭抽屉，并回调一个方法将事件对象当作参数回调出去
          this.close(closeTime);
          afterClose?.(this, e);
        }
      });
    }

    const sureBtn = this.$('.ew-popBox-footer-sure-btn', this.$el),
      cancelBtn = this.$('.ew-popBox-footer-cancel-btn', this.$el);
    if (sureBtn) {
      this.on(sureBtn, 'click', e => {
        sure?.(this, e);
      });
    }

    if (cancelBtn) {
      this.on(cancelBtn, 'click', e => {
        cancel?.(this, e);
      });
    }
    this.open(0);
  },
  isString(v) {
    return typeof v === 'string';
  },
  $(selector, el = document) {
    return el.querySelector(selector);
  },
  on(element, type, handler, useCapture = false) {
    if (element && type && handler) {
      element.addEventListener(type, handler, useCapture);
    }
  },
  create(tagName) {
    return document.createElement(tagName);
  },
  createElement(str) {
    const element = this.create('div');
    element.innerHTML = str;
    return element.firstElementChild;
  },
  addClass(el, className) {
    return el.classList.add(className);
  },
  removeClass(el, className) {
    return el.classList.remove(className);
  },
  renderStyle() {
    // 获取默认对齐方式
    const { footerAlign: defaultFooterAlign } = this.defaultConfig;
    // 定义对齐方式数组
    const alignArr = ['left', 'center', 'right'];
    // 从配置对象中获取对齐方式属性
    let { footerAlign } = this.config;
    // 规范化对齐方式
    footerAlign = alignArr.includes(footerAlign)
      ? footerAlign
      : defaultFooterAlign;
    const style = this.create('style');
    style.id = 'ew-popbox-style';
    style.textContent = `
                  .ew-popBox {
                      position: fixed;
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                      z-index: 2000;
                      transition: all 0.3s;
                  }
                  /* 显示 */
                  .ew-popBox.show {
                    transform: scale(1);
                    opacity: 1;
                  }
                  /* 隐藏 */
                  .ew-popBox.hidden {
                    transform: scale(0);
                    opacity: 0;
                  }
                  /* 遮罩层样式 */
                  .ew-popBox-mask {
                    position: fixed;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.6);
                    z-index: 2001;
                    transition: all 0.6s;
                  }
                  .ew-popBox-title {
                    padding: 8px 9px;
                    font-weight: 500;
                    font-size: 18px;
                    position: relative;
                  }
                  .ew-popBox-title-close-btn {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    cursor: pointer;
                    transition: all 0.1s;
                  }
                  .ew-popBox-title-close-btn:hover {
                    opacity: 0.5;
                  }
                  .ew-popBox-wrapper {
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
                  .ew-popBox-content {
                      word-break: break-all;
                       padding: 20px;
                       font-size: 15px;
                       line-height: 25px;
                   }
                  .ew-popBox-footer {
                    padding: 8px 10px;
                    text-align:${footerAlign};
                  }
                  .ew-popBox-footer-btn {
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
                  .ew-popBox-footer-btn:hover,
                  .ew-popBox-footer-btn:active {
                    color: #57a3f3;
                    background-color: #fff;
                    border-color: #57a3f3;
                  }
                  .ew-popBox-footer-sure-btn {
                    color: #fff;
                    background-color: #409eff;
                    border-color: #409eff;
                  }
                  .ew-popBox-footer-btn.ew-popBox-footer-sure-btn:hover,
                  .ew-popBox-footer-btn.ew-popBox-footer-sure-btn:active {
                    background: #66b1ff;
                    border-color: #66b1ff;
                    color: #fff;
                  }`;
    const head = this.$('head');
    const existStyleElement = this.$('#ew-popbox-style', head);
    if (!existStyleElement) {
      head?.appendChild(style);
    }
  },
  baseToggle(status, time) {
    return new Promise(resolve => {
      //  从配置对象中获取关闭时间，这也是我们设计的参数
      const { closeTime, container } = this.config;
      this.$el = this.$('.ew-popBox', container);
      setTimeout(() => {
        this.addClass(this.$el, status ? 'show' : 'hidden');
        this.removeClass(this.$el, status ? 'hidden' : 'show');
        resolve();
      }, time || closeTime);
    });
  },
  close(time) {
    this.baseToggle(false, time);
  },
  open(time) {
    this.baseToggle(true, time);
  }
};
window.ewConfirm = options => new ewPopBox(options);
