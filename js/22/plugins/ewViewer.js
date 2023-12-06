"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var addIcon = function (className) { return "<svg t=\"1697700092492\" class=\"add-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"900\" width=\"78\" height=\"78\"><path d=\"M560.064 149.952a48 48 0 0 0-96 0V464H150.016a48 48 0 0 0 0 96H464v313.984a48 48 0 0 0 96 0V560h314.048a48 48 0 0 0 0-96H560V149.952z\" p-id=\"901\" fill=\"#ffffff\"></path></svg>"); };
var reduceIcon = function (className) { return "<svg t=\"1697700199963\" class=\"reduce-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1256\" width=\"78\" height=\"78\"><path d=\"M922.048 512a48 48 0 0 0-48-48H149.952a48 48 0 1 0 0 96h724.096a48 48 0 0 0 48-48z\" p-id=\"1257\" fill=\"#ffffff\"></path></svg>"); };
var closeIcon = function (className) { return "<svg t=\"1690189203554\" class=\"close-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2272\" fill=\"currentColor\"><path d=\"M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z\" p-id=\"2273\"></path></svg>"); };
var oneToOneIcon = function (className) { return "<svg t=\"1697700658302\" class=\"one-to-one-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"7084\" width=\"78\" height=\"78\"><path d=\"M904.405333 149.333333v725.333334h-85.333333V250.346667l-66.24 33.152L714.666667 207.146667 830.336 149.333333h74.069333z m-608 0v725.333334h-85.333333V250.346667L144.853333 283.498667 106.666667 207.146667 222.336 149.333333h74.069333z m288 448v106.666667h-106.666666v-106.666667h106.666666z m0-277.333333v106.666667h-106.666666v-106.666667h106.666666z\" fill=\"#ffffff\" p-id=\"7085\"></path></svg>"); };
var flipRightIcon = function (className) { return "<svg t=\"1697712563708\" class=\"arrow-up-down-icon".concat(className, "\" viewBox=\"0 0 1088 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"20575\" width=\"78\" height=\"78\"><path d=\"M513.344 253.504V768H323.968l244.416 255.424L825.344 768H640V253.504h185.344L566.848 6.72 319.424 253.504h193.92z\" fill=\"#ffffff\" p-id=\"20576\"></path></svg>"); };
var flipLeftIcon = function (className) { return "<svg t=\"1697712627137\" class=\"arrow-left-right-icon".concat(className, "\" viewBox=\"0 0 1088 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"21609\" width=\"78\" height=\"78\"><path d=\"M320 576h516.224v183.296l246.4-244.48-246.4-256.832L832 448H320l-7.296-190.08L65.92 516.48l246.784 247.424L320 576z\" fill=\"#ffffff\" p-id=\"21610\"></path></svg>"); };
var rotateLeftIcon = function (className) { return "<svg t=\"1697712701928\" class=\"flip-left-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"25120\" width=\"78\" height=\"78\"><path d=\"M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32z m-44 402H188V494h440v326z\" p-id=\"25121\" fill=\"#ffffff\"></path><path d=\"M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-0.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7 0.4 12.6-6.1v-63.9c12.9 0.1 25.9 0.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8 11 40.7 14 82.7 8.9 124.8-0.7 5.4-1.4 10.8-2.4 16.1h74.9c14.8-103.6-11.3-213-81-302.3z\" p-id=\"25122\" fill=\"#ffffff\"></path></svg>"); };
var rotateRightIcon = function (className) { return "<svg t=\"1697712744122\" class=\"flip-right-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"25323\" width=\"78\" height=\"78\"><path d=\"M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-0.4-12.6 6.1l-0.2 64c-118.6 0.5-235.8 53.4-314.6 154.2-69.6 89.2-95.7 198.6-81.1 302.4h74.9c-0.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z\" p-id=\"25324\" fill=\"#ffffff\"></path><path d=\"M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32z m-44 402H396V494h440v326z\" p-id=\"25325\" fill=\"#ffffff\"></path></svg>"); };
var arrowLeftIcon = function (className) { return "<svg t=\"1697787947316\" class=\"arrow-left-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"900\" width=\"78\" height=\"78\"><path d=\"M290.56 550.464a54.4 54.4 0 0 1 0-76.928l379.52-379.52a48 48 0 1 1 67.84 67.904L387.84 512l350.08 350.08a48 48 0 1 1-67.84 67.84L290.56 550.464z\" p-id=\"901\" fill=\"#ffffff\"></path></svg>"); };
var arrowRightIcon = function (className) { return "<svg t=\"1697772815002\" class=\"arrow-right-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"900\" width=\"78\" height=\"78\"><path d=\"M733.44 550.464a54.4 54.4 0 0 0 0-76.928l-379.52-379.52A48 48 0 0 0 286.08 161.92L636.16 512l-350.08 350.08a48 48 0 1 0 67.84 67.84l379.52-379.456z\" p-id=\"901\" fill=\"#ffffff\"></path></svg>"); };
var resetIcon = function (className) { return "<svg t=\"1697773227169\" class=\"reset-icon".concat(className, "\" viewBox=\"0 0 1278 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2019\" width=\"78\" height=\"78\"><path d=\"M1272.447024 472.907505l-150.052574 149.245613a32.021415 32.021415 0 0 1-44.681788 0L928.777033 472.906505c-17.717123-20.478986-5.895708-27.925618 6.45368-39.716035h136.525243A441.782135 441.782135 0 0 0 253.257466 304.732828L178.791151 275.257287a521.555187 521.555187 0 0 1 973.731808 157.934183h113.56338a26.653681 26.653681 0 0 1 6.360685 39.716035zM202.713967 440.946087l150.022575 149.556598a26.622682 26.622682 0 0 1-6.45468 39.717034H216.366292a442.247112 442.247112 0 0 0 789.701915 120.700026l75.213278 29.787526A521.555187 521.555187 0 0 1 134.513343 630.219719h-118.994111c-12.411386-11.791416-24.170804-19.238048-6.453681-39.717034l148.935629-149.556598a32.641385 32.641385 0 0 1 44.712787 0z\" fill=\"#ffffff\" p-id=\"2020\"></path></svg>"); };
var fullscreenIcon = function (className) { return "<svg t=\"1697787617768\" class=\"fullscreen-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3046\" width=\"78\" height=\"78\"><path d=\"M213.333333 213.333333h213.333334V128H170.666667a42.666667 42.666667 0 0 0-42.666667 42.666667v256h85.333333V213.333333zM170.666667 896h256v-85.333333H213.333333v-213.333334H128v256a42.666667 42.666667 0 0 0 42.666667 42.666667z m725.333333-42.666667v-256h-85.333333v213.333334h-213.333334v85.333333h256a42.666667 42.666667 0 0 0 42.666667-42.666667zM597.333333 213.333333h213.333334v213.333334h85.333333V170.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-256v85.333333z\" fill=\"#ffffff\" p-id=\"3047\"></path></svg>"); };
var playIcon = function (className) { return "<svg t=\"1697800175999\" class=\"play-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"9820\" width=\"78\" height=\"78\"><path d=\"M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z\" p-id=\"9821\" fill=\"#ffffff\"></path></svg>"); };
var pauseIcon = function (className) { return "<svg t=\"1697799289205\" class=\"pause-icon".concat(className, "\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"8597\" width=\"78\" height=\"78\"><path d=\"M209.645253 863.934444l201.049992 0 0-703.866842L209.645253 160.067602 209.645253 863.934444zM611.804588 863.934444l201.113437 0 0-703.866842L611.804588 160.067602 611.804588 863.934444z\" p-id=\"8598\" fill=\"#ffffff\"></path></svg>"); };
var ewViewerUtil = /** @class */ (function () {
    function ewViewerUtil() {
    }
    ewViewerUtil.prototype.checkContainer = function (el) {
        if (this.isDom(el)) {
            return el;
        }
        else if (this.isString(el)) {
            var ele = this.$(el);
            if (ele) {
                return ele;
            }
        }
        return document.body;
    };
    ewViewerUtil.prototype.isString = function (value) {
        return typeof value === 'string';
    };
    ewViewerUtil.prototype.isNumber = function (value) {
        return typeof value === 'number' && !Number.isNaN(value);
    };
    ewViewerUtil.prototype.isObject = function (v) {
        return v && typeof v === 'object';
    };
    ewViewerUtil.prototype.isBoolean = function (v) { return typeof v === 'boolean'; };
    ewViewerUtil.prototype.isDom = function (el) {
        return this.isObject(HTMLElement)
            ? el instanceof HTMLElement
            : (el &&
                this.isObject(el) &&
                el.nodeType === 1 &&
                this.isString(el.nodeName)) ||
            el instanceof HTMLCollection ||
            el instanceof NodeList;
    };
    ewViewerUtil.prototype.handleTemplate = function (isRender, template) {
        return this.isBoolean(isRender) && isRender && this.isString(template) && template ? template : '';
    };
    ewViewerUtil.prototype.on = function (element, type, handler, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        if (element && type && handler) {
            element.addEventListener(type, handler, useCapture);
        }
    };
    ewViewerUtil.prototype.off = function (element, type, handler, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        if (element && type && handler) {
            element.removeEventListener(type, handler, useCapture);
        }
    };
    ewViewerUtil.prototype.handleClassName = function (className, status) {
        var condition = this.isBoolean(status) ? status : this.isString(className) && className;
        return condition ? " ".concat(className) : '';
    };
    ewViewerUtil.prototype.addClass = function (el, className) {
        return el.classList.add(className);
    };
    ewViewerUtil.prototype.removeClass = function (el, className) {
        return el.classList.remove(className);
    };
    ewViewerUtil.prototype.warn = function (text) {
        return console.warn("".concat(text));
    };
    ewViewerUtil.prototype.assign = function (target) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (Object.assign) {
            return Object.assign.apply(Object, __spreadArray([target], args, false));
        }
        else {
            if (target === null) {
                return;
            }
            var _1 = Object(target);
            args.forEach(function (item) {
                if (_this.isObject(item)) {
                    for (var key in item) {
                        if (Object.prototype.hasOwnProperty.call(item, key)) {
                            _1[key] = item[key];
                        }
                    }
                }
            });
            return _1;
        }
    };
    ewViewerUtil.prototype.create = function (tagName) {
        return document.createElement(tagName);
    };
    ewViewerUtil.prototype.createElement = function (str) {
        var element = this.create('div');
        element.innerHTML = str;
        return element.firstElementChild;
    };
    ewViewerUtil.prototype.$ = function (selector, el) {
        if (el === void 0) { el = document; }
        return el.querySelector(selector);
    };
    ewViewerUtil.prototype.$$ = function (selector, el) {
        if (el === void 0) { el = document; }
        return el.querySelectorAll(selector);
    };
    return ewViewerUtil;
}());
var ewViewer = /** @class */ (function (_super) {
    __extends(ewViewer, _super);
    function ewViewer(options) {
        var _this = _super.call(this) || this;
        _this.$dom = {};
        _this.imageStyle = [];
        _this.defaultConfig = {
            container: document.body,
            isClickOutside: true,
            previewMode: 'bg',
            showCloseBtn: true,
            showCloseBtnIcon: closeIcon(_this.handleClassName('ew-viewer-close-icon')),
            closeTime: 200,
            zoomOnWheeling: true,
            autoSize: true,
            minImageRatio: 0.1,
            maxImageRatio: 1,
            showToolBar: true,
            zoomInIcon: addIcon(_this.handleClassName('ew-viewer-zoom-in-icon')),
            zoomOutIcon: reduceIcon(_this.handleClassName('ew-viewer-zoom-out-icon')),
            oneToOneIcon: oneToOneIcon(_this.handleClassName('ew-viewer-one-to-one-icon')),
            currentImageIndex: 0,
            autoOpen: false,
            flipLeftIcon: flipLeftIcon(_this.handleClassName('ew-viewer-flip-left-icon')),
            flipRightIcon: flipRightIcon(_this.handleClassName('ew-viewer-flip-right-icon')),
            rotateLeftIcon: rotateLeftIcon(_this.handleClassName('ew-viewer-rotate-left-icon')),
            rotateRightIcon: rotateRightIcon(_this.handleClassName('ew-viewer-rotate-right-icon')),
            resetIcon: resetIcon(_this.handleClassName('ew-viewer-reset-icon')),
            prevIcon: arrowLeftIcon(_this.handleClassName('ew-viewer-prev-icon')),
            nextIcon: arrowRightIcon(_this.handleClassName('ew-viewer-next-icon')),
            fullscreenIcon: fullscreenIcon(_this.handleClassName('ew-viewer-fullscreen-icon')),
            playIcon: playIcon(_this.handleClassName('ew-viewer-play-icon')),
            pauseIcon: pauseIcon(_this.handleClassName('ew-viewer-pause-icon')),
            minRotate: -Infinity,
            maxRotate: Infinity,
            loop: true
        };
        _this.config = Object.create(null);
        _this.config = _this.assign({}, _this.config, _this.defaultConfig);
        _this.imageDataList = [];
        _this.currentImageIndex = _this.config.currentImageIndex || 0;
        _this.wheeling = false;
        _this.isClickZoomIn = false;
        _this.isClickZoomOut = false;
        _this.isClickOneToOne = false;
        _this.fullScreenStatus = false;
        _this.isPlaying = false;
        _this.isPrev = false;
        _this.isNext = false;
        _this.timeout = null;
        _this.options = options;
        _this.computedImageRatio = Number(_this.config.imageRatio) || 0.9;
        _this.renderStyle();
        _this.init(options).then(function (res) {
            if (res) {
                _this.render();
            }
        });
        return _this;
    }
    ewViewer.prototype.update = function () {
        var _this = this;
        if (!this.options) {
            return;
        }
        this.init(this.options).then(function (res) {
            if (res) {
                _this.render();
            }
        });
    };
    ewViewer.prototype.validateImgParam = function (options) {
        var _this = this;
        return new Promise(function (resolve) {
            return __awaiter(_this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isString(options)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.validImage(options)];
                        case 1:
                            if (_a.sent()) {
                                resolve(options);
                            }
                            return [3 /*break*/, 5];
                        case 2:
                            if (!this.isDom(options)) return [3 /*break*/, 4];
                            url = options === null || options === void 0 ? void 0 : options.getAttribute('src');
                            return [4 /*yield*/, this.validImage(url)];
                        case 3:
                            if (_a.sent()) {
                                resolve(url);
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            this.warn("[ewViewer warning]: The url or the img element src is not a valid img url!");
                            resolve('');
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        });
    };
    ewViewer.prototype.rangeRation = function (ratio) {
        if (!this.isNumber(ratio)) {
            return false;
        }
        if (ratio < 0) {
            return false;
        }
        if (ratio > 1) {
            return false;
        }
        return true;
    };
    ewViewer.prototype.init = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var url, _a, img, rest, _b, minImageRatio, maxImageRatio, currentImageIndex, url;
                        var _this = this;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!(this.isDom(options) || this.isString(options))) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.validateImgParam(options)];
                                case 1:
                                    url = _c.sent();
                                    if (!url) {
                                        resolve(false);
                                    }
                                    this.imageDataList = [url];
                                    resolve(true);
                                    return [3 /*break*/, 8];
                                case 2:
                                    if (!Array.isArray(options)) return [3 /*break*/, 3];
                                    Promise.all(options.map(function (item) {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.validateImgParam(item)];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        });
                                    })).then(function (v) {
                                        _this.imageDataList = __spreadArray([], v, true).filter(Boolean);
                                        if (_this.imageDataList.length === 0) {
                                            resolve(false);
                                        }
                                        resolve(true);
                                    });
                                    return [3 /*break*/, 8];
                                case 3:
                                    if (!this.isObject(options)) return [3 /*break*/, 7];
                                    _a = options, img = _a.img, rest = __rest(_a, ["img"]);
                                    this.config = this.assign({}, this.config, rest);
                                    _b = this.config, minImageRatio = _b.minImageRatio, maxImageRatio = _b.maxImageRatio;
                                    if (!this.rangeRation(minImageRatio)) {
                                        this.config.minImageRatio = 0.1;
                                        this.warn("[ewViewer warning]: The minImageRatio should in bewteen 0 and 1!");
                                    }
                                    if (!this.rangeRation(maxImageRatio)) {
                                        this.config.maxImageRatio = 1;
                                        this.warn("[ewViewer warning]: The maxImageRatio should in bewteen 0 and 1!");
                                    }
                                    if (minImageRatio > maxImageRatio) {
                                        this.warn("[ewViewer warning]: The minImageRatio should min the maxImageRatio!");
                                    }
                                    currentImageIndex = this.config.currentImageIndex;
                                    if (this.currentImageIndex !== currentImageIndex &&
                                        this.isNumber(currentImageIndex) &&
                                        currentImageIndex >= 0 &&
                                        currentImageIndex <= this.imageDataList.length - 1) {
                                        this.currentImageIndex = currentImageIndex;
                                    }
                                    if (!Array.isArray(img)) return [3 /*break*/, 4];
                                    Promise.all(img.map(function (item) {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.validateImgParam(item)];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        });
                                    })).then(function (v) {
                                        _this.imageDataList = __spreadArray([], v, true).filter(Boolean);
                                        if (_this.imageDataList.length === 0) {
                                            resolve(false);
                                        }
                                        resolve(true);
                                    });
                                    return [3 /*break*/, 6];
                                case 4: return [4 /*yield*/, this.validateImgParam(img)];
                                case 5:
                                    url = _c.sent();
                                    if (!url) {
                                        resolve(false);
                                    }
                                    this.imageDataList = [url];
                                    resolve(true);
                                    _c.label = 6;
                                case 6: return [3 /*break*/, 8];
                                case 7:
                                    this.warn("[ewViewer warning]: The options is not a valid params!");
                                    resolve(false);
                                    _c.label = 8;
                                case 8: return [2 /*return*/];
                            }
                        });
                    });
                })];
            });
        });
    };
    ewViewer.prototype.validImage = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var isValidImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidImage(src)];
                    case 1:
                        isValidImage = _a.sent();
                        if (!isValidImage) {
                            this.warn("[ewViewer warning]: The options is not a valid img url string!");
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ewViewer.prototype.isValidImage = function (src) {
        return new Promise(function (resolve) {
            var img = new Image();
            img.src = src;
            img.onload = function () { return resolve(true); };
            img.onerror = function () { return resolve(false); };
        });
    };
    ewViewer.prototype.generateImageStyle = function (imageList) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                imageList.forEach(function (item, index) {
                    var imageElement = _this.create('img');
                    imageElement.src = item;
                    document.body.appendChild(imageElement);
                    var naturalWidth = imageElement.naturalWidth, naturalHeight = imageElement.naturalHeight;
                    _this.imageStyle.push({
                        id: index,
                        naturalWidth: naturalWidth,
                        naturalHeight: naturalHeight,
                        scaleWidth: 0,
                        scaleHeight: 0,
                        scaleX: 0,
                        scaleY: 0,
                        rotate: 0
                    });
                    document.body.removeChild(imageElement);
                });
                return [2 /*return*/];
            });
        });
    };
    ewViewer.prototype.viewerStyle = function () {
        var style = "\n        .ew-viewer {\n            position: fixed;\n            left: 0;\n            right: 0;\n            top: 0;\n            bottom: 0;\n            z-index: 2000;\n            transition: all 0.3s;\n        }\n        /* \u663E\u793A */\n        .ew-viewer.show {\n          transform: scale(1);\n          opacity: 1;\n        }\n        /* \u9690\u85CF */\n        .ew-viewer.hidden {\n          transform: scale(0);\n          opacity: 0;\n        }\n        /* \u906E\u7F69\u5C42\u6837\u5F0F */\n        .ew-viewer-mask {\n          position: fixed;\n          left: 0;\n          right: 0;\n          top: 0;\n          bottom: 0;\n          background-color: rgba(0, 0, 0, 0.5);\n          transition: all 0.6s;\n        }\n        .ew-viewer-img-box {\n            position: absolute;\n            left: 0;\n            right: 0;\n            top: 0;\n            bottom: 0;\n            margin: auto;\n            opacity: 0;\n            visibility: hidden;\n            transition: all 0.3s;\n            will-change: width,height,opacity;\n        }\n        .ew-viewer-img-box.show {\n            visibility: visible;\n            opacity: 1;\n        }\n        .ew-viewer-img {\n            width: 100%;\n            height: 100%;\n        }\n        .ew-viewer-bg-img {\n            background-repeat: no-repeat;\n            background-position: center;\n            background-size: contain;\n            width: 100%;\n            height: 100%;\n            will-change: background-size;\n        }\n        .ew-viewer-close-btn {\n            width: 80px;\n            height: 80px;\n            position: absolute;\n            right: -40px;\n            top: -40px;\n            background: rgba(0,0,0,.5);\n            border-radius: 50%;\n            cursor: pointer;\n            color: #fff;\n            transition: all 0.1s;\n          }\n          .ew-viewer-close-btn > svg:hover {\n            opacity: 0.5;\n          }\n          .ew-viewer-close-btn > svg {\n             width: 20px;\n             height: 20px;\n             position: absolute;\n             left: 15px;\n             bottom: 15px;\n          }\n          .ew-viewer-tooltip-ratio {\n             border-radius: 10px;\n             background: rgba(0,0,0,.5);\n             color: #fff;\n             position: absolute;\n             left: 0;\n             right: 0;\n             top: 0;\n             bottom: 0;\n             margin: auto;\n             width: max-content;\n             text-align: center;\n             height: max-content;\n             line-height: max-content;\n             padding: 6px 10px;\n             transition: all 0.3s;\n          }\n          .ew-viewer-tooltip-ratio.show {\n            visibility: visible;\n            opacity: 1;\n          }\n          .ew-viewer-tooltip-ratio.hidden {\n            visibility: hidden;\n            opacity: 0;\n          }\n          .ew-viewer-content {\n            height: calc(100% - 110px);\n            position: relative;\n          }\n          .ew-viewer-footer {\n             position: absolute;\n             bottom: 0;\n             width: 100%;\n             text-align: center;\n          }\n          .ew-viewer-footer svg {\n            width: 12px;\n            height: 12px;\n          }\n          .ew-viewer-title {\n            color: #fff;\n            margin-bottom: 6px;\n          }\n          .ew-viewer-button {\n             display: flex;\n             justify-content: center;\n             align-items: center;\n             margin-bottom: 8px;\n          }\n          .ew-viewer-button > div {\n             border-radius: 50%;\n             background: rgba(0,0,0,.5);\n             width: 24px;\n             height: 24px;\n             cursor: pointer;\n             box-sizing: border-box;\n             line-height: 24px;\n          }\n          .ew-viewer-button > div + div {\n             margin-left: 4px;\n          }\n          .ew-viewer-button > div:hover {\n             opacity: .6;\n          }\n          .ew-viewer-thumb {\n            max-width: 100%;\n            height: 50px;\n            white-space: nowrap;\n            background-color: rgba(0,0,0,.5);\n            overflow-x: auto;\n            overflow-y: hidden;\n            padding: 0 2em;\n          }\n          .ew-viewer-thumb-img {\n             width: 50px;\n             height: 50px;\n             cursor: pointer;\n             opacity: .5;\n             object-fit: contain;\n             object-position: center;\n             background-color: rgba(255,255,255,.5);\n          }\n          .ew-viewer-thumb-img.active {\n            opacity: 1;\n          }\n          .ew-viewer-thumb-img:hover{\n             opacity: .5;\n          }\n          .ew-viewer-thumb-img + .ew-viewer-thumb-img {\n            margin-left: 4px;\n          }\n        ";
        return style;
    };
    ewViewer.prototype.renderStyle = function () {
        var style = this.create("style");
        style.id = "ew-preview-img-style";
        style.textContent = this.viewerStyle();
        var head = this.$('head');
        var existStyleElement = this.$('#ew-preview-img-style', head);
        if (!existStyleElement) {
            head === null || head === void 0 ? void 0 : head.appendChild(style);
        }
    };
    ewViewer.prototype.scaleImageCallback = function () {
        var _a = this.$dom, $viewerRatioTooltipElement = _a.$viewerRatioTooltipElement, $viewerContentElement = _a.$viewerContentElement;
        var _b = this.imageStyle[this.currentImageIndex], naturalWidth = _b.naturalWidth, naturalHeight = _b.naturalHeight;
        if (!$viewerContentElement) {
            return;
        }
        var width = $viewerContentElement.offsetWidth, height = $viewerContentElement.offsetHeight;
        var imgAspectRatio = naturalWidth / naturalHeight;
        var resizeWidth = width, resizeHeight = height;
        if (height * imgAspectRatio > width) {
            resizeHeight = width / imgAspectRatio;
        }
        else {
            resizeWidth = height * imgAspectRatio;
        }
        this.imageStyle[this.currentImageIndex].scaleWidth = Math.min(resizeWidth * this.computedImageRatio, naturalWidth);
        this.imageStyle[this.currentImageIndex].scaleHeight = Math.min(resizeHeight * this.computedImageRatio, naturalHeight);
        if ($viewerRatioTooltipElement) {
            $viewerRatioTooltipElement.textContent = "".concat(parseInt("".concat(this.computedImageRatio * 100)), "%");
        }
    };
    ewViewer.prototype.setImageStyle = function (status) {
        if (status === void 0) { status = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, scaleWidth, scaleHeight, scaleX, scaleY, rotate, naturalWidth, naturalHeight, currentImage, _b, $viewerContentElement, $viewerTitleElement, children;
            var _this = this;
            return __generator(this, function (_c) {
                if (status) {
                    this.scaleImageCallback();
                }
                _a = this.imageStyle[this.currentImageIndex], scaleWidth = _a.scaleWidth, scaleHeight = _a.scaleHeight, scaleX = _a.scaleX, scaleY = _a.scaleY, rotate = _a.rotate, naturalWidth = _a.naturalWidth, naturalHeight = _a.naturalHeight;
                currentImage = this.imageDataList[this.currentImageIndex];
                _b = this.$dom, $viewerContentElement = _b.$viewerContentElement, $viewerTitleElement = _b.$viewerTitleElement;
                if ($viewerContentElement) {
                    children = __spreadArray([], $viewerContentElement.children, true);
                    children.forEach(function (child) {
                        var index = Number(child.getAttribute('data-index'));
                        var firstChild = child.firstElementChild;
                        if (index === _this.currentImageIndex) {
                            child.style.width = scaleWidth + 'px';
                            child.style.height = scaleHeight + 'px';
                            if (child.tagName.toLowerCase() !== 'img') {
                                firstChild.style.backgroundSize = "".concat(scaleWidth, "px ").concat(scaleHeight, "px");
                            }
                            child.style.removeProperty('transform');
                            if (scaleX !== 0 || scaleY !== 0 || rotate !== 0) {
                                child.style.transform = "".concat(rotate !== 0 ? "rotate(".concat(rotate, "deg)") : '', " ").concat(scaleX !== 0 ? "scaleX(".concat(scaleX, ")") : '', " ").concat(scaleY !== 0 ? "scaleY(".concat(scaleY, ")") : '');
                            }
                            setTimeout(function () {
                                _this.addClass(child, 'show');
                            }, 0);
                        }
                        else {
                            child.style.removeProperty('width');
                            child.style.removeProperty('height');
                            if (child.tagName.toLowerCase() !== 'img') {
                                firstChild.style.removeProperty('background-size');
                            }
                            child.style.removeProperty('transform');
                            setTimeout(function () {
                                _this.removeClass(child, 'show');
                            }, 0);
                        }
                    });
                }
                if ($viewerTitleElement) {
                    $viewerTitleElement.innerHTML = "".concat(this.getImageNameFromURL(currentImage), "(").concat(naturalWidth, " x ").concat(naturalHeight, ")");
                }
                return [2 /*return*/];
            });
        });
    };
    ewViewer.prototype.getImageNameFromURL = function (url) {
        return this.isString(url) ? decodeURIComponent(url.replace(/^.*\//, '').replace(/[?&#].*$/, '')) : '';
    };
    ewViewer.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, container, autoOpen, previewMode, showCloseBtn, showCloseBtnIcon, showToolBar, zoomInIcon, zoomOutIcon, oneToOneIcon, flipLeftIcon, flipRightIcon, rotateLeftIcon, rotateRightIcon, resetIcon, prevIcon, nextIcon, fullscreenIcon, playIcon, pauseIcon, _b, naturalWidth, naturalHeight, currentImage, zoomButtonTemplate, imgListTemplate, imgThumbListTemplate, domElement;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.config, container = _a.container, autoOpen = _a.autoOpen, previewMode = _a.previewMode, showCloseBtn = _a.showCloseBtn, showCloseBtnIcon = _a.showCloseBtnIcon, showToolBar = _a.showToolBar, zoomInIcon = _a.zoomInIcon, zoomOutIcon = _a.zoomOutIcon, oneToOneIcon = _a.oneToOneIcon, flipLeftIcon = _a.flipLeftIcon, flipRightIcon = _a.flipRightIcon, rotateLeftIcon = _a.rotateLeftIcon, rotateRightIcon = _a.rotateRightIcon, resetIcon = _a.resetIcon, prevIcon = _a.prevIcon, nextIcon = _a.nextIcon, fullscreenIcon = _a.fullscreenIcon, playIcon = _a.playIcon, pauseIcon = _a.pauseIcon;
                        this.$dom.rootElement = this.checkContainer(container);
                        return [4 /*yield*/, this.generateImageStyle(this.imageDataList)];
                    case 1:
                        _c.sent();
                        _b = this.imageStyle[this.currentImageIndex], naturalWidth = _b.naturalWidth, naturalHeight = _b.naturalHeight;
                        currentImage = this.imageDataList[this.currentImageIndex];
                        zoomButtonTemplate = "\n            <div class=\"ew-viewer-zoom-in\">".concat(zoomInIcon, "</div>\n            <div class=\"ew-viewer-zoom-out\">").concat(zoomOutIcon, "</div>\n            <div class=\"ew-viewer-one-to-one\">").concat(oneToOneIcon, "</div>\n            <div class=\"ew-viewer-reset\">").concat(resetIcon, "</div>\n            <div class=\"ew-viewer-fullscreen\">").concat(fullscreenIcon, "</div>\n            ").concat(this.handleTemplate(this.imageDataList.length > 1, "<div class=\"ew-viewer-prev\">".concat(prevIcon, "</div>")), "\n            ").concat(this.handleTemplate(this.imageDataList.length > 1, "<div class=\"ew-viewer-play\">".concat(this.isPlaying ? pauseIcon : playIcon, "</div>")), "\n            ").concat(this.handleTemplate(this.imageDataList.length > 1, "<div class=\"ew-viewer-next\">".concat(nextIcon, "</div>")), "\n            <div class=\"ew-viewer-rotate-left\">").concat(rotateLeftIcon, "</div>\n            <div class=\"ew-viewer-rotate-right\">").concat(rotateRightIcon, "</div>\n            <div class=\"ew-viewer-flip-horizontal\">").concat(flipLeftIcon, "</div>\n            <div class=\"ew-viewer-flip-vertical\">").concat(flipRightIcon, "</div>\n        ");
                        imgListTemplate = this.imageDataList.map(function (item, index) {
                            var imgBgStyle = "background-image:url(".concat(item, ");");
                            var template = "<div class=\"ew-viewer-img-box".concat(_this.handleClassName(index === _this.currentImageIndex ? 'show' : ''), "\" data-index=\"").concat(index, "\">\n                    ").concat(previewMode === 'bg' ?
                                "<div class=\"ew-viewer-bg-img\" style=\"".concat(imgBgStyle, "\"></div>")
                                : "<img src=\"".concat(item, "\" class=\"ew-viewer-img\" />"), "\n                    </div>");
                            return template;
                        }).join(' ');
                        imgThumbListTemplate = this.imageDataList.map(function (item, index) { return "<img src=\"".concat(item, "\" class=\"ew-viewer-thumb-img").concat(_this.handleClassName(index === _this.currentImageIndex ? 'active' : ''), "\" data-index=\"").concat(index, "\"/>"); }).join('');
                        domElement = this.createElement("<div class=\"ew-viewer hidden\">\n            <div class=\"ew-viewer-mask\">\n            <div class=\"ew-viewer-content\">".concat(imgListTemplate, "</div>\n            <div class=\"ew-viewer-tooltip-ratio hidden\">").concat(parseInt("".concat(this.computedImageRatio * 100)), "%</div>\n            <div class=\"ew-viewer-footer\">\n                <div class=\"ew-viewer-title\">\n                    ").concat(this.getImageNameFromURL(currentImage), "\n                    (").concat(naturalWidth, " x ").concat(naturalHeight, ")\n                </div>\n                ").concat(this.handleTemplate(showToolBar, "<div class=\"ew-viewer-button\">".concat(zoomButtonTemplate, "</div>")), "\n                ").concat(this.handleTemplate(this.imageDataList.length > 1, "<div class=\"ew-viewer-thumb\">".concat(imgThumbListTemplate, "</div>")), "\n            </div>\n            ").concat(this.handleTemplate(showCloseBtn, "<span class=\"ew-viewer-close-btn\">".concat(showCloseBtnIcon, "</span>")), "\n            </div>\n            </div>\n        "));
                        this.$dom.$el = this.$('.ew-viewer', this.$dom.rootElement);
                        if (!this.$dom.$el) {
                            this.$dom.rootElement.appendChild(domElement);
                        }
                        else {
                            this.$dom.rootElement.removeChild(this.$dom.$el);
                            this.$dom.rootElement.appendChild(domElement);
                        }
                        return [4 /*yield*/, this.initDom()];
                    case 2:
                        _c.sent();
                        if (autoOpen) {
                            this.open();
                        }
                        return [4 /*yield*/, this.bindEvent()];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ewViewer.prototype.initDom = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.$dom.$el = this.$('.ew-viewer', this.$dom.rootElement);
                this.$dom.$viewerContentElement = this.$('.ew-viewer-content', this.$dom.$el);
                this.$dom.$viewerRatioTooltipElement = this.$('.ew-viewer-tooltip-ratio', this.$dom.$el);
                this.$dom.$viewerToolbarElement = this.$('.ew-viewer-button', this.$dom.$el);
                this.$dom.$viewerThumbElement = this.$('.ew-viewer-thumb', this.$dom.$el);
                this.$dom.$viewerTitleElement = this.$('.ew-viewer-title', this.$dom.$el);
                return [2 /*return*/];
            });
        });
    };
    ewViewer.prototype.computedImageRatioHandler = function (status) {
        var _a = this.config, minImageRatio = _a.minImageRatio, maxImageRatio = _a.maxImageRatio;
        var delta = status ? 1 : -1;
        var ratio = this.computedImageRatio + delta * (Math.floor(Math.random() * 100) / 1000);
        this.computedImageRatio = Math.max(minImageRatio, Math.min(ratio, maxImageRatio));
    };
    ewViewer.prototype.onMouseWheelHandler = function (e) {
        var _this = this;
        e.preventDefault();
        if (this.wheeling) {
            return;
        }
        this.wheeling = true;
        setTimeout(function () {
            _this.wheeling = false;
        }, 150);
        this.viewedImageHandler(e.deltaY < 0);
    };
    ewViewer.prototype.viewedImageHandler = function (v) {
        var _this = this;
        if (this.isBoolean(v)) {
            this.computedImageRatioHandler(v);
        }
        else {
            this.computedImageRatio = v;
        }
        this.toggleTooltip(true);
        setTimeout(function () {
            _this.toggleTooltip(false);
        }, 1000);
        this.setImageStyle();
    };
    ewViewer.prototype.changeThumbImage = function () {
        var _this = this;
        var $viewerThumbElement = this.$dom.$viewerThumbElement;
        if (!$viewerThumbElement) {
            return;
        }
        var children = __spreadArray([], $viewerThumbElement.children, true);
        children.forEach(function (item) {
            var index = Number(item.getAttribute('data-index'));
            if (index === _this.currentImageIndex) {
                _this.addClass(item, 'active');
            }
            else {
                _this.removeClass(item, 'active');
            }
        });
    };
    ewViewer.prototype.requestFullscreen = function () {
        var _a;
        var $viewerContentElement = this.$dom.$viewerContentElement;
        if (!$viewerContentElement) {
            return;
        }
        var $fullEl = this.$('.ew-viewer-img-box.show', $viewerContentElement);
        var document = (_a = $fullEl.firstElementChild) === null || _a === void 0 ? void 0 : _a.ownerDocument;
        if (!(document.fullscreenElement
            || document.webkitFullscreenElement
            || document.mozFullScreenElement
            || document.msFullscreenElement)) {
            var documentElement = document.documentElement;
            if (documentElement.requestFullscreen) {
                documentElement.requestFullscreen();
            }
            else if (documentElement.webkitRequestFullscreen) {
                documentElement.webkitRequestFullscreen();
            }
            else if (documentElement.mozRequestFullScreen) {
                documentElement.mozRequestFullScreen();
            }
            else if (documentElement.msRequestFullscreen) {
                documentElement.msRequestFullscreen();
            }
        }
    };
    ewViewer.prototype.exitFullscreen = function () {
        var _a;
        var $viewerContentElement = this.$dom.$viewerContentElement;
        if (!$viewerContentElement) {
            return;
        }
        var $fullEl = this.$('.ew-viewer-img-box.show', $viewerContentElement);
        var document = (_a = $fullEl.firstElementChild) === null || _a === void 0 ? void 0 : _a.ownerDocument;
        if (document.fullscreenElement
            || document.webkitFullscreenElement
            || document.mozFullScreenElement
            || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };
    ewViewer.prototype.resetImage = function () {
        this.computedImageRatio = Number(this.config.imageRatio) || 0.9;
        this.imageStyle[this.currentImageIndex].rotate = 0;
        this.imageStyle[this.currentImageIndex].scaleX = 0;
        this.imageStyle[this.currentImageIndex].scaleY = 0;
        this.setImageStyle();
    };
    ewViewer.prototype.bindEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, $el, $viewerToolbarElement, $viewerThumbElement, _b, isClickOutside, zoomOnWheeling, autoSize, minRotate, maxRotate;
            var _this = this;
            return __generator(this, function (_c) {
                _a = this.$dom, $el = _a.$el, $viewerToolbarElement = _a.$viewerToolbarElement, $viewerThumbElement = _a.$viewerThumbElement;
                if (!$el) {
                    return [2 /*return*/];
                }
                _b = this.config, isClickOutside = _b.isClickOutside, zoomOnWheeling = _b.zoomOnWheeling, autoSize = _b.autoSize, minRotate = _b.minRotate, maxRotate = _b.maxRotate;
                this.on($el, 'click', function (e) {
                    var _a, _b;
                    var target = e.target;
                    if (!target) {
                        return;
                    }
                    var newTarget = (target === null || target === void 0 ? void 0 : target.tagName.toLowerCase()) === 'svg' ? target === null || target === void 0 ? void 0 : target.parentElement : (target === null || target === void 0 ? void 0 : target.tagName.toLowerCase()) === 'path' ? (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement : target;
                    var maskArr = ['ew-viewer-mask', 'ew-viewer-content', 'ew-viewer-footer', 'ew-viewer-title', 'ew-viewer-button', 'ew-viewer-thumb'];
                    var isCloseStatus = isClickOutside && maskArr.some(function (item) { return newTarget === null || newTarget === void 0 ? void 0 : newTarget.className.includes(item); }) || (newTarget === null || newTarget === void 0 ? void 0 : newTarget.className.includes('ew-viewer-close-btn'));
                    if ((_b = newTarget === null || newTarget === void 0 ? void 0 : newTarget.className) === null || _b === void 0 ? void 0 : _b.includes('ew-viewer-fullscreen')) {
                        return;
                    }
                    if (_this.fullScreenStatus) {
                        _this.exitFullscreen();
                        _this.fullScreenStatus = false;
                    }
                    else if (isCloseStatus) {
                        _this.close();
                    }
                });
                if (autoSize) {
                    this.on(window, 'resize', function () { return _this.setImageStyle(); });
                }
                if (zoomOnWheeling) {
                    this.on($el, 'wheel', this.onMouseWheelHandler.bind(this));
                }
                if ($viewerToolbarElement) {
                    this.on($viewerToolbarElement, 'click', function (e) {
                        var _a;
                        var target = e.target;
                        if (!target) {
                            return;
                        }
                        var newTarget = (target === null || target === void 0 ? void 0 : target.tagName.toLowerCase()) === 'svg' ? target === null || target === void 0 ? void 0 : target.parentElement : (target === null || target === void 0 ? void 0 : target.tagName.toLowerCase()) === 'path' ? (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement : target;
                        var prevHandler = function () {
                            _this.currentImageIndex--;
                            if (_this.currentImageIndex < 0) {
                                _this.currentImageIndex = _this.config.loop || _this.isPlaying ? _this.imageDataList.length - 1 : 0;
                            }
                            _this.changeThumbImage();
                            _this.setImageStyle();
                        };
                        var nextHandler = function () {
                            _this.currentImageIndex++;
                            if (_this.currentImageIndex > _this.imageDataList.length - 1) {
                                _this.currentImageIndex = _this.config.loop || _this.isPlaying ? 0 : _this.imageDataList.length - 1;
                            }
                            _this.changeThumbImage();
                            _this.setImageStyle();
                        };
                        var carouselHandler = function () {
                            _this.timeout = setTimeout(function () {
                                if (_this.isPrev) {
                                    prevHandler();
                                }
                                if (_this.isNext) {
                                    nextHandler();
                                }
                                carouselHandler();
                            }, Number(_this.config.interval) || 5000);
                        };
                        var prevOrNextHandler = function (prevStatus, nextStatus) {
                            _this.timeout && clearTimeout(_this.timeout);
                            _this.isPrev = prevStatus;
                            _this.isNext = nextStatus;
                            if (prevStatus) {
                                prevHandler();
                            }
                            if (nextStatus) {
                                nextHandler();
                            }
                            // 1s没点击如果在自动轮播则继续轮播
                            if (_this.isPlaying) {
                                setTimeout(function () {
                                    carouselHandler();
                                }, 1000);
                            }
                        };
                        switch (newTarget === null || newTarget === void 0 ? void 0 : newTarget.className) {
                            case 'ew-viewer-zoom-in':
                                if (_this.isClickZoomIn) {
                                    return;
                                }
                                _this.isClickZoomIn = true;
                                setTimeout(function () {
                                    _this.isClickZoomIn = false;
                                }, 50);
                                _this.viewedImageHandler(true);
                                break;
                            case 'ew-viewer-zoom-out':
                                if (_this.isClickZoomOut) {
                                    return;
                                }
                                _this.isClickZoomOut = true;
                                setTimeout(function () {
                                    _this.isClickZoomOut = false;
                                }, 50);
                                _this.viewedImageHandler(false);
                                break;
                            case 'ew-viewer-one-to-one':
                                if (_this.isClickOneToOne) {
                                    return;
                                }
                                _this.isClickOneToOne = true;
                                setTimeout(function () {
                                    _this.isClickOneToOne = false;
                                }, 50);
                                var ratio = _this.computedImageRatio === 1 ? 0.5 : 1;
                                _this.viewedImageHandler(ratio);
                                break;
                            case 'ew-viewer-rotate-left':
                                _this.imageStyle[_this.currentImageIndex].rotate -= 90;
                                if (_this.isNumber(minRotate) && minRotate !== -Infinity && _this.imageStyle[_this.currentImageIndex].rotate <= minRotate) {
                                    _this.imageStyle[_this.currentImageIndex].rotate = minRotate;
                                }
                                _this.setImageStyle();
                                break;
                            case 'ew-viewer-rotate-right':
                                _this.imageStyle[_this.currentImageIndex].rotate += 90;
                                if (_this.isNumber(maxRotate) && maxRotate !== Infinity && _this.imageStyle[_this.currentImageIndex].rotate >= maxRotate) {
                                    _this.imageStyle[_this.currentImageIndex].rotate = maxRotate;
                                }
                                _this.setImageStyle();
                                break;
                            case 'ew-viewer-flip-horizontal':
                                _this.imageStyle[_this.currentImageIndex].scaleX -= 1;
                                if (_this.imageStyle[_this.currentImageIndex].scaleX !== -1) {
                                    _this.imageStyle[_this.currentImageIndex].scaleX = 0;
                                }
                                _this.setImageStyle();
                                break;
                            case 'ew-viewer-flip-vertical':
                                _this.imageStyle[_this.currentImageIndex].scaleY -= 1;
                                if (_this.imageStyle[_this.currentImageIndex].scaleY !== -1) {
                                    _this.imageStyle[_this.currentImageIndex].scaleY = 0;
                                }
                                _this.setImageStyle();
                                break;
                            case 'ew-viewer-reset':
                                _this.resetImage();
                                break;
                            case 'ew-viewer-prev':
                                prevOrNextHandler(true, false);
                                break;
                            case 'ew-viewer-next':
                                prevOrNextHandler(false, true);
                                break;
                            case 'ew-viewer-fullscreen':
                                _this.fullScreenStatus = !_this.fullScreenStatus;
                                if (_this.fullScreenStatus) {
                                    _this.requestFullscreen();
                                }
                                else {
                                    _this.exitFullscreen();
                                }
                                break;
                            case 'ew-viewer-play':
                                _this.isPlaying = !_this.isPlaying;
                                var _b = _this.config, playIcon_1 = _b.playIcon, pauseIcon_1 = _b.pauseIcon;
                                if (playIcon_1 && pauseIcon_1 && newTarget) {
                                    newTarget.innerHTML = _this.isPlaying ? pauseIcon_1 : playIcon_1;
                                }
                                // 默认向右
                                _this.isNext = true;
                                if (_this.isPlaying) {
                                    carouselHandler();
                                }
                                else {
                                    _this.timeout && clearTimeout(_this.timeout);
                                }
                                break;
                        }
                    });
                }
                if ($viewerThumbElement) {
                    this.on($viewerThumbElement, 'click', function (e) {
                        var target = e.target;
                        e.stopPropagation();
                        if (target) {
                            if (target.className.includes('ew-viewer-thumb-img')) {
                                _this.currentImageIndex = Number(target.getAttribute('data-index'));
                                _this.changeThumbImage();
                                _this.setImageStyle();
                            }
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    ewViewer.prototype.toggleTooltip = function (status) {
        var _this = this;
        var $viewerRatioTooltipElement = this.$dom.$viewerRatioTooltipElement;
        if (!$viewerRatioTooltipElement) {
            return;
        }
        setTimeout(function () {
            _this.addClass($viewerRatioTooltipElement, status ? "show" : "hidden");
            _this.removeClass($viewerRatioTooltipElement, status ? "hidden" : "show");
        }, 100);
    };
    ewViewer.prototype.baseToggle = function (status, time) {
        var _this = this;
        var closeTime = this.config.closeTime;
        setTimeout(function () {
            _this.addClass(_this.$dom.$el, status ? "show" : "hidden");
            _this.removeClass(_this.$dom.$el, status ? "hidden" : "show");
        }, time || closeTime);
    };
    ;
    ewViewer.prototype.close = function (time) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.resetImage();
                this.baseToggle(false, time);
                return [2 /*return*/];
            });
        });
    };
    ewViewer.prototype.viewImage = function (index) {
        if (this.isNumber(index) && index >= 0 && index <= this.imageDataList.length - 1) {
            this.currentImageIndex = index;
        }
        this.open();
    };
    ewViewer.prototype.open = function (time) {
        this.changeThumbImage();
        this.setImageStyle();
        this.baseToggle(true, time);
    };
    ewViewer.prototype.destroy = function () {
        var _a;
        (_a = this.$dom.$el) === null || _a === void 0 ? void 0 : _a.remove();
    };
    return ewViewer;
}(ewViewerUtil));

