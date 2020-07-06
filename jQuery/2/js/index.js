function girlFriend(options) {
    this.init(options);
}
girlFriend.prototype.init = function (options) {
    this.writeText(options.text, options.textEl);
    this.addName(options.name, options.nameEl);
    this.handleButton(options);
}
girlFriend.prototype.writeText = function (text, writeEl,callback) {
    let count = 0, writeTimer = null;
    let writeHandle = function () {
        count++;
        writeEl.html(text.substr(0, count));
        if (count > text.length - 1 && writeTimer) {
            clearTimeout(writeTimer);
            if(typeof callback === 'function')callback(true);
        } else {
            writeTimer = setTimeout(writeHandle, 200);
        }
    }
    writeHandle();
}
girlFriend.prototype.addName = function (name, nameEl) {
    nameEl.html(name);
}
girlFriend.prototype.handleButton = function (options) {
    let count = 0, popCount = 0;
    let _self = this;
    options.buttonEls.click(function () {
        let idx = $(this).index();
        if (idx === 0) {
            let content = options.popBox.find('p');
            content.html(options.wellTextArr[0]);
            options.popBox.fadeIn(700);
            options.popBox.find('button').click(function () {
                popCount++;
                content.html(options.wellTextArr[popCount]);
                if (popCount > options.wellTextArr.length - 1) {
                    $('.page-1').fadeOut(700);
                    options.popBox.fadeOut(700);
                    $('.page-2').fadeIn(700);
                    loadPage(options, _self);
                }
            })
        } else {
            count++;
            if (count <= options.notWellTextArr.length) {
                options.notWellEl.append(`<span>${options.notWellTextArr[count - 1]}</span>`);
            } else {
                const poemArr = options.poems;
                let random = function(max,min){
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                options.notWellEl.html(poemArr[random(0,poemArr.length)]);
            }
        }
    })
}
function loadPage(options, _self) {
    // 如果是生日不是则不执行
    let html = `<particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle>
    <particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle>
    <particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle>
    <particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><particle></particle><div class="pyro"><div class="before"></div><div class="after"></div></div><h1>${options.name}我爱你</h1>
    <h2>Happy Birthday Bro!</h2><span>🎉</span><div class="candle"><div id="flame" class="lit"></div></div><div class="cake"></div><div class="plate"></div>`;
    setTimeout(() => {
        $('.page-2').html(`<div id="fire-container"></div><div id="fire-text"></div>`);
        $('#fire-container').fireworks({
            sound: true,
            opacity: 0.9,
            width: '100%',
            height: '100%'
        });
        
        let text = options.isBirth ? `我真的很开心，感谢亲爱的答应了我，我爱你，${options.name},请耐心等待接下来的惊喜,仔细盯着屏幕上的数字吧!` : `我真的很开心，感谢亲爱的答应了我，我爱你，${options.name}!`;
        _self.writeText(text, $('#fire-text'),(bool) => {
            if(bool){
                if (options.isBirth) {
                    if(!$('.time-mask').length)$('.page-2').append(`<div class='time-mask'><div class='count'></div></div>`);
                    let count = 10;
                    let timer = null;
                    let countTime = function() {
                        count--;
                        $('.count').html(count);
                        if(count <= 0){
                            clearTimeout(timer);
                            $('.page-2').html(html);
                        }else{
                            timer = setTimeout(countTime,1000);
                        }
                    }
                    countTime();
                }else{
                    return;
                }
            }
        });
    }, 10)
}