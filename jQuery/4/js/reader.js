/**
 * 全局变量
 */
var global = {
    novelData:[] //小说数据
}
/**
 * 功能:页面加载时调用函数
 */
$(document).ready(function () {
    clickBack();
    loadData()
})
/**
 * 功能:点击返回
 */
function clickBack() {
    $('.back').click(function () {
        history.go(-1);
    })
}
/**
 * 功能:加载数据
 */
function loadData() {
    $.get('../data/reader.json', function (res) {
        if (Array.isArray(res) && res.length) {
            global.novelData = res;
            renderReader(res);
        }
    })
}
/**
 * 读取小说数据
 * @param {*} data 
 */
function renderReader(data) {
    var dHtml = '';
    data.forEach(function (item) {
        dHtml += '<div class="novel-directory">' +
            item.directory +
            '<i class="arrow-right">&gt;</i>' +
            '</div>';
    })
    $('.novel-main').html(dHtml);
    //点击目录跳转
    clickDirectory($('.novel-directory'));
}
/**
 * 点击目录跳转
 * @param {*} ele 
 */
function clickDirectory(ele){
    var mHtml = '';
    if(ele && ele.length){
        ele.click(function(){
            var index = $(this).index();
            mHtml += '<article class="novel-content">'+
            '<h2>'+
            global.novelData[index]['directory']+
            '</h2>'+
            '<p>'+
            global.novelData[index]['content']+
            '</p></article>';
            $('.novel-main').html(mHtml);
        })
    }
}