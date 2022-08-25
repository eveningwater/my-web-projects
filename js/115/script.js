class Page {
    constructor() {
        const self = this;
        this.events = [
            { type: 'dragenter', handlerName: this.onDragEnterHandler.bind(self) },
            { type: 'dragleave', handlerName: this.onDragLeaveHandler.bind(self) },
            { type: 'dragover', handlerName: this.onDragOverHandler.bind(self) },
            { type: 'drop', handlerName: this.onDropHandler.bind(self) },
        ];
        this.uploadButton = this.getUtils().$('#upload');
        this.previewContainer = this.getUtils().$('#preview');
        this.fileInput = [...this.uploadButton.children].filter(item => item.getAttribute('type') === 'file')[0];
        this.canvas = this.getUtils().create('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.uploadButton.addEventListener('click', e => {
            this.fileInput.click();
        });
        this.fileInput.addEventListener('change', e => {
            this.uploadFile(e.target.files[0])
            setTimeout(() => {
                e.target.value = ""
            }, 1000)
        })
        this.events.forEach(item => {
            this.uploadButton.addEventListener(item.type, e => item.handlerName(e));
        });
        this.isDrag = false;
        this.dragCount = 0;
        this.FileReader = new FileReader();
        this.base64 = "";
        // 文件名与文件类型
        this.fileName = "";
        this.originFileType = "";
        this.handleButtons = this.getUtils().$$('.btn');
        this.handleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const clickType = btn.getAttribute('data-click');
                if (clickType === 'preview') {
                    if (!this.base64) {
                        return $message.warning("请先上传图片");
                    }
                    ewConfirm({
                        title: "图片base64字符串",
                        content: this.base64
                    })

                    const isCopy = this.getUtils().copyToClipboard(this.base64);
                    if (isCopy) {
                        $message.success("复制base64字符串成功!")
                    }
                }
                if (clickType === 'download') {
                    if(!this.base64){
                        return $message.warning("请先上传图片!")
                    }
                    const link = this.getUtils().create('a');
                    link.download = this.fileName || '';
                    link.target = '_blank';
                    link.style.display = 'none';
                    // 获取灰度处理的图片
                    const imgURL = this.canvas.toDataURL(this.originFileType);
                    console.log(imgURL);
                    link.href = imgURL;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            })
        })
    }
    /**
     *  post请求暂时写到这里，上传需求还没搞明白
     * @param {*} url 
     * @param {*} data 
     * @param {*} callback 
     * @param {*} error 
     */
    httpPost(url, data, callback, error = console.error) {
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onload = () => callback(request.responseText);
        request.onerror = () => error(request);
        request.send(data);
    }
    commonHandler(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    onDragEnterHandler(e) {
        this.commonHandler(e);
        this.dragCount++;
        if (e.dataTransfer?.items && e.dataTransfer.items.length) {
            this.isDrag = true;
        }
    }
    onDragLeaveHandler(e) {
        this.commonHandler(e);
        this.dragCount--;
        if (this.dragCount === 0) {
            this.isDrag = false;
        }
    }
    onDragOverHandler(e) {
        this.commonHandler(e);
    }
    onDropHandler(e) {
        this.commonHandler(e);
        this.isDrag = false;
        if (e.dataTransfer?.files && e.dataTransfer.files.length) {
            this.uploadFile(event.dataTransfer?.files[0]);
            event.dataTransfer.clearData();
            this.dragCount = 0;
        }
    }
    uploadFile(file) {
        // console.log(file);
        if (!/image\/\w+/.test(file.type) || !['jpeg', 'png', 'jpg'].some(item => file.type.includes(item))) {
            return $message.error("只允许上传图片!");
        }
        this.fileName = file.name;
        this.originFileType = file.type.slice(file.type.indexOf('/') + 1);
        this.FileReader.readAsDataURL(file);
        this.FileReader.onload = (e) => {
            this.base64 = e.target.result;
            this.previewContainer.innerHTML = "";
            const currentImage = new Image();
            currentImage.id = 'previewImage';
            currentImage.className = 'img';
            currentImage.src = this.base64;
            this.previewContainer.appendChild(this.canvas);
            this.previewContainer.appendChild(currentImage);
            setTimeout(() => {
                const previewImage = this.getUtils().$('#previewImage');
                this.canvas.width = previewImage.width;
                this.canvas.height = previewImage.height;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // 要画实际的imgDOM元素才能成功灰度处理
                this.ctx.drawImage(previewImage,0,0);
                this.ImageGray(this.ctx, 0, 0);
            })

        }
    }
    getUtils() {
        const util = Object.create(null);
        util.$ = (selector, el = document) => el.querySelector(selector);
        util.$$ = (selector, el = document) => el.querySelectorAll(selector);
        util.create = name => document.createElement(name);
        util.copyToClipboard = (str) => {
            const el = util.create('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            const selected =
                document.getSelection().rangeCount > 0
                    ? document.getSelection()?.getRangeAt(0)
                    : false;
            el.select();
            const success = document.execCommand('copy');
            document.body.removeChild(el);
            if (selected) {
                document.getSelection()?.removeAllRanges();
                document.getSelection()?.addRange(selected);
            }
            return success;
        };
        return util;
    }
    ImageGray(context) {
        const f = new Filter(context);
        f.grayScale(0, 0, this.canvas.width, this.canvas.height);
    }
}
function Filter(context) {
    this.context = context;
}
Filter.prototype.constructor = Filter;
Filter.prototype.grayScale = function (startX, startY, w, h) {
    let imageData = this.context.getImageData(startX, startY, w, h);
    let pixels = imageData.data.length;

    for (let i = 0; i < pixels; i += 4) {
        let r = imageData.data[i],
            g = imageData.data[i + 1],
            b = imageData.data[i + 2];

        let val = parseInt(r * 0.3 + g * 0.59 + b * 0.11);

        imageData.data[i] = val;
        imageData.data[i + 1] = val;
        imageData.data[i + 2] = val;
    }

    this.context.clearRect(startX, startY, w, h);
    this.context.putImageData(imageData, startX, startY);
}

new Page();