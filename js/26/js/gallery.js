function Gallery(options = {}){
    this.container = typeof options.el === "string" ? document.querySelector(options.el) : null;
    if(!this.container){
        this.container = document.body;
    }
    this.showPrev = typeof options.showPrev === "boolean" ? options.showPrev : true;
    this.showNext = typeof options.showNext === "boolean" ? options.showNext : true;
    this.prevText = options.prevText || "&lt;&nbsp;上一张";
    this.nextText = options.nextText || "下一张&nbsp;&gt;";
    this.currentItem = null;
    this.footerHeight = 60;
    this.originData = options.data || [];
    this.originDataKey = options.dataKey || {
        key:"name",
        value:"caption"
    }
    this.data = {};
    this.dataLen = 0;
    this.timer = null;
    this.prevElement = null;
    this.nextElement = null;
    this.init();
}
Gallery.prototype = {
    init(){
        this.observe();
        this.createGallery(this.originData);
        this.start();
    },
    start(){
        if(this.showPrev || this.showNext){
            this.runNextPrevHandler();
        }
        window.addEventListener("resize",() => {
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.defaultRenderImageListAll();
                if(this.currentItem){
                    this.selectImage(this.currentItem);
                }
            },1000);
        })
    },
    runNextPrevHandler(){
        const handler = item => {
            this.selectImage(item);
            this.defaultRenderImageListAll();
        }
        if(this.prevElement){
            this.prevElement.addEventListener("click",() => {
                let currentIndex = Number(this.currentItem.id) - 1;
                if(currentIndex < 0){
                    currentIndex = this.dataLen - 1;
                }
                handler(this.data[currentIndex].item);
            })
        }
        if(this.nextElement){
            this.nextElement.addEventListener("click",() => {
                let currentIndex = Number(this.currentItem.id) + 1;
                if(currentIndex >= this.dataLen){
                    currentIndex = 0;
                }
                handler(this.data[currentIndex].item);
            })
        }
    },
    observe(){
        const observeHelper = (el,callback) => {
            let MutationObserver = window.MutationObserver || window.webkitMutationObserver,
                eventListener = window.addEventListener;
            if(MutationObserver){
                const ob = new MutationObserver((mutations,observer) => {
                    if(mutations[0].addedNodes.length || mutations[0].removedNodes.length){
                        callback(mutations);
                    }
                });
                ob.observe(el,{
                    childList:true,
                    subtree:false
                });
            }else if(eventListener){
                el.addEventListener("DOMNodeInserted",callback,false);
            }
        }
        observeHelper(this.container,mutations => {
            let data = Array.prototype.slice.call(mutations[0].addedNodes).filter(item => item.nodeType !== 3),
                zIndex = 1;
            data.forEach(item => {
                let ig = item.getElementsByTagName("img")[0],
                    first = true;
                if(!ig){
                    return;
                }
                ig.addEventListener("load",() => {
                    if(first){
                        first = false;
                        this.currentItem = item;
                    }
                    this.data[item.id] = {
                        item:item,
                        width:item.offsetWidth,
                        height:item.offsetHeight
                    }
                    this.dataLen++;
                    ig.addEventListener("click",() => {
                        this.selectImage(item);
                        this.defaultRenderImageListAll();
                    });
                    this.defaultRenderImageList(item,zIndex++);
                })
            })
        })
    },
    insertAfter(node,currentNode){
        return currentNode.insertBefore(node,currentNode.nextSibling);
    },
    createGallery(data){
        let template = "";
        const { key,value } = this.originDataKey;
        for(let i = 0;i < data.length;i++){
            template += `
                <section id = ${i} class="gallery-item">
			        <img src = "${data[i][key]}" alt = "${data[i][key]}" class="gallery-img" />
			        <span class="gallery-caption">${data[i][value]}</span>
			    </section>`;
        }
        this.container.innerHTML = template;
        if(this.showPrev || this.showNext){
            const footer = document.createElement("div");
            footer.setAttribute("id","nav");
            footer.setAttribute("class","navbar");
            footer.innerHTML = `
                <button id="prev" type="button" class="btn" style="display:${ this.showPrev ? 'inline-block' : 'none' }">${ this.prevText }</button>
                <button id="next" type="button" class="btn" style="display:${ this.showNext ? 'inline-block' : 'none'}">${ this.nextText }</button>
            `;
            this.footerHeight = footer.offsetWidth;
            this.insertAfter(footer,document.body);
            this.prevElement = document.querySelector("#prev");
            this.nextElement = document.querySelector("#next");
        }
    },
    defaultRenderImageList(item,zIndex){
        let ranX = Math.random(),
            ranY = Math.random(),
            maxR = 45,
            minR = -45,
            ranNum = Math.random() * (maxR - minR) + minR,
            ranCount = ranNum * Math.PI / 180,
            rWidth = Math.abs(item.offsetWidth * Math.cos(ranCount)) + Math.abs(item.offsetHeight * Math.sin(ranCount)),
            rHeight = Math.abs(item.offsetWidth * Math.sin(ranCount)) + Math.abs(item.offsetHeight * Math.cos(ranCount)),
            x = Math.floor((window.innerWidth - rWidth) * ranX),
            y = Math.floor((window.innerHeight - rHeight) * ranY);
            this.setStyle(item,x,y,ranNum,zIndex,1);
    },
    setStyle(item,x,y,ranNum,zIndex,scale){
        item.style["z-index"] = zIndex;
        item.style["transform-origin"] = "0 0";
        item.style.transform = `translate(${x}px,${y}px) rotate(${ranNum}deg) scale(${scale})`;
    },
    defaultRenderImageListAll(){
        let zIndex = 0;
        for(let x in this.data){
            if(x !== this.currentItem.id){
                this.defaultRenderImageList(this.data[x].item,zIndex++);
            }
        }
    },
    selectImage(item){
        let scale = 1.2,
            ranNum = 0,
            iWidth = this.data[item.id].width,
            iHeight = this.data[item.id].height,
            width = iWidth * scale,
            height = iHeight * (width / iWidth),
            x = (window.innerWidth - width) / 2,
            y = (window.innerHeight - height - this.footerHeight) / 2;
        this.setStyle(item,x,y,ranNum,999,scale);
        this.currentItem = item;
    }
}