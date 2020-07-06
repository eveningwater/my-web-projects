/**
 * 功能：登陆逻辑
 */
function loginLoad() {
    $('#login-btn').click(function () {
        var userName = $('#inputUserName').val(),
            passWord = $('#inputPassword').val();
        if (userName !== 'student') {
            createPopBox({
                title: "友情提示",
                content: "用户名输入不对!"
            });
        } else if (passWord !== '000000') {
            createPopBox({
                title: "友情提示",
                content: "密码输入不对!"
            });
        } else {
            //存储用户名和密码
            localStorage.setItem('userName', userName);
            localStorage.setItem('passWord', passWord);
            createPopBox({
                title: "友情提示",
                content: "登陆成功，1s后即将跳转到首页!",
            });
            setTimeout(function () {
                $('.ew-popbox-mask').fadeOut(600);
                window.location.href = "./pages/resume.html";
            }, 1000)
        }
    })
}
/**
 * 功能:页面加载时调用函数
 */
window.onload = function () {
    loginLoad();
    //实例化雪花效果
    var snow = new ewSnow(document.getElementById('login-page'));
    snow.init();
}