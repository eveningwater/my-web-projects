class Talk {
    constructor() {
        this.flag = false;
        this.commentBtn = $('.recommon');
        this.editImage = $('.editor_img');
        this.editorDiv = $('.editor_bqdiv');
        this.editorText = $('.editor_text');
    }
    /**
     * 初始化页面功能
     */
    init() {
        this.initComment(this.commentBtn);
        this.initEditImage(this.editImage, this.editorDiv, this.editorText);
    }
    /**
     * 点击表情
     * @param {*} editImageButton 
     * @param {*} editorDiv 
     */
    initEditImage(editImageButton, editorDiv) {
        const _this = this;
        editImageButton.click(function () {
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
                        _this.insertHtmlAtCaret(`<img src='img/tsj${idx + 1}.gif' alt='图片加载中'/>`);
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
     * @param {*} commentBtn 
     */
    initComment(commentBtn) {
        const _this = this;
        commentBtn.click(function () {
            $('body').append(`<div class="commonPanel"><i class='logo'></i><div class='headerTool'><span class='logoName'></span><span class='floor'></span><span class='date'></span></div><p></p></div>`);
            var commonPanel = $('.commonPanel p'),
                len = commonPanel.length;
            var html = $('.editor_text').html();
            $('.logoName').eq(len - 1).text('游客');
            $('.floor').eq(len - 1).html('第' + len + '楼');
            $('.date').eq(len - 1).html(_this.nowDate());
            if (len == 1) {
                commonPanel.eq(0).html(html);
            } else {
                commonPanel.eq(len - 1).html(html);
            }
        });
    }
    /**
     * 当前时间
     * @param {*} time 
     */
    nowDate(time) {
        let formatNumber = function (n) {
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
    /**
     * 往光标处添加
     * @param {*} html 
     */
    insertHtmlAtCaret(html) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(),
                    node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type !== "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    }
}
new Talk().init();