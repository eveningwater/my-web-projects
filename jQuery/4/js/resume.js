/**
 * 功能:页面加载时运行
 */
$(document).ready(function(){
    clickFoldMenu();
    clickLeftNav();
})
/**
 * 功能:点击折叠按钮
 */
function clickFoldMenu(){
    var flag = false;
    $('.fold-menu').click(function(){
        flag = !flag;
        if(flag){
            $('.left-menu').animate({
                width:0
            })
            $(this).animate({
                left:0
            })
            $('.main').css({
                width: '100%',
                marginLeft: 0
            })
        }else{
            $('.left-menu').animate({
                width:'250px'
            })
            $(this).animate({
                left:'252px'
            })
            $('.main').css({
                width: 'calc(100% - 250px)',
                marginLeft: '250px'
            })
        }
    })
}
/**
 * 功能:点击左半部分导航
 */
function clickLeftNav(){
    $('.left-nav').find('div').click(function(){
        $(this).addClass('left-nav-active').siblings().removeClass('left-nav-active');
        var top = $('#' + $(this).attr('data-option')).offset().top - 35;
        // console.log(top)
        $('.main').animate({ scrollTop:top },600);
    })
}
