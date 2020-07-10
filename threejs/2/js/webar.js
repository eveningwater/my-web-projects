/**
 * WebAR基础类
 * 摄像头设置参数请查看： https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
 * 如果打开摄像头后，播放视频有卡顿，请尝试设置 frameRate，height与width
 */
class WebAR {
    /**
     * 初始化Web AR
     * @param interval 识别间隔(毫秒)
     * @param recognizeUrl 识别服务地址
     * @param isDebug 是否输入调试信息
     * @param token 非必需，使用token认证识别
     */
    constructor(interval, recognizeUrl, token) {
        this.isRecognizing = false;
        // 前/后置摄像头
        this.interval = interval;
        this.recognizeUrl = recognizeUrl;
        this.token = token;
    }
    /**
     * 打开摄像头
     * 摄像头设置参数请查看： https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
     * @param videoDeviceIndex
     * @returns {Promise<T>}
     */
    openCamera(constraints) {
        // 如果是切换摄像头，则需要先关闭。
        if (this.videoElement && this.videoElement.srcObject) {
            this.videoElement.srcObject.getTracks().forEach(track => {
                track.stop();
            });
        }
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                this.videoElement.srcObject = stream;
                this.videoElement.style.display = 'block';
                this.videoElement.play();
                this.videoElement.onloadedmetadata = () => {
                    const cameraSize = {
                        width: this.videoElement.offsetWidth,
                        height: this.videoElement.offsetHeight
                    };
                    // console.info(JSON.stringify(cameraSize));
                    if (window.innerWidth < window.innerHeight) {
                        // 竖屏
                        if (cameraSize.height < window.innerHeight) {
                            this.videoElement.setAttribute('height', window.innerHeight.toString() + 'px');
                        }
                    }
                    else {
                        // 横屏
                        if (cameraSize.width < window.innerWidth) {
                            this.videoElement.setAttribute('width', window.innerWidth.toString() + 'px');
                        }
                    }
                    resolve(true);
                };
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    /**
     * 截取摄像头图片
     * @returns {string}
     */
    captureVideo() {
        this.canvasContext.drawImage(this.videoElement, 0, 0, this.videoElement.offsetWidth, this.videoElement.offsetHeight);
        return this.canvasElement.toDataURL('image/jpeg', 0.5).split('base64,')[1];
    }
    /**
     * 创建视频详情元素，播放摄像头视频流
     */
    initVideo() {
        this.videoElement = document.createElement('video');
        this.videoElement.setAttribute('playsinline', 'playsinline');
        document.body.appendChild(this.videoElement);
    }
    /**
     * 创建canvas，截取摄像头图片时使用
     */
    initCanvas() {
        this.canvasElement = document.createElement('canvas');
        this.canvasElement.setAttribute('width', window.innerWidth.toString() + 'px');
        this.canvasElement.setAttribute('height', window.innerHeight.toString() + 'px');
        this.canvasContext = this.canvasElement.getContext('2d');
        // document.body.appendChild(this.canvasElement);
    }
    /**
     * 识别
     * @param callback
     */
    startRecognize(callback) {
        $message.info("模型加载中，请耐心等待!");
        this.timer = window.setInterval(() => {
            // 等待上一次识别结果
            if (this.isRecognizing) {
                return;
            }
            this.isRecognizing = true;
            // 从摄像头中抓取一张图片
            const image = { image: this.captureVideo() };
            // 发送到服务器识别
            this.httpPost(image)
                .then((msg) => {
                this.stopRecognize();
                callback(msg);
            }).catch((err) => {
                this.isRecognizing = false;
                console.info(err);
            });
        }, this.interval);
    }
    /**
     * 停止识别
     */
    stopRecognize() {
        if (this.timer) {
            window.clearInterval(this.timer);
            this.isRecognizing = false;
        }
    }
    httpPost(image) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.onload = () => {
                try {
                    const msg = JSON.parse(http.responseText);
                    if (http.status === 200) {
                        if (msg.statusCode === 0) {
                            resolve(msg.result);
                        }
                        else {
                            reject(msg);
                        }
                    }
                    else {
                        reject(msg);
                    }
                }
                catch (err) {
                    reject(err);
                }
            };
            http.onerror = (err) => {
                reject(err);
            };
            http.open('POST', this.recognizeUrl);
            http.setRequestHeader('Content-Type', 'application/json;Charset=UTF-8');
            if (this.token) {
                // 将云识别认证token写在请求头中
                http.setRequestHeader('Authorization', this.token);
            }
            http.send(JSON.stringify(image));
        });
    }
}
//# sourceMappingURL=webar.js.map