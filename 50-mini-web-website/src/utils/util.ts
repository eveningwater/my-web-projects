export const isServer = typeof window === "undefined";
export type ElementType = HTMLElement | Document | Window | null | Element;
declare interface NewWindow extends Window {
  mozRequestAnimationFrame?: any;
  msRequestAnimationFrame?: any;
  oRequestAnimationFrame?: any;
  mozCancelAnimationFrame?: any;
  msCancelAnimationFrame?: any;
  oCancelAnimationFrame?: any;
  webkitRequestAnimationFrame?: any;
  webkitCancelAnimationFrame?: any;
}
export function on(element: ElementType,type: string,handler: EventListenerOrEventListenerObject,useCapture: boolean = false) {
  if (element && type && handler) {
    element.addEventListener(type, handler, useCapture);
  }
}
export function off(element: ElementType,type: string,handler: EventListenerOrEventListenerObject,useCapture: boolean = false) {
  if (element && type && handler) {
    element.removeEventListener(type, handler, useCapture);
  }
}
export function getImageURL(directory: string = "javascript",path: string): string {
  return new URL(`../assets/${directory}/${path}`, import.meta.url).href;
}
export const requestAnimationFrame = (handler: FrameRequestCallback) => {
  const raf =
    window.requestAnimationFrame ||
    (window as NewWindow).mozRequestAnimationFrame ||
    (window as NewWindow).webkitRequestAnimationFrame ||
    (window as NewWindow).msRequestAnimationFrame ||
    (window as NewWindow).oRequestAnimationFrame ||
    function (callback) {
      return setTimeout(callback, 1000 / 16);
    };
  return raf(handler);
};
export const cancelAnimationFrame = (handler: number) => {
  const caf =
    window.cancelAnimationFrame ||
    (window as NewWindow).mozCancelAnimationFrame ||
    (window as NewWindow).msCancelAnimationFrame ||
    (window as NewWindow).oCancelAnimationFrame;
  return caf(handler);
};
export const cubic = (base: number, index: number): number => Math.pow(base, index);
export const easeInOutCubic = (value: number): number => value < 0.5 ? cubic(value * 2, 3) / 2 : 1 - cubic((1 - value) * 2, 3) / 2;
export const debounce = (fn: Function, wait: number) => {
    let timeout: any = null;
    return function () {
      if (timeout)clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
    };
};
export function isTextOverflow(element:HTMLElement) {
  // use range width instead of scrollWidth to determine whether the text is overflowing
  // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
  if (!element || !element.childNodes || !element.childNodes.length) {
      return false;
  }
  const range = document.createRange();
  range.setStart(element, 0);
  range.setEnd(element, element.childNodes.length);
  const rangeWidth = range.getBoundingClientRect().width;
  // if the element has padding style,should add the padding value.
  const padding = (parseInt(getStyle(element, 'paddingLeft') as string, 10) || 0) + (parseInt(getStyle(element, 'paddingRight') as string, 10) || 0);
  return rangeWidth + padding > element.offsetWidth || element.scrollWidth > element.offsetWidth;
}
export function hasClass(el:HTMLElement | Element, cls:string):boolean {
  if (!el || !cls) {
      return false;
  }
  if (cls.indexOf(" ") > -1) {
      console.error(`className should not contain space!`);
      return false;
  }
  if (el.classList) {
      return el.classList.contains(cls);
  } else {
      return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}
export function camelCase(name:string):string {
  return name.replace(/([\:\_\-]+(.))/g, (_, separator, letter, offset) => offset ? letter.toUpperCase() : letter).replace(/^moz([A-Z])/, "Moz$1")
}
// IE version more than 9
export function getStyle(el:HTMLElement, styleName:string) {
  if (!el || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
      styleName = 'cssFloat';
  }
  try {
      var computed = document.defaultView ? document.defaultView.getComputedStyle(el, '') : window.getComputedStyle(el,"");
      return el.style[styleName as keyof CSSStyleDeclaration] || computed ? computed[styleName as keyof CSSStyleDeclaration] : null;
  } catch (e) {
      return el.style[styleName as keyof CSSStyleDeclaration];
  }
}