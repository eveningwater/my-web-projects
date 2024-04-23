type ReactComponentObj = { type: string; props: Record<string, string> };
export const simpleJSXParser = (template: string) => {
    const componentRegExp = /(<\w+(([\s\S])*?)<\/\w+>)/;
    const componentPropRegExp = /(\w+)=["|']?(.+?)["|']/g;
    const tagRegExp = /(<.+?>)?<\/?.+?>/;
    const len = template.length;
    const res: (string | ReactComponentObj)[] = [];
    if (len > 0) {
        let i = len,
            resStr = '',
            componentRes = '';
        const createComponent = (v: string): ReactComponentObj => {
            const componentName = v.match(/\w+/)?.[0] as string;
            const props =
                v
                    .match(componentPropRegExp)
                    ?.map(item => {
                        return {
                            key: item.replace(componentPropRegExp, (_, _1) => _1),
                            value: item.replace(componentPropRegExp, (_, _1, _2) => _2),
                        };
                    })
                    .reduce((res, item) => {
                        res[item.key] = item.value;
                        return res;
                    }, {} as Record<string, string>) || {};
            return {
                type: componentName,
                props,
            };
        };
        while (i > 0) {
            const match = template.match(componentRegExp);
            if (match) {
                const start = match?.index;
                for (let i = 0; i < start!; i++) {
                    resStr += template[i];
                }
                res.push(resStr);
                i -= resStr.length;
                template = template.replace(resStr, '');
                resStr = '';
                const matchComponent = template.match(tagRegExp);
                if (matchComponent) {
                    componentRes = matchComponent[0];
                    template = template.replace(componentRes, '');
                    i -= componentRes.length;
                    res.push(createComponent(componentRes));
                    componentRes = '';
                } else {
                    res.push(template);
                    i -= template.length;
                }
            } else {
                i = 0;
                res.push(template);
            }
        }
    }
    // console.log(111, res);
    return res;
};

