export function request(options){
    const { url,...rest } = options;
    return fetch(url,rest).then(res => res.json())
}