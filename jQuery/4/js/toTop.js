/**
 * 功能：显示回到顶部按钮的条件
 */
function mainScroll(){
    $('.main').scroll(function () {
        var top = $(this).scrollTop();
        var height = $(this).find('section').height();
        if (top >= height) {
            $('.toTop').fadeIn(600);
        } else {
            $('.toTop').fadeOut(600);
        }
    })
}
/**
 * 功能：点击回到顶部
 */
function clickToTop(){
    $('.toTop').click(function(){
        $('.main').animate({scrollTop:0},600);
    })
}
/**
 * 功能:页面加载时调用函数
 */
$(document).ready(function(){
    mainScroll();
    clickToTop();
})