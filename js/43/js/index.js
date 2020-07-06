/**************************/
/*功能:首页*/
/*作者:eveningwater*/
/*日期:2017-1-18*/
/**************************/
/*********************/
/*页面基本操作*/
/*********************/
//文本按钮
var textbtn = document.getElementById("textpupbox");
//操作按钮
var confirmbtn = document.getElementById("confirmpupbox");
//图片按钮
var imagebtn = document.getElementById("imagepupbox");
//表单按钮
var formbtn = document.getElementById("formpupbox");
//点击显示文本弹出框
textbtn.onclick = function () {
    popbox("showPupbox", {
        type: "text",
        showclose: true,
        content: "山青云白白凤到，人家参差春意闹。" +
            "门前苦菜数尺高，黄花梢，西风飘，误把黄花弄一笑。" +
            "田际芳草吹不倒，丛簇迎来风雨摇。" +
            "骚人心思少芳草，风何妖，人愁杳，争知芳心终不老。" +
            "天仙子——春景" +
            "2013年3月3日作"
    });
}
//点击显示操作弹出框
confirmbtn.onclick = function () {
    popbox("showPupbox", {
        type: "confirm",
        showclose: false,
        content: "你确定要更换当前的背景图片?",
        confirm: function () {
            //获取当前的背景图class
            var main = document.getElementsByTagName("main")[0];
            var curbgiclass = main.classList;
            //转化为一个数组
            curbgiclass = Array.prototype.slice.call(curbgiclass);
            //如果为背景图1
            if (curbgiclass.indexOf("bg-1") != -1) {
                main.classList.remove("bg-1");
                main.classList.add("bg-2");
            } else if (curbgiclass.indexOf("bg-2") != -1) {
                main.classList.remove("bg-2");
                main.classList.add("bg-1");
            }
        }
    });
}
//点击显示图片弹出框
imagebtn.onclick = function () {
    popbox("showPupbox", {
        type: "image",
        showclose: true,
        title: "大美女啊",
        url: "img/12.jpg"
    });
}
//点击显示表单弹出框
formbtn.onclick = function () {
    popbox("showPupbox", {
        type: "form",
        showclose: false,
        content: '<div>' +
            '<label>账号:</label>' +
            '<input type="text" placeholder="请输入账号" id="userId">' +
            '</div><div>' +
            '<label>密码:</label>' +
            '<input type="password" placeholder="请输入密码" id="userPwd"></div>',
        login: function () {
            //判断当前输入的账号和密码
            var id = document.getElementById("userId"),
                idVal = id.value;
            pwd = document.getElementById("userPwd"),
                pwdVal = pwd.value;
            if (idVal != "weiye" || pwdVal != "dashen") {
                if (idVal != "weiye") {
                    var errNode = id.parentElement.firstElementChild;
                    if (errNode.tagName.toLowerCase() == "p") {
                        return;
                    }
                    var errorNode = document.createElement("p"),
                        errorTxt = document.createTextNode("用户名输入错误,请仔细检查!");
                    errorNode.appendChild(errorTxt);
                    errorNode.setAttribute("class", "errinfo");
                    //当前div节点
                    var currentNode = id.parentElement;
                    //错误信息插入容器
                    var errorcurrent = currentNode.firstChild;
                    //在这行的div的开头插入错误信息
                    currentNode.insertBefore(errorNode, errorcurrent);

                }
                if (pwdVal != "dashen") {
                    var errNode = pwd.parentElement.firstElementChild;
                    if (errNode.tagName.toLowerCase() == "p") {
                        return;
                    }
                    var errorNode = document.createElement("p"),
                        errorTxt = document.createTextNode("密码输入错误,请仔细检查!");
                    errorNode.appendChild(errorTxt);
                    errorNode.setAttribute("class", "errinfo");
                    //当前div节点
                    var currentNode = pwd.parentElement;
                    //错误信息插入容器
                    var errorcurrent = currentNode.firstChild;
                    //在这行的div的开头插入错误信息
                    currentNode.insertBefore(errorNode, errorcurrent);
                }
                //清除错误信息
                id.onfocus = function () {
                    var errorNode = this.parentElement.firstElementChild;
                    if (errorNode.tagName.toLowerCase() == "p") {
                        errorNode.remove();
                        id.value = "";
                    }
                }
                pwd.onfocus = function () {
                    var errorNode = this.parentElement.firstElementChild;
                    if (errorNode.tagName.toLowerCase() == "p") {
                        errorNode.remove();
                        pwd.value = "";
                    }
                }
                return;
            }
            else {
                //获取main标签
                var main = document.getElementsByTagName("main")[0];
                //获取当前弹出框组件
                var popboxmain = document.getElementById("popbox-main");
                //调用关闭弹出框函数
                closePopbox(main, popboxmain);
            }
        }
    });
}
