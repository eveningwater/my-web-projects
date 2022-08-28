export const isServer = typeof window === "undefined";
export type ElementType = HTMLElement | Document | Window | null | Element;
export function on(element: ElementType,type: string,handler: EventListenerOrEventListenerObject,useCapture: boolean = false) {
  if (element && type && handler) {
    element.addEventListener(type, handler, useCapture);
  }
}