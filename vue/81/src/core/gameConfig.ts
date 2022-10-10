export const BASE_IMAGE_URL = "https://www.eveningwater.com/my-web-projects/js/26/img/";
export const materialList: Record<string,string> [] = new Array(12).fill(null).map((item,index) => ({ title:`图片-${index + 1}`,src:`${BASE_IMAGE_URL + (index + 1)}.jpg`}));
export const defaultConfig: GlobalModule.GameConfigType = {
    materialList,
    time: 120,
    gameStatus: 0
}