
function ewViewer(el){
    if(typeof window.jQuery !== 'undefined' && el instanceof window.jQuery){
        this.previewJQuery(el);
    }else{
        this.previewJS(el);
    }
    return this;
}
ewViewer.prototype.previewJS = function(el){
    const isDom = function(e){
        return typeof HTMLElement === 'object' ? e instanceof HTMLElement : e && typeof e === 'object' && e.nodeType === 1 && typeof e.nodeName === 'string' || e instanceof HTMLCollection || e instanceof NodeList;
    }
    // 如果传入的不是一个dom元素则不执行后续代码
    if(!isDom(el))return;
    const curElement = document.querySelector('#preview-img-mask');
    // 判断当前遮罩层元素是否存在
    if(!curElement){
        // 创建遮罩层元素
        const element = document.createElement('div');
        // 克隆一个节点
        const child = element.cloneNode(true);
        element.id = "preview-img-mask";
        // 添加遮罩层元素样式
        element.style.cssText += `position:fixed;left:0;top:0;right:0;display:none;z-index:10000;overflow:auto;width:100%;height:100%;background:rgba(0,0,0,0.5)`;
        // 子元素添加样式
        child.style.cssText += `background-repeat: no-repeat;background-position: center;background-size: contain;`;
        element.appendChild(child);
        document.body.appendChild(element);
    }
    // 重新获取遮罩层元素
    const maskLayer = document.querySelector('#preview-img-mask');
    // 判断如果传入的元素不是一个图片元素则不执行如下代码
    if (el.length || el.tagName.toLowerCase().indexOf('img') === -1)return;
    // 获取图片的原始宽高
    var imgNaturalWidth = el.naturalWidth,
        imgNaturalHeight = el.naturalHeight;
    // 移动端以及页面缩放做判断
    const isMobile = window.navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
    // 获取页面宽度
    const pageWidth = (function(){
        return window.innerWidth;
    })();
    // 如果当前页面宽度小于600,或是移动端设备，则将原始宽高缩放0.6倍
    if (isMobile || pageWidth <= 600) {
        imgNaturalWidth = imgNaturalWidth * 0.6;
        imgNaturalHeight = imgNaturalHeight * 0.6;
    }
    // 获取页面宽高
    var viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;
    // 获取图片元素的src路径
    var imgUrl = el.getAttribute('src');
    // 显示遮罩层
    setTimeout(() => {
        maskLayer.style.display = "block";
    },600);
    // 获取遮罩层的子元素
    var maskLayerDiv = maskLayer.querySelector('div');
    // 设置子元素的样式
    maskLayerDiv.style.cssText += `background-image:url('${imgUrl}');background-size:${imgNaturalWidth}px ${imgNaturalHeight}px;width:0;height:0;`;
    // 判断图片宽度是否大于页面宽度,然后设置子元素的宽度
    if (imgNaturalWidth > viewportWidth) {
        maskLayerDiv.style.width = imgNaturalWidth + "px";
    } else {
        maskLayerDiv.style.width = "100%";
    }
    // 判断图片高度是否大于页面高度，然后设置子元素的高度
    if (imgNaturalHeight > viewportHeight) {
        maskLayerDiv.style.height = imgNaturalHeight + "px";
    } else {
        maskLayerDiv.style.height = "100%";
    }
    // 点击遮罩层关闭预览
    maskLayer.onclick = function(){
        setTimeout(() => {
            this.style.display = 'none';
        },600);
    }
}
ewViewer.prototype.previewJQuery = function(el){
    const curElement = $('#preview-img-mask');
    // 判断如果页面不存在遮罩层元素，则添加该元素
    if (!curElement.length) {
        $(`<div id="preview-img-mask"><div></div></div>`).appendTo("body");
    }
    // 获取遮罩层元素
    var maskLayer = $('#preview-img-mask');
    // 设置遮罩层样式
    maskLayer.css({
        position:'fixed',
        left:0,
        top:0,
        right:0,
        display:'none',
        'z-index':10000,
        overflow:'auto',
        width:'100%',
        height:'100%',
        background:'rgba(0,0,0,0.5)'
    });
    // 判断传入的如果不是一个img元素
    if (el.prop('tagName').toLowerCase().indexOf('img') === -1)return;
    var imgNaturalWidth = el[0].naturalWidth,
        imgNaturalHeight = el[0].naturalHeight;
     // 移动端以及页面缩放做判断
     const isMobile = window.navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
     // 获取页面宽度
     const pageWidth = (function(){
         return $(window).width();
     })();
    //  判断页面宽度是否小于600以及是否是移动端
    if (isMobile || pageWidth <= 600) {
        imgNaturalWidth = imgNaturalWidth * 0.6;
        imgNaturalHeight = imgNaturalHeight * 0.6;
    }
    // 获取页面的宽高
    var viewportWidth = $(window).width(),
        viewportHeight = $(window).height();
    // 获取图片的路径
    var imgUrl = el.attr('src');
    maskLayer.fadeIn(600);
    // 获取子元素
    var maskLayerDiv = maskLayer.children();
    // 设置子元素样式
    maskLayerDiv.css({
        "background-image": "url(" + imgUrl + ")",
        "background-size": imgNaturalWidth + "px " + imgNaturalHeight + "px",
        "width": "",
        "height": "",
        "background-repeat": "no-repeat",
        "background-position": "center",
        "background-size": "contain"
    });
    // 判断图片原始宽高与页面宽高，从而决定子元素的宽高
    if (imgNaturalWidth > viewportWidth) {
        maskLayerDiv.css('width', imgNaturalWidth);
    } else {
        maskLayerDiv.css('width', '100%');
    }
    if (imgNaturalHeight > viewportHeight) {
        maskLayerDiv.css('height', imgNaturalHeight);
    } else {
        maskLayerDiv.css('height', '100%');
    }
    // 点击遮罩层关闭
    maskLayer.off("click").on("click", function () {
        $(this).fadeOut(600);
    });
}