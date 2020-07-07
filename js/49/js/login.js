/**************功能:登录****************/
/**************作者:loho******************/
/**************日期:2017/3/3*************/
/*变量定义部分*/
var username = document.getElementsByClassName("userName")[0],
    pwd = document.getElementsByClassName("userPwd")[0],
    errortxtuser = document.getElementsByClassName("erruser")[0],
    errortxtpwd = document.getElementsByClassName("errpwd")[0],
    loginbtn = document.getElementsByClassName("loginBtn")[0];
/*输入邮箱号与注册邮箱号匹配*/
username.oninput = function(){
    var userVal = username.value;
    if(userVal == localStorage.getItem("username")){
        errortxtuser.style.visibility="hidden";
    }else{
        errortxtuser.style.visibility="visible";
    }
}
/*输入密码与注册密码匹配*/
pwd.oninput = function(){
    var pwdVal = pwd.value;
    if(pwdVal == localStorage.getItem("password")){
        errortxtpwd.style.visibility="hidden";
        loginbtn.style.cssText="cursor:pointer;background-color:#82c353;";
        /*登录成功后跳转页面*/
        //判断当前登录按钮是否禁用从而触发点击事件
        if(loginbtn.style.cursor="pointer"){
            loginbtn.onclick = function(){
                //获取弹出框
                var popbox = document.getElementsByClassName("popbox")[0],
                    txtsure = document.getElementsByClassName("txtSure")[0],
                    surebtn = document.getElementsByClassName("sureBtn")[0];
                popbox.style.visibility="visible";
                txtsure.textContent ="登录成功";
                //确认按钮点击事件
                surebtn.onclick = function(){
                    //弹出框隐藏
                    popbox.style.visibility="hidden";
                    maincontent.innerHTML =`<!--首页标题--><h1 class="home_h1"></h1><!--主要内容-图文链接区--><div class="dpi-1240">
                    <!--第一行--><div class="imgLink-area"><!--第一列--><div class="img_cols-sd slideList"><!--图像幻灯片--><img src="img/example_1.jpg" alt="0" title="0" class="show"><img src="img/example_2.jpg" alt="1" title="1"><img src="img/example_3.jpg" alt="2" title="2"><img src="img/example_4.jpg" alt="3" title="3"><!--幻灯片圆点--><span class="checked"></span><span></span><span></span><span></span></div><!--第二列--><div class="img_cols-ss ml-38"><img src="img/example_0.jpg" alt="1" title="1"></div></div><!--第二行--><div class="imgLink-area mt-38"><!--第一列--><div class="img_cols-ds"><div class="img_cols-ss"><img src="img/example_0.jpg" alt="0" title="0"></div><div class="img_cols-ss mt-38"><img src="img/example_0.jpg" alt="0" title="0"></div></div><!--第二列--><div class="img_cols-ds ml-38"><img src="img/example_5.jpg" alt="2" title="2"></div><!--第三列--><div class="img_cols-ds ml-38"><div class="img_cols-ss"><img src="img/example_0.jpg" alt="0" title="0"></div><div class="img_cols-ss mt-38"><img src="img/example_0.jpg" alt="0" title="0"></div></div></div><!--第三行--><div class="imgLink-area mt-38"><!--第一列--><div class="img_cols-ss"><iframe class="imgIframe" src="http://image.baidu.com/"></iframe></div><!--第二列--><div class="img_cols-sd ml-38"><img src="img/example_6.jpg" alt="6" title="6"></div></div></div>`;
                    //获取登录用户名按钮
                    var login = document.getElementsByClassName("loginOrShop")[0].getElementsByClassName("login")[0];
                    //获取购物车宝贝数量
                    var trea_count = document.getElementsByClassName("trea_count")[0];
                    //获取购物车按钮
                    var shoppingcar = document.getElementsByClassName("shoppingCar")[0];
                    //获取购物车内容
                    var treas_brief = document.getElementsByClassName("treas_brief")[0];
                    //获取购物车内容文本部分
                    var treas_content= document.getElementsByClassName("treas_brief-content")[0];
                    //将存储在本地的邮箱号获取到
                    var usernameStr =localStorage.getItem("username").slice(0,localStorage.getItem("username").lastIndexOf("\@"));
                    //邮箱号前半部分作为用户名从而替换登录按钮图片背景
                    login.innerHTML = usernameStr;
                    //为span添加css样式
                    var pesnName=document.getElementsByClassName("pesnName")[0];  pesnName.style.cssText=`position:relative;top:-10px;line-height:30px;height:30px;display:inline-block;`;
                    login.style.cssText=`color:#666;background:none;width:auto;`;
                    //购物车宝贝数量显示,默认为0
                    trea_count.style.display="block";
                    //点击购物车按钮事件
                    var count = 0;
                    shoppingcar.onclick = function(){
                        count++;
                        if(count % 2==1){
                            treas_brief.style.visibility="visible";
                            shoppingcar.style.cssText=`border:1px solid #ccc;border-bottom:none;background-color:#fff;`;
                            treas_content.innerHTML=`<p>你当前购物车里没有东西(⊙﹏⊙)</p>`;
                        }
                        else{
                            treas_brief.style.visibility="hidden";
                            shoppingcar.style.border="none";
                            shoppingcar.style.backgroundColor="transparent";
                        }
                    }
                    //点击登录事件
                    login.onclick = function(){
                        //延迟1秒跳转到百度
                        setTimeout(function(){
                            window.location.href="../pages/404.html";
                        },1000);
                    }
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
    }
    else{
        errortxtpwd.style.visibility="visible";
        loginbtn.style.cssText=`cursor:not-allowed;background-color:#838281;`;
    }
}

