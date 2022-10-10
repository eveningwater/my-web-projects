export const isServer = typeof window === "undefined";
export function on(
  element: GlobalModule.ElementType,
  type: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
) {
  if (element && type && handler) {
    element.addEventListener(type, handler, useCapture);
  }
}
export function isDom(el: any): boolean {
  return typeof HTMLElement === 'object' ?
    el instanceof HTMLElement :
    el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string'
    || el instanceof HTMLCollection;
}

export const createUUID = (): string => (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
export const CountDown = (start: number,
  end: number,
  step: number = 1,
  duration: number = 2000,
  callback: (args: { status: string, value: number, clear: () => void }) => any): { clear: () => void } => {
  let timer: ReturnType<typeof setTimeout>,
    current = start + 1,
    _step = (end - start) * step < 0 ? -step : step;
  const handler = () => {
    current += _step;
    callback({
      status: "running",
      value: current,
      clear: () => {
        // 需要修改值
        if (end - start > 0) {
          current = end - 1;
        } else {
          current = end + 1;
        }
        clearTimeout(timer);
      }
    });    
    const isOver = end - start > 0 ? current >= end - 1 : current <= end + 1;
    if (isOver) {
      clearTimeout(timer);
      callback({
        status: "end",
        value: current,
        clear: () => {
          // 需要修改值
          if (end - start > 0) {
            current = end - 1;
          } else {
            current = end + 1;
          }
          clearTimeout(timer);
        }
      })
    } else {
      timer = setTimeout(handler, Math.abs(duration));
    }
  }
  handler();
  return {
    clear: () => clearTimeout(timer)
  }
}