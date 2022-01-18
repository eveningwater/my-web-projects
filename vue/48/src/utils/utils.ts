export function marked(template:string):string {
    return template.replace(/.+?[\s+]/g,v => `<p>${v}</p>`);
}
export function isString<T>(value:T):boolean {
    return typeof value === "string";
}
export const imageURL = "https://www.eveningwater.com/static/page/CSS/css-code-50-image/comic-girl-01.jpg";
export const contentURL = "./sources/";
export const articleTitles = ["朝闻雨记","剑阁游记"];