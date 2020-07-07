/**************功能:注册****************/
/**************作者:loho******************/
/**************日期:2017/3/3*************/
/*变量定义部分*/
var regusername = document.getElementsByClassName("regUserName")[0],
    regpwd = document.getElementsByClassName("regPwd"),
    regbtn = document.getElementsByClassName("regbtn")[0],
    errorTxt = document.getElementsByClassName("Error");
/*用户名验证*/
regusername.oninput = function(){
    //验证正则表达式
    var usernameRegx=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if(usernameRegx.test(regusername.value)){
        errorTxt[0].style.visibility="hidden";
        //创建存储数组对象
        var username = regusername.value;
        //转换数组对象
        //存入数组对象
        localStorage.setItem("username",username);
    }
    else{
        errorTxt[0].style.visibility="visible";
    }
} 
/*密码验证*/
regpwd[0].oninput = function(){
    //验证正则表达式
    var pwdRegx =/^\w{6,20}$/;
    if(pwdRegx.test(regpwd[0].value)){
        errorTxt[1].style.visibility="hidden";
        //创建存储对象
        var password =regpwd[0].value;
        //存入数组对象
        localStorage.setItem("password",password);
    }
    else{
        errorTxt[1].style.visibility="visible";
    }
}
/*确认密码验证*/
regpwd[1].oninput = function(){
    if(regpwd[1].value == regpwd[0].value){
        errorTxt[2].style.visibility="hidden";
        regbtn.style.cssText="cursor:pointer;background-color:#82c353;";
        /*当邮箱号密码验证成功之后点击提交注册*/
        //判断当前注册按钮是否为禁用状态从而触发点击事件
        if(regbtn.style.cursor == "pointer"){
            for(var i =0,len = errorTxt.length;i < len;i++){
                var visStyle = window.getComputedStyle(errorTxt[i]).visibility;
                if(visStyle =="hidden"){
                    regbtn.onclick = function(){
                        /*alert("注册成功!");*/
                        //获取弹出框
                        var popbox = document.getElementsByClassName("popbox")[0],
                            txtsure = document.getElementsByClassName("txtSure")[0],
                            surebtn = document.getElementsByClassName("sureBtn")[0];
                        popbox.style.visibility="visible";
                        txtsure.textContent ="注册成功";
                        surebtn.onclick = function(){
                            //弹出框隐藏
                            popbox.style.visibility="hidden";
                            setTimeout(function(){
                                window.location.href="login.html";
                            },1000);
                        }
                    }
                }
            }
        }
    }
    else{
        errorTxt[2].style.visibility="visible";
        regbtn.style.cssText=`cursor:not-allowed;background-color:#838281;`;
        
    }
}











