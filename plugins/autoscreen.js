function resetScreenSize(dw, dh) {
    let init = () => {
        let root = document.getElementById('app');
        let hScale = window.innerHeight / (dh || 1080);
        let wScale = window.innerWidth / (dw || 1920);
        console.log(window.innerHeight, window.innerWidth);
        root.style.transform = 'scaleX(' + wScale + ') scaleY(' + hScale + ')';
        root.style.transformOrigin = "left top";
    }
    let lazyFun;
    //窗口大小发送改变时自动调整
    window.onresize = () => {
        clearTimeout(lazyFun);
        lazyFun = setTimeout(() => {
            init();
        }, 600);
    }
    init();
}
export default ScreenSize;