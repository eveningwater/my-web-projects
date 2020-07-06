/**
 * updated by eveningwater on 2020/2/28
 */
window.onload=function(){
    function setDrag() {
        var stopPercent = 50;
        var contentW = $("#showDragRect").width();
        var contentH = contentW * (600 / 1200);
        $("#showDragRect").height(contentH);
        $("#line1").height(contentH);
        var trueLineW = (54 / 600) * contentW * (600 / 1200);
        $("#rect1").css({
            "width": contentW,
            "height": contentH
        });
        $("#rect2").css({
            "width": contentW,
            "height": contentH
        });
        $("#rect2 img").css({
            "width": contentW,
            "height": contentH
        });
        $("#drag-rect").css({
            "width": contentW,
            "height": contentH
        });

        function addDragEvent() {
            var isMobile = (function () {
                var ua = navigator.userAgent;
                var isIPhone = /iPhone/i.test(ua);
                var isIPad = /iPad/i.test(ua);
                var isAndroid = /android/i.test(ua);
                return isIPhone || isIPad || isAndroid;
            })();

            var startPos = {clientX: 0, clientY: 0};
            var setProcess = false;
            var process = document.getElementById("drag-rect");

            function addMouseEvent() {
                process.addEventListener("mousedown", onMouseDown, false);
                process.addEventListener("mousemove", onMouseMove, false);
                process.addEventListener("mouseout", onMouseOut, false);
                process.addEventListener("mouseup", onMouseUp, false);
            }

            function onMouseDown(event) {
                startPos.clientX = event.offsetX;
                setProcess = true;
            }

            var endPos = {clientX: 0, clientY: 0}

            function onMouseMove(event) {
                endPos.clientX = event.offsetX;
                if (setProcess) {
                    setPercent();
                }
            }

            function onMouseOut(event) {
                endPos.clientX = event.offsetX;
                if (setProcess) {
                    setPercent();
                }
                setProcess = false;
            }

            function onMouseUp(event) {
                endPos.clientX = event.offsetX;
                if (setProcess) {
                    setPercent();
                }
                setProcess = false;
            }


            function addTouchEvent() {
                process.addEventListener("touchstart", touchHandler, false);
                process.addEventListener("touchmove", touchHandler, false);
                process.addEventListener("touchend", touchHandler, false);
            }

            function touchHandler(event) {
                var event = event || window.event;
                switch (event.type) {
                    case "touchstart":
                        startPos.clientX = event.touches[0].clientX;
                        setProcess = true;
                        break;
                    case "touchmove":
                        event.preventDefault();
                        endPos.clientX = event.touches[0].clientX;
                        if (setProcess) {
                            setPercent();
                        }
                        break;
                    case "touchend":
                        endPos.clientX = event.changedTouches[0].clientX;
                        if (setProcess) {
                            setPercent();
                        }
                        setProcess = false;
                        break;
                }
            }

            if (isMobile) {
                addTouchEvent();
            } else {
                addMouseEvent();
            }

            var rect = $("#showDragRect")[0].getBoundingClientRect();
            function setPercent() {
                percent = endPos.clientX / rect.width;
                setOffsetLeft(percent);
                if (autoTimerID) {
                    clearInterval(autoTimerID);
                }
            }

            function setOffsetLeft(percent) {
                var offsetLeft = percent * rect.width;
                if (offsetLeft < 0) {
                    offsetLeft = 0;
                }
                if (offsetLeft > rect.width) {
                    offsetLeft = rect.width;
                }
                $('#line1').css('left',(offsetLeft - trueLineW / 2) + "px")
                $('#rect2').css({
                    'left':offsetLeft + "px",
                    'width':(rect.width - offsetLeft) + "px"
                })
                $("#rect2 img").css("left", -offsetLeft);
            }

            var autoTimerID;
            var percent = 0;
            var loopNum = 0;

            function startAutoPrecent() {
                percent = 0;
                loopNum = 0;
                autoType = "++";
                if (autoTimerID) {
                    clearInterval(autoTimerID);
                }
                autoTimerID = setInterval(autoPrecent, 20);
            }

            var autoType = "++";

            function autoPrecent() {
                if (autoType == "++") {
                    percent++;
                    if (percent >= 100) {
                        autoType = "--";
                        percent = 100;
                    }
                } else if (autoType == "--") {
                    percent--;
                    if (percent <= 0) {
                        autoType = "++";
                        percent = 0;
                        loopNum = 1;
                    }
                }
                setOffsetLeft(percent / 100);

                if (loopNum == 1 && stopPercent <= percent) {
                    clearInterval(autoTimerID);
                }

            }

            window.startAutoPrecent = startAutoPrecent;

            setOffsetLeft(0.5);
        }

        addDragEvent();
        // startAutoPrecent();

    }

    //设置发动机左右拖动
    setDrag();
};