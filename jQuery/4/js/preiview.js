/**
 * 功能:图片预览
 * @param {*} src 路径
 * @param {*} time 时间
 */
function preview(src, time) {
    var img = document.createElement('img'), imgMask = document.createElement('div');
    imgMask.style.cssText += 'position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;';
    img.style.cssText += 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:auto;height:auto;';
    imgMask.id = 'previewMask';
    img.src = src;
    imgMask.appendChild(img);
    var mask = document.getElementById('previewMask');
    if(!mask){
        document.body.appendChild(imgMask);
        ani.fadeIn(imgMask, time);
    }else{
        ani.fadeIn(mask, time);
    }
    document.addEventListener('click', function (e) {
        var tagId = e.target.id;
        if (tagId.indexOf('previewMask') > -1) {
            ani.fadeOut(e.target, time);
        }
    }, false)
}

