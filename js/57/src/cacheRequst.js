import axios from 'axios';
const requestMap = new Map();

const getMapKey = config => {
    const { url,method } = config;
    return [url,method].join('&');
}
/**
 * 添加
 * @param {*} config 
 */
export const addMapRequest = config => {
    const mapKey = getMapKey(config);
    // 如果存在，则获取并取消
    if(requestMap.has(mapKey)){
        const cancel = requestMap.get(mapKey);
        cancel(mapKey);
        requestMap.delete(mapKey);
    }
    // 设置取消token
    config.cancelToken = new axios.CancelToken(cancel => requestMap.set(mapKey,cancel));
}
/**
 * 删除
 * @param {*} config 
 */
export const deleteMapRequest = config => {
    const mapKey = getMapKey(config);
    requestMap.delete(mapKey);
}