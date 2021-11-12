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