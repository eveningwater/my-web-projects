import { API,APP_KEY,APP_ID } from "./const";
import MD5 from "./MD5";
const createScript = (src) => new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.id = "translateScript";
    document.body.appendChild(script);
    resolve();
});
export function translate(template,lang){
    const date = Date.now(),
          res = APP_ID + template + date + APP_KEY,
          md5 = MD5(res),
          data = `q=${template}&from=auto&to=${lang}&appid=${APP_ID}&salt=${date}&sign=${md5}&callback=getTransLateCallback`,
          src = API + data;
    return createScript(src);
}
export const on = (element, type, handler, useCapture = false) => {
    if (element && type && handler) {
        element.addEventListener(type, handler, useCapture);
    }
};
export const isMobile = () => navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);