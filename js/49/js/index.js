
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
        //获取中间内容
        var content = document.getElementsByClassName("content")[0];
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
                window.location.href ="index.html";
            },400);
        }
        //点击loginbtn跳转到登录页面
        loginbtn.onclick = function(){
            //延迟300毫秒加载登录页面
            setTimeout(function(){
                window.location.href="pages/login.html";
            },300);
        }
        /*为中间页面添加内容*/
        //定义一个字符串存储标签
        var str = "";
        str +=`<!--首页标题--><h1 class="home_h1"></h1><!--主要内容-图文链接区--><div class="dpi-1240"><!--第一行--><div class="imgLink-area"><!--第一列--><div class="img_cols-sd slideList"><!--图像幻灯片--><img src="img/example_1.jpg" alt="0" title="0" class="show"><img src="img/example_2.jpg" alt="1" title="1"><img src="img/example_3.jpg" alt="2" title="2"><img src="img/example_4.jpg" alt="3" title="3"><!--幻灯片圆点--><span class="checked"></span><span></span><span></span><span></span></div><!--第二列--><div class="img_cols-ss ml-38"><img src="img/example_0.jpg" alt="1" title="1"></div></div><!--第二行--><div class="imgLink-area mt-38"><!--第一列--><div class="img_cols-ds"><div class="img_cols-ss"><img src="img/example_0.jpg" alt="0" title="0"></div><div class="img_cols-ss mt-38"><img src="img/example_0.jpg" alt="0" title="0"></div></div><!--第二列--><div class="img_cols-ds ml-38"><img src="img/example_5.jpg" alt="2" title="2"></div><!--第三列--><div class="img_cols-ds ml-38"><div class="img_cols-ss"><img src="img/example_0.jpg" alt="0" title="0"></div><div class="img_cols-ss mt-38"><img src="img/example_0.jpg" alt="0" title="0"></div></div></div><!--第三行--><div class="imgLink-area mt-38"><!--第一列--><div class="img_cols-ss"><iframe class="imgIframe" src="http://image.baidu.com/"></iframe></div><!--第二列--><div class="img_cols-sd ml-38"><img src="img/example_6.jpg" alt="6" title="6"></div></div></div>`;
        //将字符串存进页面中间容器中
        content.innerHTML = str;
        //判断中间页面内容是否存在从而调用幻灯片播放函数
        if(content.innerHTML == str){
            imgAutoplay();
        }
        //中间内容幻灯片图像播放
        function imgAutoplay(){
            //获取图像幻灯片相关元素
            var imgLinkImg = document.getElementsByClassName("slideList")[0].getElementsByTagName("img"),
                imgLinkSpan = document.getElementsByClassName("slideList")[0].getElementsByTagName("span");
            //定义计数器
            var count = 0;
            function setIntPlay(num){  
                //图像定时切换
                if(num >= 0 && num < imgLinkImg.length){
                    count = num;
                }else{  
                   count++;
                }
                for(var k = 0,img_len =imgLinkImg.length;k < img_len;k++){
                    imgLinkImg[k].setAttribute("class","");
                    imgLinkSpan[k].setAttribute("class","");
                    imgLinkSpan[k].style.cssText="none";
                }
                if(count > img_len - 1){
                    count = 0;
                }
                imgLinkImg[count].setAttribute("class","show");
                imgLinkSpan[count].style.cssText="background-color:#fff";
            }
            for(var k = 0,imgLinkSpan_len = imgLinkSpan.length;k < imgLinkSpan_len;k++){
                imgLinkSpan[k].index = k;
                imgLinkSpan[k].onclick = function(){
                    setIntPlay(this.index);
                }
            }
            //定时开始幻灯片播放
                var timer = setInterval(function(){
                    setIntPlay();
                },5000);
        }
    }
}





















