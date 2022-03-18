/************功能：计分器************/
/**********************************/
/*作者:eveningwater*/
/**********************************/
/*日期:2017/2/27*/
/**********************************/
/**********************************/

/*多媒体资源未加载。。。。。*/
function ewScoreCounter(options) {
    this.options = options;
    this.count = typeof options.count === 'number' ? options.count : 20;
    this.total = options.total || 100;
    if(this.total < this.count || this.total % this.count > 0){
        $message.error('输入的数据不符合要求，请重新输入!');
        setTimeout(() => {
            createScoreBox();
        },1000);
    }else{
        return this.init();
    }
}
ewScoreCounter.prototype.init = function () {
    this.resetPage(this.count);
    this.inputElementsArr = Array.prototype.slice.call(document.getElementsByTagName("input"));
    this.resetBtn = document.getElementById("btnReset");
    this.countBtn = document.getElementById("btnCount");
    this.result = document.getElementById("result-text");
    this.handleFocus(this.inputElementsArr,this.count,this.total);
    this.handleReset(this.resetBtn);
    this.handleCount(this.countBtn);
    this.handleKeyBoard(this.inputElementsArr);
}
ewScoreCounter.prototype.resetPage = function(count){
    var content = "",main = '<div>' + '<button type="button" id="btnReset">重置</button>' +
    '<button type="button" id="btnCount">计算</button>' + '</div>' + '<div>' +
    '结果为:<span id="result-text">0</span>' + '</div>';
    for (var i = 0; i < count; i++) {
        //将标签元素添加到自定义变量中
        content += '<li>' + '<label>' + (i + 1) + '&nbsp;</label>' + '<input type="text"/></li>';
    }
    document.body.innerHTML += '<div id="main"><header><ul>' + content + '</ul></header><section id="content">' + main + '</section></div>';
}
ewScoreCounter.prototype.handleFocus = function(elements,count,total){
    elements.map((item) => {
        item.onfocus = function () {
            this.style.cssText = "border-color:#2caede;color:#2caede;";
            this.parentNode.style.cssText = "border-color:#2caede;color:#2caede;";
        }
        item.onblur = function () {
            this.style.cssText = "none";
            this.parentNode.style.cssText = "none";
        }
        //输入判断
        item.oninput = function () {
            let num = Number(this.value);
            if(isNaN(num) || num > total / count || num < 0 || this.value.charAt(0) <= this.value.charAt(1)){
                $message.warning("输入的分数超出了限制!")
                this.value = "";
                return;
            }
        }
    })
}
ewScoreCounter.prototype.handleReset = function(el){
    let inp = this.inputElementsArr;
    let result = this.result;
    el.onclick = function () {
        inp.forEach(item => item.value = "");
        inp[0].focus();
        result.textContent = "";
    }
}
ewScoreCounter.prototype.handleCount = function(el){
    let _self = this;
    el.onclick = function () {
        _self.computeResult(_self.inputElementsArr,_self.result);
    }
}
ewScoreCounter.prototype.computeResult = function(valueArr,el){
    let count = 0;
    valueArr.forEach(item => count += Number(item.value));
    el.textContent = this.total - count;
}
ewScoreCounter.prototype.handleKeyBoard = function(elements){
    const _self = this;
    elements.forEach((item) => {
        item.onkeypress = function(e){
            // console.log(e.keyCode);
            switch(e.keyCode){
                case 13:
                    _self.computeResult(_self.inputElementsArr,_self.result);
                    break;
            }
        }
    })
}
function createScoreBox(){
    ewConfirm({
        title:"温馨提示",
        content:`
            <input type="text" placeholder="请输入总分数" class="user-score-input">
            <input type="text" placeholder="请输入题数" class="user-score-input">
        `,
        sure:(scope) => {
            let input = scope.$('input.user-score-input',false);
            if(input[0].value && input[1].value){
                const scoreBox = new ewScoreCounter({
                    count:Number(input[1].value),
                    total:Number(input[0].value)
                });
                console.log(scoreBox);
                scope.close(100);
            }else{
                $message.warning('请输入总分数以及题数!');
            }
        },
        isClickModal:false
    })
}
/**********************************/
document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        createScoreBox();
    }
}


















