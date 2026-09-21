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
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const u = new URL(url);
        Object.entries(params).forEach(([k, v]) => u.searchParams.append(k, v));
        xhr.open(method, method.toLowerCase() === "get" ? u : url, true);
        if (method.toLowerCase() === "post") {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(params));
        } else {
            xhr.send();
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`status ${xhr.status}`));
                }
            }
        };
        xhr.onerror = () => reject(new Error("network error"));
    });
};
const getText = () => {
    $("#refresh").innerHTML = "正在加载中<dot>...</dot>";
    $("#refresh").classList.add('ls-loading');
    $("#refresh").classList.add("ls-disabled");
    request({ url: API, method: "get", params: {} }).then(value => {
        // 兼容多种返回格式
        // PHP 代理包装纯文本: { content: "..." }
        // 一言原生: { hitokoto: "..." }
        // ALAPI: { code: 200, data: { content: "..." } }
        const content = value?.content
                     || value?.hitokoto
                     || value?.data?.content
                     || null;
        if (content) {
            $("#ls-content-text").innerHTML = content;
            $("#refresh").innerHTML = "不好?换一个";
            $("#refresh").classList.remove('ls-loading');
            $("#refresh").classList.remove("ls-disabled");
        } else {
            $("#ls-content-text").textContent = value?.error || "似乎没有找到合适的土味情话!";
            $("#refresh").innerHTML = "不好?换一个";
            $("#refresh").classList.remove('ls-loading');
            $("#refresh").classList.remove("ls-disabled");
            console.warn("接口返回异常:", value);
        }
    }).catch(error => {
        $("#ls-content-text").textContent = "似乎没有找到合适的土味情话!";
        $("#refresh").innerHTML = "不好?换一个";
        $("#refresh").classList.remove('ls-loading');
        $("#refresh").classList.remove("ls-disabled");
        console.error(error);
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