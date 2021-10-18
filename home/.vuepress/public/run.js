const run = () => {
    (function () {
        let interval = null;
        const linkElement = document.querySelector('link[rel*="icon"]');
        console.log("[tips]:",linkElement);
        if(!linkElement){
            return;
        }
        const sourceTitle = document.title;
        const sourceLink = linkElement.href;
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                interval = setInterval(scroll, 1000);
                document.title = getUniCode("\\u60a8\\u6b63\\u5728\\u6d4f\\u89c8\\u9ec4\\u8272\\u7f51\\u7ad9") + '...';
                linkElement.href =
                    'https://king-hcj.github.io/images/posts/zhuangbility100/nh.gif?raw=true';
                linkElement.type = 'image/gif';
            } else {
                clearInterval(interval);
                document.title = sourceTitle;
                linkElement.href = sourceLink;
            }
        });
        function scroll() {
            const titleInfo = document.title;
            const firstInfo = titleInfo.charAt(0);
            const lastInfo = titleInfo.substring(1, titleInfo.length);
            document.title = lastInfo + firstInfo;
        }
        function getUniCode(code) {
            let codeArr = code.split("\\u"), res = "";
            for (let i = 0, l = codeArr.length; i < l; i++) {
                res += String.fromCharCode(parseInt(codeArr[i], 16));
            }
            return res;
        }
    })();
}
run();