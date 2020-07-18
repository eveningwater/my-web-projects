### 一些小功能 demo 集合

### 按钮的点击事件

详情代码如下:

```html
    <div id="box"></div>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```
```css
@charset "utf-8";
#box {
    width: 100%;
    background-color: #52f2d3;
}
#box a{
    display: inline-block;
    width: 50px;
    height: 25px;
    text-align: center;
    border: 1px solid #4ee0c4;
    background-color: #52f2d3;
    cursor: pointer;
    margin: 2px;
    color: #fff;
}
#box a.ckd{
    background-color: #2efa7c;
}
```
```js
function html(){
    var box = document.getElementById('box');
    var str = '',
        leng = 60;
    for(let i = 0; i <= leng; i++){
        str += `<a data-num="${i}">${i}</a>`;
    }
    box.innerHTML = str;
}
$(function(){
    html();
    buttonClick();
})
function buttonClick(){
    $("#box").on('click','a',function(e){
        var arr = [];
        var a_ckd = document.getElementById('box').getElementsByClassName("ckd"),
            a_ckd_len = a_ckd.length;
        switch (a_ckd_len){
        case 0 : $(this).toggleClass("ckd"); break; 
        case 1 : 
            var num1 = Number(a_ckd[0].getAttribute("data-num")),
                num2 = Number($(this).attr("data-num"));
            if(num1 == num2){
                $(this).toggleClass("ckd");
            }else{
                if(num1 > num2){
                    num1 = [num2,num2 = num1][0];
                }
                var box_a = document.getElementById('box').getElementsByTagName("a");
                for(let i = num1; i <= num2; i++){
                    box_a[i].classList.add("ckd");
                }
            }
            break; 
        default : 
            var ckd = document.getElementsByClassName("ckd"),
                ckd_len = ckd.length;
                //第一个选中
            var num1 = Number(ckd[0].getAttribute("data-num")),
                //最后一个选中
                num2 = Number(ckd[ckd_len - 1].getAttribute("data-num")),
                //当前选中
                num =  Number($(this).attr("data-num"));
            if(num < num1){
                var box_a = document.getElementById('box').getElementsByTagName("a");
                for(let i = num; i <= num1; i++){
                    box_a[i].classList.add("ckd");
                }
            }else if(num > num2){
                var box_a = document.getElementById('box').getElementsByTagName("a");
                for(let i = num2; i <= num; i++){
                    box_a[i].classList.add("ckd");
                }
            }else{
                $(this).toggleClass("ckd");
            }
            ; break; 
        }
    var a_ckd = document.getElementById('box').getElementsByClassName("ckd"),
        a_ckd_len = a_ckd.length;
    for(var i = 0; i < a_ckd_len; i++){
        arr.push(Number(a_ckd[i].textContent));
    }
        console.log(arr);
    });
}
```
运行效果如下:

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="eveningwater"
    data-slug-hash="qBbQaEq"
    style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;border: 2px solid; margin: 1em 0; padding: 1em;"
    data-pen-title="qBbQaEq">
    <span>See the Pen <a href="https://codepen.io/eveningwater/pen/qBbQaEq">
     qBbQaEq</a> by eveningwater (<a href="https://codepen.io/eveningwater">@eveningwater</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 幻灯片切换

详情代码如下:

```html
    <page class="page1">
		<div>页面一</div>
	</page>
	<page class="page2">
		<div>页面二</div>
	</page>
	<page class="page3">
		<div>页面三</div>
	</page>
```
```css
@charset "utf-8";
html,body {
	width: 100%; height: 100%;
	margin: 0; padding: 0;
	overflow: hidden;
}
/**************************************************/
/* 细节设置部分 */
/**************************************************/
page {
	width: 100%; height: 100%;
	font-size: 32px;
	color: #fff;
	display: block;
	position: absolute;
}

.page1 {
	background-color: #9f0b0b;
}
.page2 {
	background-color: #0b9f7d;
	left: 100%;
}
.page3 {
	background-color: #0b669f;
	left: 100%;
}
/**************************************************/
/* 动画执行部分 */
/**************************************************/
.page2_anim-1 {
	animation: page2_anim-1 2.4s both;
}
.page3_anim-1 {
	animation: page3_anim-1 1.2s both;
}

/**************************************************/
/* 动画定义部分 */
/**************************************************/
/* page2 */
@keyframes page2_anim-1 {
	0% {
		transform: rotate(0deg);
		left: 100%;
	}
	100% {
		transform: rotate(720deg);
		left: 0%;
	}
}
/* page3 */
@keyframes page3_anim-1 {
	0% {
		transform: scale(0.8);
		left: -100%; top: -100%
	}
	50% {
		transform: scale(0.8);
		left: 5%; top: 5%
	}
	100% {
		transform: scale(1);
		left: 0%; top: 0;
	}
}
```
```js
var count = 0;
var page = document.getElementsByTagName("page");
var page1 = page[0],	
	page2 = page[1],
	page3 = page[2];
page1.onclick = function() {
	count++;
	if(count == 1) {
		page2.classList.add("page2_anim-1");
	}
}
page2.onclick = function() {
	count++;
	if(count == 2) {
		page3.classList.add("page3_anim-1");
	}
}

document.oncontextmenu = function(event) {
	event.preventDefault();
	if(count == 0) {
		return;
	}
	else {
		count--;
	}
	if(count == 0) {
		page2.classList.remove("page2_anim-1");
	}
	if(count == 1) {
		page3.classList.remove("page3_anim-1");
	}
}
```
运行效果如下:

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="eveningwater"
    data-slug-hash="GRowjjd"
    style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;border: 2px solid; margin: 1em 0; padding: 1em;"
    data-pen-title="GRowjjd">
    <span>See the Pen <a href="https://codepen.io/eveningwater/pen/GRowjjd">
     GRowjjd</a> by eveningwater (<a href="https://codepen.io/eveningwater">@eveningwater</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>