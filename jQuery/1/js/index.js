/**************功能:备忘录****************/
/**************作者:eveningwater*********/
/**************日期:2017/3/21************/
/***************************************/
/*全局变量定义*/
/***************************************/
"use strict";
var GLOBAL = {
    /*载入动画*/
    loadingAnimate: '<div class="loading"><div class="memo-loading"></div><div class="loading-dot"><span></span><span></span><span></span></div></div>',
    removeLoadingAnimate: function () {
        $(".content").children(".loading").remove();
    }
};
var CHECKED_ICON = `<svg t="1702382629512" class="checked-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2321"><path d="M969.6 208c-9.6-9.6-25.6-9.6-35.2 0l-508.8 537.6c-19.2 19.2-48 19.2-70.4 3.2l-265.6-252.8c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l265.6 252.8c38.4 38.4 102.4 35.2 137.6-3.2l508.8-537.6C979.2 233.6 979.2 217.6 969.6 208z" p-id="2322"></path></svg>`
/***************************************/
/*页面加载时运行*/
/***************************************/
$(function () {
    //初始加载页面
    loadBody("pages/main-page.html");
});
/**
 * 页面操作
 * @param {*} url 
 */
function loadBody(url) {
    $.get(url, function (rqbody) {
        $("body").html(GLOBAL.loadingAnimate);
        setTimeout(function () {
            $("body").html(rqbody);
            //加载完成后延迟处理页面常用逻辑,参数1毫秒
            setTimeout(function () {
                new mainPageHandle({
                    topEditButton: $("#topEdit"),
                    footerEditButton: $("#footerHandle"),
                    backButton: $("#back")
                });
            }, 1);
        }, 1000);
    });
}
/**
 * 页面主要逻辑
 * @param {*} options 
 */
function mainPageHandle(options) {
    this.init(options);
}
/**
 * 初始化
 */
mainPageHandle.prototype.init = function (options) {
    options.data = localStorage.getItem('memoData');
    const vm = this;
    // 点击底部的编辑按钮
    options.footerEditButton.off('click').click(function (e) {
        e.stopPropagation();
        //首页隐藏编辑页面显示
        if ($(this).hasClass('footerEdit')) {
            reset();
            changePage([{ el: $('.main-page'), show: false }, { el: $('.edit-page'), show: true }]);
            //保存按钮禁用
            $(".topKeep").attr("disabled", true).addClass("disabled");
        } else {
            let _data = options.data ? JSON.parse(options.data) : [];
            if (_data.length) {
                for (let i = 0, len = $('.main-content .checked').length; i < len; i++) {
                    const id = $(".main-content .checked").eq(i).siblings('div').attr('data-id');
                    const deleteIndex = _data.findIndex((item) => { return item.id === Number(id) });
                    if (deleteIndex > -1) {
                        _data.splice(deleteIndex, 1);
                    }
                }
            }
            localStorage.setItem('memoData', JSON.stringify(_data));
            if ($(".main-content").length <= 0) {
                $(this).removeClass('footerDelete').addClass('footerEdit');
            }
            vm.init(options);
        }
    });
    // 点击返回
    options.backButton.on('click', function () {
        reset(options);
        //编辑页面隐藏首页显示
        changePage([{ el: $('.main-page'), show: true }, { el: $('.edit-page'), show: false }]);
    });
    $('#footerEdit').click(function () {
        //首先清空内容，然后将页面设为可编辑状态
        $(".edit-page main").text("").attr('contentEditable', true).focus().addClass("content");
        //保存按钮取消禁用样式
        $(".topKeep").removeClass("disabled").attr('disabled', false).off('click').off('click').on('click', function () {
            //获取输入内容
            var data = $(".edit-page .content").text();
            if (!data) {
                console.warn('不能为空');
                return;
            }
            var keepData = options.data ? JSON.parse(options.data) : [];
            var index = keepData.length > 0 ? Number(keepData[keepData.length - 1].id) + 1 : 1;
            keepData.push({
                "id": index,
                "content": data,
                "time": nowDate()
            });
            //存储本地数据
            localStorage.setItem('memoData', JSON.stringify(keepData));
            $(".topKeep").attr("disabled", true).addClass("disabled");
            changePage([{ el: $('.main-page'), show: true }, { el: $('.edit-page'), show: false }]);
            vm.init(options);
        });
    })
    this.loadData(options);
}
/**
 * 加载数据
 */
mainPageHandle.prototype.loadData = function (options) {
    //获取本地存储对象
    let memoData = options.data;
    if (memoData) {
        memoData = JSON.parse(memoData);
        $(".main-page main").empty();
        //遍历对象
        $.each(memoData, function (_, item) {
            //向页面添加元素
            $(".main-page main").append("<div class=\"main-content\"><div data-id=" + item.id + "><p>" + item.content + "</p><p>" + item.time + "</p></div></div>");
        });
        /**
        * 如果页面存在数据
        */
        if ($(".main-content").length !== 0) {
            resetShow(options, false);
            options.topEditButton.attr("disabled", false).removeClass("disabled");
            let isDelete = false;
            // 点击编辑
            options.topEditButton.off('click').on('click', function () {
                isDelete = !isDelete;
                resetShow(options, isDelete);
                $(".main-content i").click(function () {
                    //点击选中
                    $(this).toggleClass('checked');
                    $(this).html($(this).hasClass('checked') ? CHECKED_ICON : '');
                    $("header h1 .number").text($(".main-content .checked").length);
                });
            });
        } else {
            reset(options);
            options.topEditButton.attr("disabled", true).addClass("disabled");
            resetShow(options, false);
        }
    } else {
        reset(options);
        options.topEditButton.attr("disabled", true).addClass("disabled");
        resetShow(options, false);
    }
}
/**
 * 界面显示的重置
 * @param {*} options 
 * @param {*} bool 
 */
function resetShow(options, bool) {
    if (bool) {
        $("header h1").html("已选中<span class=\"number\">0</span>项");
        options.topEditButton.text("取消");
        $(".main-content").append("<i></i>");
        options.footerEditButton.addClass("footerDelete").removeClass('footerEdit');
    } else {
        $(".main-content i").remove();
        $("header h1").html('备忘录');
        options.topEditButton.text("编辑");
        options.footerEditButton.removeClass("footerDelete").addClass('footerEdit');
    }
    $("footer h1 .number").text($(".main-content").length);
}
/**
 * 页面的切换
 * @param {*} elements 
 */
function changePage(elements) {
    const optionHide = {
        'width': '0',
        'height': '0',
        'left': '-100%'
    };
    const optionShow = {
        'width': '100%',
        'height': '100%',
        'left': '0%'
    };
    if (Array.isArray(elements)) {
        elements.forEach((item) => {
            const option = item.show ? optionShow : optionHide;
            item.el.animate(option);
        });
    }
}
/**
 * 当前日期
 */
function nowDate() {
    var date = new Date();
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes();
    // 处理日期时间的位数
    month = String(month).length === 1 ? "0" + month : month;
    day = String(day).length === 1 ? "0" + day : day;
    hour = String(hour).length === 1 ? "0" + hour : hour;
    minute = String(minute).length === 1 ? "0" + minute : minute;
    //拼接日期
    return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}
/**
 * 重置界面样式
 */
function reset() {
    //向页面添加内容再将页面设为不可编辑状态并取消css样式
    $(".edit-page main").html("<p>点击下方编辑之后，请在这里输入你想要输入的内容!</p>").attr('contentEditable', false);
}
