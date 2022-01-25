interface ConsoleType {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    bgBlack:string;
    bgRed: string;
    bgGreen:string;
    bgYellow:string;
    bgBlue: string;
    bgMagenta:string;
    bgCyan: string;
    bgWhite:string;
}
export function colorize<T>(...args:Array<T>){
    return {
        black: `\x1b[30m${args.join(' ')}`,
        red: `\x1b[31m${args.join(' ')}`,
        green: `\x1b[32m${args.join(' ')}`,
        yellow: `\x1b[33m${args.join(' ')}`,
        blue: `\x1b[34m${args.join(' ')}`,
        magenta: `\x1b[35m${args.join(' ')}`,
        cyan: `\x1b[36m${args.join(' ')}`,
        white: `\x1b[37m${args.join(' ')}`,
        bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
        bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
        bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
        bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
        bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
        bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
        bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
        bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
    };
}
export function consoleByColorKey<T,U extends keyof ConsoleType>(str:string,key="black"){
    return console.log(colorize(str)[key as U]);
}
const getRandom = <T>(data:Array<T>) => data[Math.floor(Math.random() * data.length)];
const randomRange = (min:number, max:number) => Math.floor(Math.random() * (max - min + 1)) + min;