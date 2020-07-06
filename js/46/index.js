

window.onload = function () {
    var menu = document.getElementById("menu");
    var wall = document.getElementById("wall");
    var imgs = wall.getElementsByTagName('li');
    //弹出窗口的宽度 和 高度
    var menuWidth = 130;
    var menuHeight = 226;
    //记录弹窗菜单的坐标
    var menuX, menuY;
    //鼠标单击右键弹出自定义菜单
    document.oncontextmenu = function (evt) {
        var e = evt || window.event;
        var mouseX = e.clientX || e.pageX,
            mouseY = e.clientY || e.pageY;
        //计算偏移值
        var skewX = mouseX / window.innerWidth,
            skewY = mouseY / window.innerHeight;
        //根据鼠标位置调整右键菜单,130为菜单实际宽度,226为菜单实际高度
        mouseX = mouseX - (130 * skewX);
        mouseY = mouseY - (226 * skewY);
        //当前页面背景不是黑色
        if (wall.style.display != 'block') {
            menu.style.display = 'block';
            menu.style.left = mouseX + 'px';
            menu.style.top = mouseY + 'px';
            //保存弹窗的坐标
            menuX = e.clientX;
            menuY = e.clientY;
        }
        //将默认的弹窗屏蔽了
        e.preventDefault();
    };
    //鼠标单击左键关闭自定义菜单
    document.onclick = function (evt) {
        var e = evt || window.event;
        if (!((e.clientX >= menuX) && (e.clientX <= (menuX + menuWidth)) && (e.clientY >= menuY) && (e.clientY <= (menuY + menuHeight)))) {
            menu.style.display = 'none';
        }
    };
    //获取右键菜单按钮
    var li = menu.getElementsByTagName('li');
    for (var j = 0; j < li.length; j++) {
        li[j].idx = j;
        li[j].onclick = function () {
            switch (this.idx) {
                case 0:
                    alert("未开发");
                    break;
                case 1:
                    alert("未开发");
                    break;
                case 2:
                    alert("未开发");
                    break;
                case 3:
                    alert("未开发");
                    break;
                case 4:
                    //刷新 按钮
                    window.location.reload();
                    break;
                case 5:
                    //更新背景 按钮
                    menu.style.display = 'none';
                    wall.style.display = 'block';
                    break;
                case 6:
                    //注销 按钮
                    menu.style.display = 'none';
                    document.body.style.background = '#000';
                    break;
            }
        }
    }
    //选择图片并显示  ？？？？？？？？？？？？
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].index = i;
        imgs[i].onclick = function () {
            document.body.style.background = `url('images/${this.index + 1}.jpg')`;
        };
    }
    //关闭按钮
    wall.getElementsByTagName('span')[0].onclick = function () {
        wall.style.display = 'none';
    }
};