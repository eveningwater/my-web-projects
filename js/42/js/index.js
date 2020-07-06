/********************************/
/*功能*/
/*作者:eveningwater*/
/*日期:2017-1-16*/
/********************************/
/*变量定义*/
//获取input
var input = document.getElementsByTagName("input");
//获取按钮
var btnClose = document.getElementsByClassName("btn-close")[0];
//获取图片
var boxImg = document.getElementsByClassName("content-img")[0];
//获取弹出框
var popbox = document.getElementsByClassName("popbox")[0];
//获取img
var imgBtn = popbox.getElementsByTagName("img")[0];
var popBoxFlag = false;
var inputFlag = false;
/*******************************/
/*函数定义部分*/
/*******************************/
[].slice.call(input).forEach((item, index) => {
    item.addEventListener('click', () => {
        switch (index) {
            case 0:
                boxImg.style.transform = 'scale(1)';
                break;
            case 1:
                boxImg.style.transform = 'scale(0.4)';
                break;
            case 2:
                popbox.style.display = 'block';
                break;
            case 3:
                inputFlag = !inputFlag;
                let oldClassName = boxImg.className;
                let className = inputFlag && oldClassName.indexOf('-2') === -1 ? oldClassName + "-2" : oldClassName.slice(0,oldClassName.lastIndexOf('-'));
                boxImg.classList.replace(oldClassName,className);
                break;
        }
    }, false);
})

popbox.onclick = btnClose.onclick = function (e) {
    const className = e.target.className.toLowerCase();
    if(className.indexOf('popbox') > -1 || className.indexOf('btn-close') > -1){
        popbox.style.display = 'none';
    }
}
imgBtn.onclick = function () {
    popBoxFlag = !popBoxFlag;
    imgBtn.src = popBoxFlag ? 'img/namei.jpg' : 'img/baixing.jpg';
}