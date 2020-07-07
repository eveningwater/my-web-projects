/**
* 功能：一些公共的功能
* 最后修改日期：2016年6月22日
* 开发人员：全组
**/
/******************************************/
/* 页面加载完成后执行 */
/******************************************/
$(function() {
    // 主题列表--单选按钮效果
    listRadio(".payli li i.radio");
    // 主题列表--复选按钮效果
    listCheckbox(".leftSlipBtnCkbli li i.checkbox");
    // 主题列表--订单列表数量设置
    countListNum(".orderli");
    // 返回上一页
    $(".header > a.goBack").click(function() {
        history.go(-1);
    });
    // 返回主页
    $(".header > a.goHome").click(function() {
        /**** 本地测试使用 ****/
        // 跳转到主页
        location.href="../../index.html";
        /**** 生产环境内使用 ****/
        /*function getRootPath(){
            //获取当前网址
            var curWwwPath=window.document.location.href;
            // 获取主机地址之后的目录
            var pathName=window.document.location.pathname;
            var pos=curWwwPath.indexOf(pathName);
            // 获取主机地址
            var localhostPaht=curWwwPath.substring(0,pos);
            // 获取带"/"的项目名，如：/angel
            //var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
            //return(localhostPaht+projectName);
            return(localhostPaht);
        }
        // 跳转根目录下的index主页
        location.href=location.href=getRootPath()+ "/index.html";*/
    });
    // 点击展开预约时间详细列表
    toggleDetailsList(".toggleDetailsList");
});

/******************************************/
/* 函数定义部分 */
/******************************************/
/**
* 功能：主题列表--单选按钮 
* 参数：图形单选按钮的选择符
**/
function listRadio(rdoIdent) {
    $(document).off("click", rdoIdent).on("click", rdoIdent, function() {
        // 选中的状态
        var ckd = $(this).hasClass("checked");
        // 如果没有选中
        if(!ckd) {
            // 使其选中
            $(this).addClass("checked").next("input[type='radio']").attr("checked","checked");
            // 消除其它被选中的效果
            $(this).parent("li").siblings().children("i.radio").removeClass("checked").next("input[type='radio']").removeAttr("checked");
        }
        // 如果选中
        else {
            // 目前什么都不做
        }
    });
}
/**
* 功能：主题列表--复选按钮 
* 参数：图形复选按钮的选择符
**/
function listCheckbox(ckbIdent) {
    $(document).off("click", ckbIdent).on("click", ckbIdent, function() {
        // 选中的状态
        var ckd = $(this).hasClass("checked");
        // 如果没有选中
        if(!ckd) {
            // 使其选中
            $(this).addClass("checked").next("input[type='checkbox']").attr("checked","checked");
        }
        // 如果选中
        else {
            // 取消选中
            $(this).removeClass("checked").next("input[type='checkbox']").removeAttr("checked");
        }
    });
}
/**
* 功能：主题列表--向左滑动出现按钮 
* 参数：列表的标志符
**/
function slipBtnLeft(liIdent) {}

/**
* 功能：主题列表--订单列表数量设置
* 参数：列表的标志符
**/
function countListNum(liIdent) {
    /* 点击“-”时 */
    $(document).on("click", liIdent + " .count i:first-child", function() {
        // 获取数量
        var num = parseInt($(this).next().text());
        if(num == "1") {
            $(this).addClass("disabled");
        } 
        else if(num == 0) {
            return;
        }
        num = num - 1;
        $(this).next().text(num);
    });
    /* 点击“+”时 */
    $(document).on("click", liIdent + " .count i:last-child", function() {
        // 获取数量
        var num = parseInt($(this).prev().text());
        if(num == "0") {
            $(this).prevAll("i").removeClass("disabled");
        } 
        num = num + 1;
        $(this).prev().text(num);
    });
}
/**
* 功能：点击按钮显示/隐藏详细列表功能
* 参数：按钮选择符(需定位到和要展开的列表同级)
**/
function toggleDetailsList(btnIdent) {
    $(document).on("click", btnIdent, function() {
        $(btnIdent).parents("ul").next().slideToggle(100);
        // 获取箭头状态
        var isRightArr = !($(btnIdent).find(".arrRight").hasClass("arrDown"));
        if(isRightArr) {
            // 改变箭头为向下状态
            $(btnIdent).find(".arrRight").addClass("arrDown");
        }
        else {
            // 恢复箭头向右的状态
            $(btnIdent).find(".arrRight").removeClass("arrDown");
        }
    });
}





