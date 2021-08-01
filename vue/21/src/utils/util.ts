// markdown
export const renderMarkedContent = (template:string):string => {
    let result = "";
    const matchLinkRegExp = /\[(.+?)\]\s*\((.+?)\)/g;
    const matchCodeRegExp = /[\*]{3}([\s\S]*?)[\*]{3}/g;
    result = template.replace(matchLinkRegExp,() => `<a href="${ RegExp.$2 }" target="blank">${ RegExp.$1 }</a>`)
    .replace(matchCodeRegExp,() => `<code>${ RegExp.$1 }</code>`);
    return result;
}