/**
* 功能：弹出框插件功能
* 结构：页面所有的可视化内容应该包含在一个<main>标签内，添加弹出框的元素应该独立在<main>标签以外，如<aside>标签
* 参数：1、添加弹出框的元素ID；2、对象（详见下方的“参数对象属性”）
* 【参数对象属性】
* type: 弹出框的类型（必选）。可以包含：text（文本）、confirm（消息确认）、image（图片）、form（表单）这四个字符串
* showClose: 是否显示右上角的关闭按钮，为一个布尔值。
* content: 弹出框的内容，值类型为字符串。（可以包括HTML标签字符串）
* url: 图片相对路径，值类型为字符串。
* imgTitle: 图片的小标题描述，值类型为字符串。
* confirm: 确认事件回调函数，值类型为函数。
* login: 登录事件回调函数，值类型为函数。
* cancel: 取消事件回调函数，值类型为函数。
**/
function popbox(ident, objparam) {
    //获取页面的main标签
    var main = document.getElementsByTagName("main")[0];
    //获取显示弹出框容器
    var showpopboxElement = document.getElementById(ident);
    //写入基本的弹出框标签元素
    showpopboxElement.innerHTML = '<popbox-main id="popbox-main">' +
        '<masklayer></masklayer>' +
        '<popbox>' +
        '<popbox-close>X</popbox-close>' +
        '<popbox-content>' +
        objparam.content +
        '</popbox-content>' +
        '</popbox>' +
        '</popbox-main>';
    //弹出框组件
    var popboxmain = document.getElementById("popbox-main");
    //弹出框内容
    var popboxcontent = document.getElementsByTagName("popbox-content")[0];
    //是否显示弹出框关闭按钮
    var closebtn = document.getElementsByTagName("popbox-close")[0];
    //如果配置的值为false或者没有配置值则移除按钮
    if (!objparam.showclose) {
        //移除关闭按钮
        closebtn.remove();
    }
    //获取当前弹出框的类型
    var popboxtype = objparam.type;
    //如果是文本内容
    if (popboxtype == "text") {
        //获取文本内容
        var contentTxt = popboxcontent.textContent;
        //处理过长的文本。字数限制在63字以内
        popboxcontent.textContent = contentTxt.replace(contentTxt.substr(63), "...");
        //设置对应的class
        popboxcontent.className = "text";

    }
    //如果是确认框内容
    else if (popboxtype == "confirm") {
        //设置对应的class
        popboxcontent.className = "confirm";
        //添加一个存放按钮的容器
        popboxcontent.innerHTML += '<div class="btnGroup">' +
            '<button type="button" id="confirm">确认</button>' +
            '<button type="button" id="cancel">取消</button>' +
            '</div>';
        //获取确认和取消按钮id
        var confirm = document.getElementById("confirm"),
            cancel = document.getElementById("cancel");
        //确认事件
        confirm.onclick = function () {
            //处理未配置参数情况
            objparam.confirm = objparam.confirm === undefined ? function () { } : objparam.confirm;
            //执行回调
            objparam.confirm();
            //调用弹出框关闭函数
            closePopbox(main, popboxmain);
        }
        //取消事件
        cancel.onclick = function () {
            //处理未配置参数情况
            objparam.cancel = objparam.cancel === undefined ? function () { } : objparam.cancel;
            //执行回调
            objparam.cancel();
            //调用弹出框关闭函数
            closePopbox(main, popboxmain);
        }
    }
    else if (popboxtype == "image") {
        //处理未配置参数情况
        objparam.url = objparam.url === undefined ? "img/default-1.jpg" : objparam.url;
        objparam.title = objparam.title === undefined ? "" : objparam.title;
        //设置对应类型的class
        popboxcontent.className = "image";
        //添加一张图片
        popboxcontent.innerHTML = '<img src="' + objparam.url + '" title="' + objparam.title + '">';
    }
    else if (popboxtype == "form") {
        //设置对应类型的class
        popboxcontent.className = "form";
        //添加一个存放按钮的容器
        popboxcontent.innerHTML += '<div class="btnGroup">' +
            '<button type="button" id="login">登陆</button>' +
            '<button type="button" id="cancel">取消</button>' +
            '</div>';
        //获取登陆和取消按钮id
        var login = document.getElementById("login"),
            cancel = document.getElementById("cancel");
        //登陆事件
        login.onclick = function () {
            //处理未配置参数情况
            objparam.login = objparam.login === undefined ? function () { } : objparam.login;
            //执行回调
            objparam.login();
        }
        //取消事件
        cancel.onclick = function () {
            //处理未配置参数情况
            objparam.cancel = objparam.cancel === undefined ? function () { } : objparam.cancel;
            //执行回调
            objparam.cancel();
            //调用弹出框关闭函数
            closePopbox(main, popboxmain);
        }
    }
    //显示出弹出框组件
    setTimeout(function () {
        main.classList.add("blur");
        popboxmain.style.visibility = "visible";
        popboxmain.style.opacity = 1;
    }, 0);
    //关闭按钮事件
    closebtn.onclick = function () {
        //调用弹出框关闭函数
        closePopbox(main, popboxmain);
    }
}
/**
* 功能：关闭弹出框
**/
function closePopbox(main, popboxmain) {
    main.classList.remove("blur");
    popboxmain.style.opacity = 0;
    setTimeout(function () {
        popboxmain.remove();
    }, 300);
}
