/*
* 功能:判断某一项是否是数组当中的某一项
*  @params: 数组 、匹配项、默认项
*/
export function oneOf(arr,value,defaultValue){
    return arr.reduce((result,item) => {
        return item.indexOf(value) > -1 ? item : result;
    },defaultValue)
}