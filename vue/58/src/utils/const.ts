export const BASE_URL =
  "https://www.eveningwater.com/static/page/CSS/css-code-50-image/";
export const debounce = (handler: Function, wait = 50) => {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      handler.apply(this, args);
    }, wait);
  };
};
