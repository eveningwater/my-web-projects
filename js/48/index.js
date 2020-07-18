var box = document.getElementsByClassName('boxText')[0];
var audio = document.getElementById("myAudio");
//设置根元素字体
function setFontSize(n) {
    var size = document.documentElement.clientWidth;
    return document.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px';
}
setFontSize(750);
function loadContent() {
    //ajax请求数据
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './json/test.json', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var text = xhr.responseText;
            var jsObj = JSON.parse(text);
            console.log(jsObj);
            var str = "";
            for (var i = 0, len = jsObj.length; i < len; i++) {
                str += '<h1>' + jsObj[i].title + '</h1>' +
                    '<article>' + jsObj[i].content + '</article>' +
                    '<img src="' + jsObj[i].image + '">';
            }
            box.innerHTML = str;
            setTimeout(() => {
                let timer = null;
                let count = 0;
                let read = function () {
                    if (count <= jsObj.length) {
                        let obj = jsObj[count];
                        readContent(obj.title + "," + obj.content.replace(/<br>/g, ''));
                        audio.addEventListener('timeupdate', () => {
                            if (audio.ended) {
                                count++;
                                timer = setTimeout(read, 1000);
                            } else {
                                return;
                            }
                        });
                    } else {
                        if (timer) clearTimeout(timer);
                        return;
                    }
                }
                read();
            }, 1000)
        }
    }
}
/**
 * 阅读文本
 * @param {*} value 
 */
function readContent(value) {
    var api = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=" + encodeURI(value);
    audio.src = api;
    audio.oncanplay = function () {
        audio.muted = false;
        audio.play();
    }
}
window.onload = function () {
    ewConfirm({
        title:"温馨提示",
        isClickModal:false,
        content:"接下来要加载页面内容，请点击确定",
        sure:(context) => {
            context.close(600);
            loadContent();
        },
        showCancel:false,
        footerAlign:"center"
    })
  }