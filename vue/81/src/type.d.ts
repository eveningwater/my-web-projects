enum Status {
    START,
    RUNNING,
    ENDING
}

declare namespace GlobalModule {
    export type LevelType = number | string;
    export type ElementType = HTMLElement | Document | Window | null | Element;
    export interface SnowOptionType {
        snowNumber?: number;
        snowShape?: number;
        speed?: number;
    }
    export interface GameConfigType {
        materialList:Record<string,string> [],
        time: number,
        gameStatus: Status
    }
    export interface MaterialData {
        active: boolean
        src: string
        title?: string
        id: string
        isMatch: boolean
    }
    export type DocumentHandler = <T extends MouseEvent|Event>(mouseup:T,mousedown:T) => void;
    export type FlushList = Map<HTMLElement,{ DocumentHandler:DocumentHandler,bindingFn:(...args:unknown[]) => unknown }>
}
