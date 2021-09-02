export function marked(template){
    return template.replace(/.+?[\s]/g,v => `<p>${v}</p>`);
}