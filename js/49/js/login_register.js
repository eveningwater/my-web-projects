
/**************功能:首页****************/
/**************作者:loho******************/
/**************日期:2017/2/28*************/
document.onreadystatechange = function() {
    // 该方法有4个状态
    // 1、uninitialized（还未开始载入）
    // 2、loading（载入中）
    // 3、interactive（已加载，文档与用户可以开始交互）
    // 4、complete（载入完成）
    if(document.readyState == "interactive") {
        /*变量定义部分*/
        //获取地区选择列表
        var seclist = document.getElementsByClassName("select_list ")[0],
            secAdd = document.getElementsByClassName("select_add")[0],
            secI = document.getElementsByClassName("seclect_i")[0],
            secSpan = seclist.getElementsByTagName("span");
        //获取主导航栏下的li与列表div元素
        var nav_li = document.getElementsByClassName("main_nav")[0].getElementsByTagName("li"),
            nav_a =document.getElementsByClassName("main_nav")[0].getElementsByClassName("nav_a"),
            nav_div =document.getElementsByClassName("main_nav")[0].getElementsByTagName("div");
        //获取logo返回首页
        var logobtn = document.getElementsByClassName("logo")[0];
        //获取登录按钮
        var loginbtn = document.getElementsByClassName("login")[0];
        /****************************************/
        /*函数定义部分*/
        /****************************************/
        /*地区列表展开*/
        //展开与隐藏列表
        //获取span的高度
        var spanH = secSpan.length * (window.getComputedStyle(secSpan[0]).lineHeight).slice(0,-2);
        secI.onclick = function(){
            seclist.style.height = spanH +'px';
        }
        //点击列表项
        for(var i = 0,sec_len=secSpan.length;i < sec_len;i++){
            secSpan[i].index = i;
            secSpan[i].onclick = function(){
                secI.textContent = secSpan[this.index].textContent;
                seclist.style.height = 0;
            }
        }
        secAdd.onmouseleave = function(){
            seclist.style.height = 0;
        }
        //主导航栏列表悬浮展开
        for(var j = 0,nav_li_len = nav_li.length;j < nav_li_len;j++){
            nav_li[j].index = j;
            nav_li[j].onmouseenter = function(){
                nav_div[this.index + 1].style.display="block";
            }
            nav_li[j].onmouseleave = function(){
                nav_div[this.index + 1].style.display="none";
            }
        }
        //点击logo返回首页
        logobtn.onclick = function(){
            //延迟400毫秒返回首页
            setTimeout(function(){    
             window.location.href ="../index.html";
            },400);
        }
        //点击loginbtn跳转到登录页面
        loginbtn.onclick = function(){
            //延迟300毫秒加载登录页面
            setTimeout(function(){
            window.location.href="../pages/login.html";
            },300);
        }
    }
}





















