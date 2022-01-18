export interface IconItemType {color?:string,prop:string}
export interface IconType {
    [key:string]:Array<IconItemType> | string
}
export const iconPathData:IconType = {
    "menu":"M128 768h768v-85.333333H128v85.333333z m0-213.333333h768v-85.333334H128v85.333334z m0-298.666667v85.333333h768V256H128z"
}