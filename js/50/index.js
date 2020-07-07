var input = document.getElementById('myInput');
var searchBtn = document.getElementById('search_btn');
input.onkeydown = function () {
    var val = this.value;
    var os = document.createElement('script');
    os.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&cb=callback";
    document.getElementById('menu').innerHTML = "";
    document.body.appendChild(os);
}
function callback(args) {
    var data = args.s;
    for (var i = 0, len = data.length; i < len; i++) {
        var li = document.createElement('li');
        li.textContent = data[i];
        if (data.length) {
            document.getElementById('menu').style.display = 'block';
        } else {
            document.getElementById('menu').style.display = 'none';
        }
        li.onclick = function () {
            window.location.href = "https://www.baidu.com/s?  wd=" + this.textContent + "&rsv_spt=1&rsv_iqid=0x87b605db00000ebd&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=3&rsv_sug1=3&rsv_sug7=100&  rsv_sug2=1&prefixsug=dd&rsp=0&inputT=442655&rsv_sug4=443575"
        }
        if (i <= 4) {
            document.getElementById('menu').appendChild(li);
        }
    }
}
searchBtn.onclick = function () {
    if (input.value) {
        window.location.href = "https://www.baidu.com/s?wd=" + input.value + "&rsv_spt=1&rsv_iqid=0x87b605db00000ebd&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=3&rsv_sug1=3&rsv_sug7=100&rsv_sug2=1&prefixsug=dd&rsp=0&inputT=442655&rsv_sug4=443575";
    }
}