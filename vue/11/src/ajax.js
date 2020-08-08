import $ from 'jquery';
/**
 * ajax请求封装
 * @param {*} url 
 * @param {*} method 
 * @param {*} data 
 * @param {*} header 
 * @param {*} async 
 * @param {*} callback 
 */
export function request(url,method,data,callback){
    let option = {
        url: url,
        type: method,
        data: data,
        dataType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        success: function (data) {
            callback(data);
        }
    };
    return $.ajax(option);
}