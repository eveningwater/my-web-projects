export const BASE_IMAGE_URL = "https://www.eveningwater.com/img/segmentfault/";
export const materialList: Record<string,string> [] = new Array(12).fill(null).map((item,index) => ({ title:`思否猫-${index + 1}`,src:`${BASE_IMAGE_URL + (index + 1)}.png`}));
export const defaultConfig: GlobalModule.GameConfigType = {
    materialList,
    time: 120,
    gameStatus: 0
}