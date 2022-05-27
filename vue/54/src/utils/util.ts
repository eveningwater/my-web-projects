export const isString = <T>(v:T) => typeof v === "string";
export const getRandom = (total:number,end:number) => () => String.fromCharCode(Math.floor(Math.random() * total) + end);