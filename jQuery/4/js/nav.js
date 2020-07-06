/**
 * 功能:点击胶囊导航函数
 */
function clickNav() {
    $('.nav li').click(function (e) {
        e.preventDefault();
        $(this).addClass('nav-active').siblings('li').removeClass('nav-active');
        switch ($(this).index()) {
            case 0:
                location.href = './resume.html';
                break;
            case 1:
                location.href = './schedule.html';
                break;
            case 2:
                location.href = './reader.html';
                break;
        }
    })
}
/**
 * 功能:页面加载时调用函数
 */
$(document).ready(function () {
    clickNav();
})