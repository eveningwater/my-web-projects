### Some small function demo collection

### Button click event

The detailed code is as follows:

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
                //First selected
            var num1 = Number(ckd[0].getAttribute("data-num")),
                //Last selected
                num2 = Number(ckd[ckd_len - 1].getAttribute("data-num")),
                //current selected
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
The operating effects are as follows:

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="eveningwater"
    data-slug-hash="qBbQaEq"
    style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;border: 2px solid; margin: 1em 0; padding: 1em;"
    data-pen-title="qBbQaEq">
    <span>See the Pen <a href="https://codepen.io/eveningwater/pen/qBbQaEq">
     qBbQaEq</a> by eveningwater (<a href="https://codepen.io/eveningwater">@eveningwater</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Slide switch

The detailed code is as follows:

```html
    <page class="page1">
		<div>page one</div>
	</page>
	<page class="page2">
		<div>page two</div>
	</page>
	<page class="page3">
		<div>page three</div>
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
/* Detail setting part */
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
/* Animation execution part */
/**************************************************/
.page2_anim-1 {
	animation: page2_anim-1 2.4s both;
}
.page3_anim-1 {
	animation: page3_anim-1 1.2s both;
}

/**************************************************/
/* Animation definition part */
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
The operating effects are as follows:

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="eveningwater"
    data-slug-hash="GRowjjd"
    style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;border: 2px solid; margin: 1em 0; padding: 1em;"
    data-pen-title="GRowjjd">
    <span>See the Pen <a href="https://codepen.io/eveningwater/pen/GRowjjd">
     GRowjjd</a> by eveningwater (<a href="https://codepen.io/eveningwater">@eveningwater</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Random verification code

```html
    <div class="font"></div>
```

```css
    .font {
        width: 70px;
        height: 40px;
        margin: 120px auto;
        background-color: rgba(44, 83, 167, 0.39);
        box-shadow: 0 0 5px rgba(241, 241, 235, 0.69);
        color: #fff;
        font: 17px/40px "Microsoft Yahei";
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
    }
```

```js
    window.onload = function () {
        //Get the container
        var f = document.getElementsByClassName("font")[0];
        //Define a random verification code
        var num = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        /*var num =/^\w{4}$/;*/
        function numRandom(param) {
            var str = "";
            for (var i = 0; i < param; i++) {
                str += num[Math.floor(Math.random() * num.length)];
            }
            f.textContent = str;
        }
        numRandom(6);
        //Randomly take the verification code and add it to the container
        f.onclick = function () {
            numRandom(6);
        }
    }
```

The operating effects are as follows:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="eveningwater" data-slug-hash="wvWNpwM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="random verification code">
  <span>See the Pen <a href="https://codepen.io/eveningwater/pen/wvWNpwM">
  random verification code</a> by eveningwater (<a href="https://codepen.io/eveningwater">@eveningwater</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 20 lines of js code to achieve snake-eating

```html
    <p><span>game instructions:</span>The keyboard arrow keys control the movement of the snake up, down, left, and right, and the game will end if you hit a wall or hit yourself.</p>
	<canvas id="canvas" width="400" height="400" style="background:#999;">The current browser does not support the canvas tag</canvas>
```

```css
    body{
    	margin: 0;padding: 0;
    }
    canvas{
    	display: block;
    	margin: 20px auto;
    }
    p{
    	text-align: center;
    }
    span{
    	color: #f00;
    }
```

```js
    var s = [41,40],
		d = 1,
		f = 43,
		x,
		b = document.getElementById('canvas').getContext('2d');
	function w(s,c){
		b.fillStyle = c;
		b.fillRect(s % 20 * 20, ~~(s / 20) * 20 , 18 , 18);
	}
	document.onkeydown = function(e){
		d = s[1] - s[0] == (x = [-1,-20,1,20][(e || event).keyCode - 37] || d ) ? d : x;
	}
	!(function(){
		s.unshift(x = s[0] + d);
		if(s.indexOf(x,1) > 0 || x < 0 || x > 399 || d == 1 && x % 20 == 0 || d == -1 && x % 20 == 19){
			return alert('game over!');
		}
		w(x,'#e641d3');
		if(x == f){
			while (s.indexOf(f = ~~(Math.random() * 399)) > 0);
			w(f,'#35e3dc');
		}else{
			w(s.pop(),'#999');
		}
		setTimeout(arguments.callee,300);
	})();
```

The operating effects are as follows:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="eveningwater" data-slug-hash="jOrdzMO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="20 lines of js code to achieve snake-eating">
  <span>See the Pen <a href="https://codepen.io/eveningwater/pen/jOrdzMO">
  20 lines of js code to achieve snake-eating</a> by eveningwater (<a href="https://codepen.io/eveningwater">@eveningwater</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### computed year day

```html
    <section>
        <span>There is still on the last day of this year:</span>
        <span class="day">0</span>day
        <span class="hour">0</span>hour
        <span class="minute">0</span>minute
        <span class="second">0</span>second
    </section>
```

```css
    body,
    html {
        margin: 0;
        padding: 0;
        font: 16px "Microsoft Yahei";
        overflow: hidden;
        color: #e2156d;
        height: 100%;
    }
    section {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #efefef;
    }
    section > span {
        vertical-align: baseline;
    }
    section span:first-child {
        font-size: 30px;
        color: #29b7d9;
        text-shadow: 0 0 5px rgba(233, 226, 202, 0.87);
    }
    section span:not(:first-child) {
        font-size: 18px;
    }
```

```js
    var lastTime = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);
    var sec = document.getElementsByTagName("section")[0];
    var day = document.getElementsByClassName("day")[0],
        hour = document.getElementsByClassName("hour")[0],
        minute = document.getElementsByClassName("minute")[0],
        second = document.getElementsByClassName("second")[0];
    function computedTime(){
        var nowTime = new Date();
        var x = lastTime - nowTime;
        second.textContent = Math.ceil(x / 1000);
        minute.textContent = Math.ceil(x / 1000 / 60);
        hour.textContent = Math.ceil(x / 1000 / 60 / 60);
        day.textContent = Math.ceil(x / 1000 / 60 / 60 / 24);
        return setTimeout(computedTime,1000);
    }
    computedTime();
```

The operating effects are as follows:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="eveningwater" data-slug-hash="abZXYJy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="computed year day">
  <span>See the Pen <a href="https://codepen.io/eveningwater/pen/abZXYJy">
  computed year day</a> by eveningwater (<a href="https://codepen.io/eveningwater">@eveningwater</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>