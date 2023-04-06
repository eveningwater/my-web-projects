import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElLoading as Loading, ElMessage as Message } from 'element-plus';
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading';

export let BASE_URL = '',
  loadingInstance: LoadingInstance;
const HOST = process.env.NODE_ENV;
console.log(111, HOST);
switch (HOST) {
  case 'development':
    BASE_URL = '';
    break;
  case 'test':
    BASE_URL = '';
    break;
  default:
    BASE_URL = '';
}
axios.create({
  //crossDomain: true,//设置cross跨域
  withCredentials: false, //跨域请求是否允许携带cookie资源凭证
  baseURL: BASE_URL,
  timeout: 1000 //请求超时时间
  // responseType:"arraybuffer"  返回的数据格式
});
axios.interceptors.request.use(
  <T>(
    config:
      | InternalAxiosRequestConfig<T>
      | Promise<InternalAxiosRequestConfig<T>>
  ) => {
    // let token=localStorage.getItem('token');
    // token && (config.headers.Authorization=token);//请求携带token
    // config.headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded'  //转换数据格式
    // }
    loadingInstance = Loading.service({
      lock: true,
      text: '飞速加载中……',
      background: 'rgba(0,0,0,.5)'
    });
    return config;
  },
  <T>(error: T) => Promise.reject(error)
);
axios.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    setTimeout(() => {
      loadingInstance.close();
    }, 300);
    return response;
  },
  (error: { response: { status: number } }) => {
    setTimeout(() => {
      loadingInstance.close();
    }, 300);
    let { response } = error;
    if (response) {
      //服务器有返回内容
      var errorMsg = '';
      switch (response.status) {
        case 400:
          errorMsg = '错误请求';
          break;
        case 401:
          errorMsg = '未登录,请重新登录';
          break;
        case 403:
          errorMsg = '决绝访问';
          break;
        case 404:
          errorMsg = '请求错误，未找到该资源';
          break;
        case 405:
          errorMsg = '请求方法未允许';
          break;
        case 408:
          errorMsg = '请求超时';
          break;
        case 500:
          errorMsg = '服务器出错';
          break;
        case 501:
          errorMsg = '网络未实现';
          break;
        case 502:
          errorMsg = '网络错误';
          break;
        case 503:
          errorMsg = '服务不可用';
          break;
        case 504:
          errorMsg = '网络超时';
          break;
        case 505:
          errorMsg = 'http版本不支持该请求';
          break;
        default:
          errorMsg = '连接错误';
      }
      Message({ type: 'warning', message: errorMsg });
      return false;
    } else {
      //服务器连结果都没有返回  有可能是断网或者服务器奔溃
      if (!window.navigator.onLine) {
        //断网处理
        Message('网络中断');
        return;
      } else {
        //服务器奔了
        Message('服务器崩溃了');
        return Promise.reject(error);
      }
    }
  }
);
export function get(url: string, params?: Record<string, any>) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => resolve(res.data))
      .catch(err => reject(err.data));
  });
}
export function post(url: string, params?: Record<string, any>) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => resolve(res.data))
      .catch(err => reject(err.data));
  });
}
export function patch(url: string, params?: Record<string, any>) {
  return new Promise((resolve, reject) => {
    axios.patch(url, params).then(
      res => resolve(res.data),
      err => reject(err)
    );
  });
}
export function put(url: string, params?: Record<string, any>) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(
      res => resolve(res.data),
      err => reject(err)
    );
  });
}
export default {
  get,
  post,
  patch,
  put
};
