// chunk the arr by size
export const chunk = function<T>(arr:Array<T>,size:number){
    return Array.from({ length:Math.ceil(arr.length / size)},(v,i) => arr.slice(i* size,i * size + size)); 
}