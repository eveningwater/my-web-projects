export const filterZero = (v: number | string) => `0${v}`.slice(-2);
export const isServer = typeof window === "undefined";
export type ElementType = HTMLElement | Document | Window | null | Element;
export function on(
  element: ElementType,
  type: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
) {
  if (element && type && handler) {
    element.addEventListener(type, handler, useCapture);
  }
}
export const getRandomLocation = () => {
  const w = window.innerWidth,
    h = window.innerHeight;
  let x = Math.random() * (w - 200) + 100,
    y = Math.random() * (h - 200) + 100;
  return {
    x,
    y,
  };
};
