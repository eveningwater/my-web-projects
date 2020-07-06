// 存储显示复杂的JavaScript选择器
var body = document.getElementsByTagName("body")[0],
line = document.getElementsByClassName("line");
// 执行循环9次（99乘法表有9行和最多9列）
for(var i = 0; i < 9; i++) {
// 在<body>标签内累加“div.line”标签
body.innerHTML += `<div class="line" id="${i+1}"></div>`;
for(var j = 0; j <= i; j++) {
    line[i].innerHTML +=
        `<span class="data" id="${j+1}">${(i+1)}x${(j+1)}=</span>`;
}
}
body.onmouseover = function(e){
var item = e.target.tagName.toLocaleLowerCase();
if(item == 'span'){
    var result1 = e.target.id,
        result2 = e.target.parentElement.id;
    e.target.textContent = result1*result2;
}
}
body.onmouseout= function(e){
var item = e.target.tagName.toLocaleLowerCase();
if(item == 'span'){
    var result1 = e.target.id,
        result2 = e.target.parentElement.id;
 e.target.textContent = result1+'x'+result2+'=';
}
}