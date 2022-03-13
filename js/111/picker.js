const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);
    const on = (el,type,handler) => {
        if(el && type && handler){
            el.addEventListener(type,handler,false);
        }
    }
    const ImagePicker = function() {
        this.canvas = $(".ip-render-element");
        this.ctx = this.canvas.getContext("2d");
        this.imageInstance = new Image();
        this.imageData = null,
        this.li = $$(".ip-data-color-item");
        this.fileInput = $(".ip-file-input");
        this.fileBtn = $(".ip-file-btn");
        this.col = $(".ip-col");
        this.init();
    }
    ImagePicker.prototype = {
        init(){
            this.bindUploadHandler();
        },
        bindUploadHandler(){
            on(this.fileBtn,"click",() => this.fileInput.click());
        },
        change(){
            on(this.fileInput,"change",(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = (e) => {
                    this.imageInstance.src = e.target.result;
                }
            });
            this.imageInstance.onload = () => {
                const width = this.imageInstance.width,
                      height = this.imageInstance.height,
                      w = width > 600 ? width / 2 : width < 300 ? width * 2 : width,
                      h = height > 600 ? height / 2 : height < 300 ? height * 2 : height;
                this.canvas.setAttribute("width",w);
                this.canvas.setAttribute("height",h);
                const newWidth = this.canvas.getAttribute("width"),
                      newHeight = this.canvas.getAttribute("height");
                this.ctx.drawImage(this.imageInstance,0,0,newWidth,newHeight);
                this.imageData = this.ctx.getImageData(0,0,newWidth,newHeight).data;
            }
            on(this.canvas,"click",(e) => {
                if(!this.imageInstance.getAttribute("src")){
                    return;
                }
                const rect = e.target.getBoundingClientRect(),
                      posX = e.pageX - rect.left - 1, //1px的边框宽度
                      posY = e.pageY - rect.top - 1,//1px的边框宽度
                      imageData = Math.ceil(posY * this.canvas.getAttribute("width") + posX),
                      r = this.imageData[4 * imageData + 0],
                      g = this.imageData[4 * imageData + 1],
                      b = this.imageData[4 * imageData + 2],
                      a = Math.max(0,Math.min(Math.ceil(0.3 * r + 0.59 * g + 0.1 * b) / 100,1)); //计算公式
                this.col.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
                this.li[0].textContent = `rgba(${r},${g},${b},${a})`;
                this.li[1].textContent = `十六进制:#${r.toString(16)+g.toString(16)+b.toString(16)}`;
            })
        }
    }