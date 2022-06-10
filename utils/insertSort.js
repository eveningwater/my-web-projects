/**
 *  插入排序原理
 *  每次取2项相比，谁大就交换位置，个人理解更像是交换排序
 * @param {*} arr 
 * @returns 
 */
const insertSortAsc = (arr) => {
    let item,j;
    // 在有些下标不是为0开始的语言，这里的i就应该是2
    for(let i = 1;i < arr.length;i++){
        item = arr[i];
        j = i - 1;
        // 升序,在有些下标不是为0开始的语言，这里的j >= 0应该是j > 0
        while(j >= 0 && arr[j] > item){
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = item;
    }
    return arr;
}
console.log(insertSortAsc([5,2,4,6,1,3]));
// 以上算法执行过程如下:
//[2,5,4,6,1,3]
//[2,4,5,6,1,3]
//[2,4,5,6,1,3]
//[2,4,5,1,6,3]
//[2,4,1,5,6,3]
//[2,1,4,5,6,3]
//[1,2,4,5,6,3]
//[1,2,4,5,3,6]
//[1,2,4,3,5,6]
//[1,2,3,4,5,6]
const insertSortDes = arr => {
    let item,j;
    for(let i = 1;i < arr.length;i++){
        item = arr[i];
        j = i - 1;
        // 降序
        while(j >= 0 && arr[j] < item){
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = item;
    }
    return arr;
}
console.log(insertSortDes([5,2,4,6,1,3]));