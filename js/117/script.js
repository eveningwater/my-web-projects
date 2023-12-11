const copyHandler = (str) => {
    const confirm = (title = "温馨提示", content = "已复制到剪切板，快发给你喜欢的TA吧!") => {
        ewConfirm({
            title: title,
            content: content,
            showCancel: false,
        });
    };
    // `navigator.clipboard.writeText` not working in wechat browser.
    if (navigator.userAgent.toLowerCase().indexOf("micromessenger") === -1) {
        navigator.clipboard.writeText(str).then(() => confirm());
    } else {
        const input = document.createElement("input");
        input.value = str;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        confirm();
    }
};
const $ = (selector, el = document) => el.querySelector(selector);
const request = (options) => {
    const { url = "", method = "get", params = {} } = options || {};
    const handleParam = obj => {
        if (!Object.keys(obj).length) return "";
        let keys = Object.keys(obj),
            length = keys.length,
            keyStr = "";
        for (let key in obj) {
            keyStr += key + "=" + obj[key];
            if (key === keys[length - 1]) {
                break;
            } else {
                keyStr += "&";
            }
        }
        return keyStr;
    }
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let requestURL = "";
        if (method.toLowerCase() === "get") {
            requestURL += url + handleParam(params);
        } else {
            requestURL = url;
        }
        xhr.open(method, requestURL, true);
        if (method.toLowerCase() === "post") {
            xhr.setRequestHeader("Content-Type", "application/json");
        }
        method.toLowerCase() === "get" ? xhr.send() : xhr.send(JSON.stringify(params));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.onerror = reject;
    })
}
const getText = () => {
    $("#refresh").innerHTML = "正在加载中<dot>...</dot>";
    $("#refresh").classList.add('ls-loading');
    $("#refresh").classList.add("ls-disabled");
    request({ url: API, method: "get" }).then(value => {
        if (value?.code === 1 && value?.content) {
            $("#ls-content-text").innerHTML = value?.content;
            $("#refresh").innerHTML = "不好?换一个";
            $("#refresh").classList.remove('ls-loading');
            $("#refresh").classList.remove("ls-disabled");
        }
    }).catch(error => {
        $("#ls-content-text").textContent = "似乎没有找到合适的土味情话!";
        $("#refresh").innerHTML = "不好?换一个";
        $("#refresh").classList.remove('ls-loading');
        $("#refresh").classList.remove("ls-disabled");
    })
}
window.onload = () => {
    $("#copy").addEventListener("click", () => {
        const text = $("#ls-content-text").innerHTML;
        if (text) {
            copyHandler(text);
        }
    });
    $("#refresh").addEventListener("click", () => {
        if (!$("#refresh").classList.contains('ls-disabled')) {
            getText();
        } else {
            ewMessage.warning("土味情话正在查找中，请耐心等待...");
        }
    });
    getText();
}