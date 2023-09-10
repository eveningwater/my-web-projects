var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function ewPopBox(options) {
    var _this = this;
    this.closeIcon = "<svg t=\"1690189203554\" class=\"close-icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2272\" fill=\"currentColor\"><path d=\"M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z\" p-id=\"2273\"></path></svg>";
    this.$el = null;
    this.defaultCloseTime = 600;
    this.defaultConfig = {
        title: '提示',
        content: '默认内容',
        sure: function () { return _this.close(_this.defaultCloseTime); },
        cancel: function () { return _this.close(_this.defaultCloseTime); },
        showCancel: false,
        closeTime: this.defaultCloseTime,
        footerAlign: 'right',
        isClickModal: true,
        sureText: '确认',
        container: document.body,
        showClose: true
    };
    this.config = {};
    if (this.isString(options)) {
        this.config.content = options;
    }
    else if (typeof options === 'object' && options) {
        this.config = __assign(__assign({}, this.config), options);
    }
    this.render();
    this.renderStyle();
}
ewPopBox.prototype = {
    constructor: ewPopBox.prototype.constructor,
    render: function () {
        var _this = this;
        var _a = this.defaultConfig, defaultTitle = _a.title, defaultSureText = _a.sureText, defaultShowCancel = _a.showCancel, defaultShowClose = _a.showClose, defaultContent = _a.content, defaultContainer = _a.container, defaultIsClickModal = _a.isClickModal, defaultCloseTime = _a.closeTime, defaultSure = _a.sure, defaultCancel = _a.cancel;
        var _b = this.config, _c = _b.title, title = _c === void 0 ? defaultTitle : _c, afterClose = _b.afterClose, _d = _b.isClickModal, isClickModal = _d === void 0 ? defaultIsClickModal : _d, _e = _b.content, content = _e === void 0 ? defaultContent : _e, _f = _b.sureText, sureText = _f === void 0 ? defaultSureText : _f, _g = _b.cancelText, cancelText = _g === void 0 ? '取消' : _g, _h = _b.showCancel, showCancel = _h === void 0 ? defaultShowCancel : _h, _j = _b.showClose, showClose = _j === void 0 ? defaultShowClose : _j, _k = _b.container, container = _k === void 0 ? defaultContainer : _k, _l = _b.closeTime, closeTime = _l === void 0 ? defaultCloseTime : _l, _m = _b.sure, sure = _m === void 0 ? defaultSure : _m, _o = _b.cancel, cancel = _o === void 0 ? defaultCancel : _o;
        var renderTemplate = this.createElement("\n                <div class=\"ew-popBox hidden\">\n                    <div class=\"ew-popBox-mask\"></div>\n                    <div class=\"ew-popBox-wrapper\">\n                        ".concat(title ? "<div class=\"ew-popBox-title\">\n                                ".concat(title, "\n                                ").concat(showClose ? "<span class=\"ew-popBox-title-close-btn\">".concat(this.closeIcon, "</span>") : '', "\n                            </div>") : '', "\n                        <div class=\"ew-popBox-content\">").concat(content, "</div>\n                        <div class=\"ew-popBox-footer\">\n                            <button class=\"ew-popBox-footer-btn ew-popBox-footer-sure-btn\" type=\"button\">").concat(sureText, "</button>\n                            ").concat(showCancel ? "<button class=\"ew-popBox-footer-btn ew-popBox-footer-cancel-btn\" type=\"button\">".concat(cancelText, "</button>") : '', "\n                        </div>\n                    </div>\n                </div>\n            "));
        var existPopBoxElement = this.$('.ew-popBox', container);
        if (!existPopBoxElement) {
            container === null || container === void 0 ? void 0 : container.appendChild(renderTemplate);
        }
        this.$el = this.$('.ew-popBox', container);
        //  判断如果展示标题和关闭按钮或者允许点击遮罩层关闭
        if ((title && showClose) || isClickModal) {
            // 为弹出框容器元素绑定事件
            this.on(this.$el, "click", function (e) { return __awaiter(_this, void 0, void 0, function () {
                var target, baseClassName, clickedSvgClassName, clickedSvgPathClassName, className;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            target = e.target;
                            baseClassName = target === null || target === void 0 ? void 0 : target.className;
                            clickedSvgClassName = (_a = target === null || target === void 0 ? void 0 : target.parentElement) === null || _a === void 0 ? void 0 : _a.className;
                            clickedSvgPathClassName = (_c = (_b = target === null || target === void 0 ? void 0 : target.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.className;
                            className = this.isString(baseClassName) ? baseClassName : this.isString(clickedSvgClassName) ? clickedSvgClassName : this.isString(clickedSvgPathClassName) ? clickedSvgPathClassName : '';
                            if (!(((className === null || className === void 0 ? void 0 : className.includes("ew-popBox-mask")) && isClickModal) ||
                                (className === null || className === void 0 ? void 0 : className.includes("ew-popBox-title-close-btn")))) return [3 /*break*/, 2];
                            // 调用关闭方法关闭抽屉，并回调一个方法将事件对象当作参数回调出去
                            return [4 /*yield*/, this.close(closeTime)];
                        case 1:
                            // 调用关闭方法关闭抽屉，并回调一个方法将事件对象当作参数回调出去
                            _d.sent();
                            afterClose === null || afterClose === void 0 ? void 0 : afterClose(this, e);
                            _d.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        }
        this.on(this.$('.ew-popBox-footer-sure-btn', this.$el), 'click', function (e) {
            sure === null || sure === void 0 ? void 0 : sure(_this, e);
        });
        this.on(this.$('.ew-popBox-footer-cancel-btn', this.$el), 'click', function (e) {
            cancel === null || cancel === void 0 ? void 0 : cancel(_this, e);
        });
        this.open(0);
    },
    isString: function (v) {
        return typeof v === 'string';
    },
    $: function (selector, el) {
        if (el === void 0) { el = document; }
        return el.querySelector(selector);
    },
    on: function (element, type, handler, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        if (element && type && handler) {
            element.addEventListener(type, handler, useCapture);
        }
    },
    create: function (tagName) {
        return document.createElement(tagName);
    },
    createElement: function (str) {
        var element = this.create('div');
        element.innerHTML = str;
        return element.firstElementChild;
    },
    addClass: function (el, className) {
        return el.classList.add(className);
    },
    removeClass: function (el, className) {
        return el.classList.remove(className);
    },
    renderStyle: function () {
        // 获取默认对齐方式
        var defaultFooterAlign = this.defaultConfig.footerAlign;
        // 定义对齐方式数组
        var alignArr = ["left", "center", "right"];
        // 从配置对象中获取对齐方式属性
        var footerAlign = this.config.footerAlign;
        // 规范化对齐方式
        footerAlign = alignArr.includes(footerAlign) ? footerAlign : defaultFooterAlign;
        var style = this.create("style");
        style.id = "ew-alert-style";
        style.textContent = "\n                .ew-popBox {\n                    position: fixed;\n                    left: 0;\n                    right: 0;\n                    top: 0;\n                    bottom: 0;\n                    z-index: 2000;\n                    transition: all 0.3s;\n                }\n                /* \u663E\u793A */\n                .ew-popBox.show {\n                  transform: scale(1);\n                  opacity: 1;\n                }\n                /* \u9690\u85CF */\n                .ew-popBox.hidden {\n                  transform: scale(0);\n                  opacity: 0;\n                }\n                /* \u906E\u7F69\u5C42\u6837\u5F0F */\n                .ew-popBox-mask {\n                  position: fixed;\n                  left: 0;\n                  right: 0;\n                  top: 0;\n                  bottom: 0;\n                  background-color: rgba(0, 0, 0, 0.6);\n                  z-index: 2001;\n                  transition: all 0.6s;\n                }\n                .ew-popBox-title {\n                  padding: 8px 9px;\n                  font-weight: 500;\n                  font-size: 18px;\n                  position: relative;\n                }\n                .ew-popBox-title-close-btn {\n                  width: 20px;\n                  height: 20px;\n                  position: absolute;\n                  right: 8px;\n                  top: 8px;\n                  cursor: pointer;\n                  transition: all 0.1s;\n                }\n                .ew-popBox-title-close-btn:hover {\n                  opacity: 0.5;\n                }\n                .ew-popBox-wrapper {\n                  min-width: 300px;\n                  min-height: 80px;\n                  background-color: #ffffff;\n                  position: absolute;\n                  left: 50%;\n                  top: 50%;\n                  transform: translate(-50%, -50%);\n                  border-radius: 5px;\n                  z-index: 2002;\n                }\n                .ew-popBox-content {\n                    word-break: break-all;\n                     padding: 20px;\n                     font-size: 15px;\n                     line-height: 25px;\n                 }\n                .ew-popBox-footer {\n                  padding: 8px 10px;\n                  text-align:".concat(footerAlign, ";\n                }\n                .ew-popBox-footer-btn {\n                  outline: none;\n                  letter-spacing: 2px;\n                  display: inline-block;\n                  line-height: 1;\n                  white-space: nowrap;\n                  background: #fff;\n                  border: 1px solid #dcdfe6;\n                  color: #606266;\n                  -webkit-appearance: none;\n                  transition: 0.1s;\n                  font-weight: 500;\n                  -moz-user-select: none;\n                  -webkit-user-select: none;\n                  -ms-user-select: none;\n                  padding: 12px 20px;\n                  font-size: 14px;\n                  border-radius: 4px;\n                  cursor: pointer;\n                }\n                .ew-popBox-footer-btn:hover,\n                .ew-popBox-footer-btn:active {\n                  color: #57a3f3;\n                  background-color: #fff;\n                  border-color: #57a3f3;\n                }\n                .ew-popBox-footer-sure-btn {\n                  color: #fff;\n                  background-color: #409eff;\n                  border-color: #409eff;\n                }\n                .ew-popBox-footer-btn.ew-popBox-footer-sure-btn:hover,\n                .ew-popBox-footer-btn.ew-popBox-footer-sure-btn:active {\n                  background: #66b1ff;\n                  border-color: #66b1ff;\n                  color: #fff;\n                }");
        var head = this.$('head');
        var existStyleElement = this.$('#ew-alert-style', head);
        if (!existStyleElement) {
            head === null || head === void 0 ? void 0 : head.appendChild(style);
        }
    },
    baseToggle: function (status, time) {
        var _this = this;
        return new Promise(function (resolve) {
            //  从配置对象中获取关闭时间，这也是我们设计的参数
            var closeTime = _this.config.closeTime;
            setTimeout(function () {
                _this.addClass(_this.$el, status ? "show" : "hidden");
                _this.removeClass(_this.$el, status ? "hidden" : "show");
                resolve();
            }, time || closeTime);
        });
    },
    close: function (time) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.baseToggle(false, time)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    open: function (time) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.baseToggle(true, time)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
};
window.ewConfirm = function (options) { return new ewPopBox(options); };
