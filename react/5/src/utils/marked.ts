export function marked(template:string):string {
    let result = "";
    result = template.replace(/\[.+?\]\(.+?\)/g,word => {
        const link = word.slice(word.indexOf('(') + 1, word.indexOf(')'));
        const linkText = word.slice(word.indexOf('[') + 1, word.indexOf(']'));
        return `<a href="${link}" target="blank">${linkText}</a>`;
    }).replace(/\*\*\*([\s\S]*?)\*\*\*[\s]?/g,text => '<code>' + text.slice(3,text.length - 4) + '</code>');
    return result;
}