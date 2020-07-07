// 请求数据封装
Vue.prototype.request = function(url,param,method="POST"){
    return axios({
        headers: {
            'Content-Type': 'application/json'
        },
        method:method,
        data:param,
        url:url
    })
}
