/**************功能:主导航栏页面****************/
/**************作者:loho******************/
/**************日期:2017/3/2*************/
/*变量定义部分*/
//获取页面主导航栏超链接
var nav_a = document.getElementsByClassName("nav_a"),
    nav_a_len = nav_a.length;
//获取页面主要中间内容
var maincontent = document.getElementsByClassName("content")[0];
//点击事件
for(var i = 0;i < nav_a_len;i++){
    nav_a[i].index = i;
    nav_a[i].onclick = function(){
        //定义一个字符串存储
        var str ="";
        str +=`<!--分类banner--><div class="classify_banner"><h1></h1><!--子导航--><ul class="subnav"></ul></div><!--分类筛选--><div class="classifyFilter"><div><a class="filter">材质</a><ul><li>实木</li><li>其它</li></ul>  </div><div><a class="filter">成色</a><ul><li>9成新以上</li><li>7-9成新</li><li>5-7成新</li><li>其它</li></ul></div><div><a class="filter">价格</a><ul><li>从低到高</li><li>从高到低</li></ul></div></div><!--商品选择--><div class="goodsChoose"><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName"></span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName"></span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName"></span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName"></span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName"></span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName"></span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName"></span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName"></span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a></div>`;
        maincontent.innerHTML = str;
        var ul=document.getElementsByClassName("subnav")[0],
            h1 = document.getElementsByClassName("classify_banner")[0].getElementsByTagName("h1")[0],
            spanTxt = document.getElementsByClassName("goodsName");
        if(this.index == 0){
            ul.innerHTML +=`<li><a href="#">全部</a></li><li><a href="#">单人位</a></li><li><a href="#">双人位</a></li><li><a href="#">三人位</a></li><li><a href="#">休闲沙发</a></li><li><a href="#">转角沙发</a></li>`;
            h1.innerHTML = "沙发&nbsp;&nbsp;&nbsp;&nbsp;SOFAS";
            //获取li元素
            var li = ul.getElementsByTagName("li");
            for(var j =0,li_len = li.length;j < li_len;j++){
                spanTxt[j].innerHTML ="沙发";
                li[j].style.cssText ="margin-left:55px;";
            }
            //获取超链接
            var a_btn = document.getElementsByClassName("goodsChoose")[0].getElementsByTagName("a")[0];
            a_btn.onclick = function(){ 
                //定义一个字符串接收
                var mainstr ="";
                mainstr +=`<!--商品展示购买信息--><div class="goodsBuyInfo"><!--商品图展示--><div class="goodsShowImg"><!--主展示图--><div class="mainImg"><ul><li class="showImg"><img src="img/example_7.jpg" alt="图片加载中"></li><li><img src="img/example_8.jpg" alt="图片加载中"></li><li><img src="img/example_9.jpg" alt="图片加载中"></li><li><img src="img/example_10.jpg" alt="图片加载中"></li><li><img src="img/example_11.jpg" alt="图片加载中"></li><li><img src="img/example_11.jpg" alt="图片加载中"></li></ul></div><!--缩略图部分--><div class="thumbnail"><ul><li class="selectImg"><img src="img/example_7.jpg" alt="图片加载中"></li><li><img src="img/example_8.jpg" alt="图片加载中"></li><li><img src="img/example_9.jpg" alt="图片加载中"></li><li><img src="img/example_10.jpg" alt="图片加载中"></li><li><img src="img/example_11.jpg" alt="图片加载中"></li><li><img src="img/example_11.jpg" alt="图片加载中"></li></ul></div></div><!--购买信息--><div class="goodsBuy"><!--商品名称及筛选--><div class="goodsName"><h1>沙发</h1><p><span>三人位</span><span>9成新以上</span></p></div><!--商品价格--><div class="goodsPrice"><!--原始价格--><div class="origPrice"><span class="rmbsign">￥</span><span class="rmbnum">680</span><span class="rmbyuan">元</span><!--价格删除线--><span class="deloldPrice"></span></div><!--新价格--><div class="newPrice"><span class="rmbsign">￥</span><span class="rmbnum">580</span><span class="rmbyuan">元</span><!--价格删除线--><span class="deloldPrice"></span></div></div><!--购买动态信息--><div class="goodsDynamic"><div class="origBuyPrice"><label>原始购买价格:</label><span class="rmbnum">2558</span>元</div><div class="score"><label>积分:</label><span>6.8</span><a href="#">了解积分规则</a></div><div class="inventory"><label>库存数量:</label><span>5</span></div></div><!--商品购买操作--><div class="goodsBuyCtrl"><!--数量设置--><div class="countSet"><input type="text" value="0"><div class="countSetArea"><a class="plus">+</a><a class="minus disabled">-</a></div></div><button type="button" class="immedBuy">立即购买</button><button type="button" class="shopcar">加入购物车</button></div><!--在线客服--><div class="onlineServer"><button type="button"></button></div><!--户里服务--><div class="huliServer"><p><label>户里服务：</label><span>该商品在仓库，23点前完成下单可在后天（5月15日）送达/该商品在用户家中，23点前完成下单，可在（5天后）送达</span></p></div></div></div><!--商品规格--><div class="goodsStyle"><h1 class="classifyHeader">商品规格</h1><div class="goodsSize"><label>尺寸：</label><span>1260*760*560mm</span></div><div class="goodsTexture"><label>材质：</label><span>实木/布艺</span></div><div class="goodsColor"><label>颜色：</label><span>亚麻色</span></div></div><!--商品详情--><div class="goodsDetail"><h1 class="classifyHeader">商品详情</h1><div class="detailsContent"></div></div><!--送货--><div class="goodsDeliver"><h1 class="classifyHeader">送货</h1><div class="deliverAddr">成都市绕城内满699元可享受免费送货政策，未满金额或者绕城外地区收取99元运费。</div></div><!--推荐商品--><div class="goodsRecom"><h1 class="classifyHeader">推荐商品</h1><div class="recomList"><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName">商品名称</span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName">商品名称</span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a><a href="#"><div class="goodsImg"><img src="img/example_0.jpg" alt="图片加载中"></div><div class="goodsBaseInfo"><span class="goodsName">商品名称</span><span class="goodsPrice"><span class="oldPrice"><span>￥580</span><span class="deloldPrice"></span></span><span class="newPrice"><span>￥480</span></span></span></div></a></div></div>`;
                maincontent.innerHTML = mainstr;
                /*点击缩略图切换图片*/
                function  imgPlay(){
                    //获取缩量图与主要展示图
                    var imglibtn = document.getElementsByClassName("thumbnail")[0].getElementsByTagName("li"),
                        mainimg = document.getElementsByClassName("mainImg")[0].getElementsByTagName("img");
                    for(var k = 0,len = imglibtn.length;k < len;k++){
                        imglibtn[k].index = k;
                        imglibtn[k].onclick = function(){
                            for(var k = 0,len = imglibtn.length;k < len;k++){
                                mainimg[k].style.display ="none";
                                imglibtn[k].classList.remove("selectImg");
                            }
                            mainimg[this.index].style.display ="block";
                            imglibtn[this.index].classList.add("selectImg");
                        }

                    }
                }
                imgPlay();
                /*库存数量事件*/
                function  countFun(){
                    //获取库存数量相关变量
                    var countVentNum = document.getElementsByClassName("inventory")[0].getElementsByTagName("span")[0],
                        countInput = document.getElementsByClassName("countSet")[0].getElementsByTagName("input")[0],
                        plusbtn = document.getElementsByClassName("countSetArea")[0].getElementsByClassName("plus")[0],
                        minusbtn = document.getElementsByClassName("countSetArea")[0].getElementsByClassName("minus")[0];
                    //点击加号增加数量
                    plusbtn.onclick = function(){
                        var num = countInput.value;
                        for(var i = 0,len = Number(countVentNum.textContent);i < len;i++){ 
                            countInput.value = Number(num) + 1;
                            /*console.log(num);*/
                        }
                        minusbtn.style.cursor="pointer";
                        if(Number(countInput.value) > Number(countVentNum.textContent)){
                            plusbtn.style.cursor="not-allowed";
                            plusbtn.classList.add("disabled");
                            minusbtn.classList.remove("disabled");
                            countInput.value = Number(countVentNum.textContent);
                        }
                    }
                    //点击减号减少数量
                    minusbtn.onclick = function(){
                        var num = countInput.value;
                        for(var i = 0,len = Number(countVentNum.textContent);i < len;i++){ 
                            countInput.value = Number(num) - 1;
                            /*console.log(num);*/
                        }
                        plusbtn.style.cursor="pointer";
                        if(Number(countInput.value) <= 0){
                            minusbtn.style.cursor="not-allowed";
                            minusbtn.classList.add("disabled");
                            plusbtn.classList.remove("disabled");
                            countInput.value = 0;
                        }
                    }
                    //输入数量
                    countInput.oninput = function(){
                        var num = countInput.value;
                        var regx =/\d/g;
                        if(regx.test(num)){
                            if(Number(num) > Number(countVentNum.textContent)){
                                countInput.value = Number(countVentNum.textContent);
                            }
                            else if(Number(num) <= 0){
                                countInput.value = 0;
                            }
                            else{
                                return;
                            }
                        }
                        else{
                            //获取弹出框
                            var popbox = document.getElementsByClassName("popbox")[0],
                                txtsure = document.getElementsByClassName("txtSure")[0],
                                surebtn = document.getElementsByClassName("sureBtn")[0];
                            popbox.style.visibility="visible";
                            txtsure.textContent="输入有误";
                            surebtn.onclick= function(){
                                //弹出框隐藏
                                popbox.style.visibility="hidden";
                                countInput.value = 0;
                            }
                        }
                    }
                    //失去焦点
                    countInput.onblur = function(){
                        if(countInput.value == ""){    
                            countInput.value = 0;
                        }
                        else{
                            return;
                        }
                    }
                }
                countFun();
            }
        }
        else if(this.index == 1){
            ul.innerHTML +=` <li><a href="#">全部</a></li><li><a href="#">餐桌</a></li><li><a href="#">书桌</a></li><li><a href="#">电脑桌</a></li><li><a href="#">梳妆台</a></li><li><a href="#">餐椅</a></li><li><a href="#">凳子</a></li><li><a href="#">休闲椅</a></li><li><a href="#">户外椅</a></li><li><a href="#">其它</a></li>`;
            ul.style.cssText =`left:-25px;width:97%;`;
            h1.innerHTML = "桌椅&nbsp;&nbsp;&nbsp;&nbsp;TABLES/CHAIRS";
            var li = ul.getElementsByTagName("li");
            for(var j =0,li_len = li.length;j < li_len;j++){
                spanTxt[j].innerHTML ="桌椅";
                li[j].style.cssText =`width:100px;margin-left:8px;`;
                li[j + 2].style.cssText =`width:100px;margin-left:5px;`;
            } 
        }
        else if(this.index == 2){
            ul.innerHTML +=`<li><a href="#">全部</a></li><li><a href="#">1.5M床</a></li><li><a href="#">1.8M床</a></li><li><a href="#">其它</a></li>`;
            h1.innerHTML ="床&nbsp;&nbsp;&nbsp;&nbsp;BEDS";
            var li = ul.getElementsByTagName("li");
            for(var j =0,li_len = li.length;j < li_len;j++){
                spanTxt[j].innerHTML ="床";
                spanTxt[j + 4].innerHTML ="床";
                li[j].style.cssText =`width:156px;margin-left:85px;`;
            } 
        }
        else if(this.index == 3){
            ul.innerHTML +=`<li><a href="#">全部</a></li><li><a href="#">衣柜</a></li><li><a href="#">储物柜</a></li><li><a href="#">电视柜</a></li><li><a href="#">书柜</a></li><li><a href="#">鞋柜</a></li><li><a href="#">床头柜</a></li><li><a href="#">其它</a></li>`;
            h1.innerHTML ="柜&nbsp;&nbsp;&nbsp;&nbsp;STORAGE";
            var li = ul.getElementsByTagName("li");
            for(var j =0,li_len = li.length;j < li_len;j++){
                spanTxt[j].innerHTML ="柜";
                li[j].style.cssText =`width:100px;margin-left:25px;`;
            } 
        }
        else if(this.index == 4){
            ul.innerHTML +=`<li><a href="#">全部</a></li><li><a href="#">组合产品</a></li><li><a href="#">日用家居</a></li><li><a href="#">家居饰品</a></li><li><a href="#">其它</a></li>`;
            h1.innerHTML ="更多&nbsp;&nbsp;&nbsp;&nbsp;MORE";
            var li = ul.getElementsByTagName("li");
            for(var j =0,li_len = li.length;j < li_len;j++){
                spanTxt[j].innerHTML ="更多商品";
                spanTxt[j + 3].innerHTML ="更多商品";
                li[j].style.cssText =`width:150px;margin-left:25px;`;
            } 
        }
    }
}