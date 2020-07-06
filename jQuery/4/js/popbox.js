/**
 *   创建弹出框
 *  参数:标题，内容
 */
function createPopBox(option){
    var config = {
        title:option.title || "默认提示",
        content:option.content || "默认内容",
        sure:option.sure || function(e){
            $('.ew-popbox-mask').fadeOut(600);
        },
        cancel:option.cancel || function(){
            $('.ew-popbox-mask').fadeOut(600);
        },
        showCancel:option.showCancel || false
    }
    renderPopBox(config);
}
/**
 * 功能:渲染弹出框
 * 参数:配置对象
 */
function renderPopBox(option){
    var cancelDisplay = option.showCancel ? 'block' : 'none';
    var popboxHtml = '<div class="ew-popbox-mask">' +
                    '<div class="ew-popbox">' +
                        '<div class="ew-popbox-title">' +
                        option.title+
                        '</div>'+
                        '<div class="ew-popbox-content">'+
                        option.content+
                        '</div>'+
                        '<div class="ew-popbox-btngroup">'+
                            '<button type="button" class="btn btn-default" id="popboxsure">确认</button>'+
                            '<button type="button" class="btn btn-info" style="display:'+ cancelDisplay +'" id="popboxcancel">取消</button>'+
                        '</div>'+
                    '</div>'+
                    '</div>';
    if(!$('.ew-popbox-mask').length){
        $('body').append(popboxHtml);
    }else{
        $('.ew-popbox-mask').remove();
        $('body').append(popboxHtml);
    }
    $('#popboxsure').click(function(e){
        option.sure(e);
    })
    $('#popboxcancel').click(function(e){
        option.cancel(e);
    });
    $('.ew-popbox-mask').click(function(e){
        if($(e.target).attr('class') === $(this).attr('class')){
            $('.ew-popbox-mask').fadeOut(600);
        }
    });
}