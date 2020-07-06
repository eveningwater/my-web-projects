class Talk {
    constructor() {
        this.flag = false;
        this.recommon = $('.recommon');
        this.editImage = $('.editor_img');
        this.editorDiv = $('.editor_bqdiv');
        this.editorText = $('.editor_text');
    }
    /**
     * 初始化页面功能
     */
    init(){
        this.initRecommon(this.recommon);
        this.initEditImage(this.editImage,this.editorDiv,this.editorText);
    }
    /**
     * 点击表情
     * @param {*} editImageButton 
     * @param {*} editorDiv 
     * @param {*} editorText 
     */
    initEditImage(editImageButton,editorDiv,editorText){
        const _this = this;
        editImageButton.click(function(){
            _this.flag = !_this.flag;
            if (_this.flag) {
                editorDiv.slideDown(100);
                editorDiv.append(`<table><tbody></tbody></table>`);
                var tbody = $('tbody');
                for (var i = 0; i < 4; i++) {
                    tbody.append(`<tr></tr>`);
                    var tr = $('tr');
                    for (var j = 0; j < 10; j++) {
                        tr.eq(i).append(`<td></td>`);
                    }
                }
                var td = $('td'),
                    len = td.length;
                for (var k = 0; k < len; k++) {
                    td.eq(k).append(`<img src='img/tsj${k + 1}.gif' alt='图片加载中'/>`);
                    td.eq(k).click(function () {
                        const idx = $(this).index();
                        editorText.append(`<img src='img/tsj${idx + 1}.gif' alt='图片加载中'/>`);
                        editorDiv.slideUp(100);
                        _this.flag = false;
                        editorDiv.html('');
                    });
                }
        
            } else {
                editorDiv.slideUp(100);
                editorDiv.html('');
            }
        });
    }
    /**
     * 点击留言
     * @param {*} recommonButton 
     */
    initRecommon(recommonButton) {
        const _this = this;
        recommonButton.click(function () {
            $('body').append(`<div class="commonPanel"><i class='logo'></i><div class='headerTool'><span class='logoName'></span><span class='floor'></span><span class='date'></span></div><p></p></div>`);
            var commonpanel = $('.commonPanel p'),
                len = commonpanel.length;
            var html = $('.editor_text').html();
            $('.logoName').eq(len - 1).text('游客');
            $('.floor').eq(len - 1).html('第' + len + '楼');
            $('.date').eq(len - 1).html(_this.nowDate());
            if (len == 1) {
                commonpanel.eq(0).html(html);
            } else {
                commonpanel.eq(len - 1).html(html);
            }
        });
    }
    /**
     * 当前时间
     * @param {*} time 
     */
    nowDate(time) {
        let formatNumber = function(n){
            n = n.toString();
            return n[1] ? n : "0" + n;
        }
        var date = time ? new Date(time) : new Date(),
            year = date.getFullYear(),
            month = date.getMonth() - 1,
            day = date.getDate(),
            hour = date.getHours(),
            minutes = date.getMinutes();
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minutes].map(formatNumber).join(':');
    }
}
new Talk().init();