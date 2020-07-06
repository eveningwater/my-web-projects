
/**
 * 全局变量
 */
var global = {
    schedule:[] //日常安排
}
/**
 * 功能:日期插件
 */
function createDateTimePicker(){
    $("#date").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
}
/**
 * 功能:加载json数据
 */
function loadData(){
    $.get('../data/schedule.json',function(data){
        if(Array.isArray(data.schedule) && data.schedule.length){
            global.schedule = data.schedule;
            renderTable(global.schedule);
        }
    })
}
/**
 * 功能:渲染表格
 * @param {*} 数据
 */
function renderTable(data){
    var trHtml = '';
    data.forEach(function(item){
        trHtml += '<tr>'+
        '<td>'+
        item.date+
        '</td>'+
        '<td>'+ 
        item.content+
        '</td>'+
        '<td><button type="button" class="btn btn-success deleteSchedule">删除</button></td>'+
        '</tr>';
    })
    $('#scheduleList').find('tbody').html(trHtml);
    deleteScheDuleList($('.deleteSchedule'));
}
/**
 * 功能：删除日常安排
 * @param {*} el 
 */
function deleteScheDuleList(el){
    if(el.length){
        el.click(function(){
            $(this).parent().parent('tr').remove();
            if(global.schedule.length > 0){
                //同时删除JSON数据
                global.schedule.splice($(this).parent().parent('tr').index(),1);
            }
        })
    }else{
        return;
    }
}
/**
 * 功能：添加日常安排
 */
function addScheDuleList(){
    $('#addSchedule').click(function(){
        var date = $('#date').val(),content = $('#content').val();
        if(!date){
            createPopBox({
                title:"友情提示",
                content:"请选择日期"
            });
            return;
        }else if(!content){
            createPopBox({
                title:"友情提示",
                content:"请填写日常安排"
            })
            return;
        }else{
            //添加到JSON数据中
            global.schedule.push({
                date:date,
                content:content
            });
            createPopBox({
                title: "友情提示",
                content: "登陆成功，1s后刷新表格数据!",
            });
            setTimeout(function () {
                $('.ew-popbox-mask').fadeOut(600);
                renderTable(global.schedule);
            }, 1000)
            setTimeout(function(){
                //重置表单
                reset([$('#date'),$('#content')])
            },100)
        }
    })
}
/**
 * 功能：重置表单
 */
function reset(domELArr){
    domELArr.map(function(item){
        item.val('');
    })
}
/**
 * 页面加载时运行
 */
$(document).ready(function(){
    createDateTimePicker();
    loadData();
    addScheDuleList()
})