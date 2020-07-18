/**
* 功能：电梯程序核心功能
**/

/********************************************/
/* 全局对象定义部分 */
/********************************************/
/* 电梯状态 */
var elevStatus = {
    elevato: $(".elevato"),
    // 电梯所在层数
    onFloor: 1,
    // 楼层总层数
    storeyTotal: $(".storey").length
}

/********************************************/
/* 页面加载完成后的事件 */
/********************************************/
$(function() {
    /* 电梯按钮点击事件 */
    $(".ctroller button").click(function() {
        // 判断按钮是否已经点击
        var ckd = $(this).hasClass("checked");
        if(ckd) {
            return;
        }
        else {
            // 添加选中效果
            $(this).addClass("checked");
                // 获取楼层的下标，以便于计算出楼层数 
            var idx = $(this).parents(".storey").index(),
                // 当前楼层
                storeyFloor = (elevStatus.storeyTotal - idx),
                // 层高（后面+1是为了视觉上对齐）
                floorHeight = ($(".storey").height()) + 1,
                // 电梯的移动量的基数为0像素，若楼层
                amountMove = storeyFloor - 1;
                
            // 电梯移动到相应楼层
            switch(storeyFloor) {
                case 1:
                    elevatorMove(storeyFloor, floorHeight * amountMove, this);
                    break;
                case 2:
                    elevatorMove(storeyFloor, floorHeight * amountMove, this);
                    break;
                case 3:
                    elevatorMove(storeyFloor, floorHeight * amountMove, this);
                    break;
                case 4:
                    elevatorMove(storeyFloor, floorHeight * amountMove, this);
                    break;
                case 5:
                    elevatorMove(storeyFloor, floorHeight * amountMove, this);
                    break;
                case 6:
                    elevatorMove(storeyFloor, floorHeight * amountMove, this);
                    break;
            }
        }
    });
});

/**
* 功能：让电梯移动到相应的楼层
* 参数：1、当前的楼层数； 2、移动量； 3、楼层对应的按钮
**/
function elevatorMove(num,measure,btn) {
        // 获取当前电梯所在层数
    var elevatorNum = elevStatus.onFloor,
        // 计算出电梯所在层和当前楼层的差值
        diffFloorVal = Math.abs(elevatorNum - num);
    // 移动电梯
    elevStatus.elevato.css({
        "transitionDuration": diffFloorVal + "s",
        "bottom": measure + "px"
    });
    // 添加梯开关门动画Class门效果
    $(".elevato-left, .elevato-right").addClass("toggle").css("animationDelay", diffFloorVal + "s");
    // 消除按钮被点击的效果
    setTimeout(function(){
        $(btn).removeClass("checked");
    },diffFloorVal*1000);
    // 消除电梯开关门动画Class
    setTimeout(function(){
        // 电梯开门效果
        $(".elevato-left, .elevato-right").removeClass("toggle");
    }, diffFloorVal * 1000 + 3000);
    // 将电梯楼层设为当前的楼层数，以便下次判断
    elevStatus.onFloor = num;
}





