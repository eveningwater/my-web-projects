export const useCssTypeCode = (str: string) => {
    const splitSymbol = [' ', '>', '+', '~', ',']
    splitSymbol.forEach((symbol) => {
        str = str.replace(symbol, 's-').replace(/\s/g, '').replace(/,/g, 's-');
    });
    return str.split('s-').reduce((res, item) => {
        if (item[0] === '#') {
            res.res += `<element id="${item.slice(1)}">`;
            res.id += 1;
        } else if (item[0] === '.') {
            res.className += 1;
            res.res += `<element className="${item.slice(1)}">`;
        } else if (item[0] === '[') {
            res.className += 1;
            res.res += `<element attr="${item.slice(1, -1)}">`
        } else if (item === '*') {
            res.res += `<element>`
        } else {
            res.tag += 1;
            res.res += `<${item}>`
        }
        return res;
    }, { res: '', id: 0, className: 0, tag: 0 })
}

