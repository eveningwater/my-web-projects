import axios from 'axios';
import { addMapRequest, deleteMapRequest } from './cacheRequst';
import { getToken, token } from './util';

const instance = axios.create({
    baseURL:"/api"
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(async config => {
    let headerToken = token;
    if(headerToken){
        // token已存在
    }else{
        headerToken = await getToken();
    }
    addMapRequest(config);
    // 设置headerToken
    config.headers.token = headerToken;
    return config;
})
/**
 * 响应拦截器
 */
instance.interceptors.response.use(res => {
    deleteMapRequest(res.config);
    return res.data;
},error => {
    if(axios.isCancel(error)){
        // 请求已取消
    }
    return Promise.reject(error);
});
// 获取标签页列表
export const getTabs = () => instance.get("/tabs");
// 获取新闻列表
export const getNewsList = () => instance.get("/news");