/**
* 功能：控制示例文件
* 最后修改日期：2016年6月22日
* 开发人员：魏叶
**/
/******************************************/
/* 页面加载完成后执行 */
/******************************************/
$(function() {
    /* 显示隐藏导航菜单 */
    $(".navBtn").click(function() {
        navSecition(this);
    });
    /* 选择锚点后关闭 */
    $(".navWin").click(function() {
        $(this).slideUp(150);
    });
    /* 鼠标移开导航栏后关闭 */
    $("nav").mouseleave(function() {
        $(this).children(".navWin").slideUp(150);
    });
    /* 导航栏的滚动透明度改变 */
    $(document).scroll(function() {
        scrollOpacity();
    });
    /* 切换明文/密码 */
    $("#switchPwd").click(function() {
        switchPwdOrTxt(this);
    });
});

/******************************************/
/* 函数定义部分 */
/******************************************/
/* 示例导航选择 */
function navSecition(ele) {
    var navWin = $(".navWin");
    navWin.slideToggle(100);
    $(ele).parent().toggleClass("");
}
/* 导航随着滚动条的透明度改变 */
function scrollOpacity() {
    // 获取滚动条距离顶部的距离
    var st = $(window).scrollTop();
    if(st > 70) {
        $("nav").css("opacity", "0.2");
        $("nav").mouseenter(function() {
            $(this).css("opacity", "1.0");
        });
        $("nav").mouseleave(function() {
            $(this).css("opacity", "0.2");
        });
    }
    else {
        $("nav").css("opacity", "1.0");
        $("nav").mouseenter(function() {
            $(this).css("opacity", "1.0");
        });
        $("nav").mouseleave(function() {
            $(this).css("opacity", "1.0");
        });
    }
}
/* 切换密码/明文 */
function switchPwdOrTxt(btnID) {
    // 如果是密码框
    var isPwd = ($(btnID).prev().children("input").attr("type")) == "password";
    if(isPwd) {
        // 切换为文本框
        $(btnID).text("隐藏");
        $(btnID).prev().children("input").attr("type", "text");
    }
    else {
        // 切换为密码框
        $(btnID).text("显示");
        $(btnID).prev().children("input").attr("type", "password");
    }
}