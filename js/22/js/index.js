class Page {
    constructor(options) {
        String.prototype.exit = function (value) {
            return this.indexOf(value) > -1;
        }
        let firstUpper = function (word) {
            const index = word.indexOf('-');
            return word.slice(0, index) + word.slice(index + 1).slice(0, 1).toUpperCase() + word.slice(
                index + 2);
        }
        const selectorArr = ['start-btn', 'stop-btn', 'origin-btn', 'list-image', 'result', 'reset-btn',
            'upload-input', 'upload-btn'
        ];
        this.options = options;
        selectorArr.forEach((selector) => {
            if (selector.exit('-')) {
                this[firstUpper(selector)] = this._select(selector);
            } else {
                this[selector] = this._select(selector);
            }
        });
        this.timer = null;
        this.count = 0;
        this.init(options);
    }
    _select(id) {
        return document.querySelector('#' + id) || document.getElementById(id);
    }
    _selectAll(value) {
        return document.querySelectorAll(value)
    }
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    init(options) {
        this.uploadBtn.onclick = () => { return this.uploadInput.click()};
        this.uploadRender();
        this.renderList(options.data);
        this.startSelect();
        this.stopSelect();
        this.resetSelect();
        this.originSelect(options);
    }
    uploadRender() {
        this.uploadInput.onchange = (event) => {
            var file = event.target.files;
            if (typeof file !== 'object') return;
            var uploadData = [];
            for (var i = 0; i < file.length; i++) {
                if (/image\/\w+/.test(file[i].type)) {
                    uploadData.push({
                        url: window.URL.createObjectURL(file[i]),
                        text: (i + 1)
                    });
                }
                this.renderList(uploadData);
            }
            if (uploadData.length >= file.length) {
                this.uploadInput.value = "";
            }
        }
    }
    renderList(data) {
        var str = "";
        data.forEach(function (item) {
            str += '<div class="list-image-item">' +
                '<img src="' + item.url + '" alt="">' +
                '<p>' + item.text + '</p>' +
                '</div>';
        });
        this.listImage.innerHTML = str;
        if (this.listImage.children) {
            [].slice.call(this._selectAll('.list-image-item img')).forEach((item) => {
                item.onclick = function () {
                    return new ewViewer(this);
                }
            })
        }
    }
    selectRandom() {
        this.count = this.random(1, this.listImage.children.length)
        for (var i = 0; i < this.listImage.children.length; i++) {
            if (i === this.count - 1) {
                this.listImage.children[i].classList.add('list-image-item-active');
            } else {
                this.listImage.children[i].classList.remove('list-image-item-active');
            }
        }
        this.timer = setTimeout(() => {
            this.selectRandom();
        }, 50);
    }
    startSelect() {
        this.startBtn.onclick = () => {
            if (!this.timer) {
                this.selectRandom();
            } else {
                ewConfirm("请先停止再点击开始!");
            }
        }
    }
    stopSelect() {
        this.stopBtn.onclick = () => {
            if (this.timer && this.count > 0) {
                clearTimeout(this.timer);
                this.timer = null;
                this.result.textContent = "最好看的是:" + this.count;
                this.count = 0;
            } else {
                ewConfirm("请先点击开始再停止!");
            }
        }
    }
    resetSelect() {
        this.resetBtn.onclick = () => {
            if(this.timer)return ewConfirm('请先点击停止!');
            this.result.textContent = "点击开始选择吧!";
            for (var i = 0; i < this.listImage.children.length; i++) {
                this.listImage.children[i].classList.remove('list-image-item-active');
            }
        }
    }
    originSelect(options) {
        this.originBtn.onclick = () => {
            if(this.timer)return ewConfirm('请先点击停止!');
            this.renderList(options.data);
            this.timer = null;
            this.count = 0;
            this.result.textContent = "点击开始选择吧!";
        }
    }
}