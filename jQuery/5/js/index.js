$(function () {
    //加载json数据
    $.getJSON("json/data.json", function (data) {
        dataAdd(data);
        //添加查询日期
        timeAdd();
        //查询按钮点击事件
        checkbtnClick();
    });
});
function dataAdd(data) {
    //往页面添加元素
    $('body').append(`
				<div id='img'><img src='${data.image[0].urlfirst}' alt='图片加载中'></div>
				<img id="gif" src="${data.image[1].urllast}" alt="图片加载中">
				<div id="deathTime">${data.title}</div>
				<div id="inputTime">
					<select id="year">
						<option>${data.inputTime[0]}</option>
					</select>
					<select id="month">
						<option>${data.inputTime[1]}</option>
					</select>
					<select id="day">
						<option>${data.inputTime[2]}</option>
					</select>
				<button type="button" id="checkbtn">${data.checkbtn}</button><br>
				<span id="fontremind">${data.fontremind}</span>
				<div id="reset">
					<a href="#" target="_self">${data.resetcontent}</a>
				</div>
				</div>
				<div id="timeText">
					<div class="adviceFont"><b>${data.adviceFont}</b></div>
					<div class="deathFont">${data.deathFont}</div>
					<div id="remainTime">
						<span class="remainYear">${data.remainTime[0].remainnumber[0]}</span><b>${data.remainTime[1].remaincontent[0]}</b>
						<span class="remainMonth">${data.remainTime[0].remainnumber[1]}</span><b>${data.remainTime[1].remaincontent[1]}</b>
						<span class="remainDay">${data.remainTime[0].remainnumber[2]}</span><b>${data.remainTime[1].remaincontent[2]}</b>
						<span class="remainHour">${data.remainTime[0].remainnumber[3]}</span><b>${data.remainTime[1].remaincontent[3]}</b>
						<span class="remainMinute">${data.remainTime[0].remainnumber[4]}</span><b>${data.remainTime[1].remaincontent[4]}</b>
						<span class="remainSecond">${data.remainTime[0].remainnumber[5]}</span><b>${data.remainTime[1].remaincontent[5]}</b>
					</div>
				<div id="quotes">${data.quotes}</div>
			</div>;
		`);
}
function timeAdd() {
    //遍历年月日添加到下拉菜单中
    var date = new Date();
    var yearNum = date.getFullYear() - 101;
    for (let i = yearNum; i < date.getFullYear(); i++) {
        yearNum++;
        var str = `<option value="${yearNum}">${i}</option>`;
        $('#year').append(str);
    }
    var monthNum = 0;
    for (let i = 1; i < 13; i++) {
        monthNum++;
        //如果月小于10,需要做处理
        if (monthNum < 10) {
            monthNum = '0' + monthNum;
        }
        if (i < 10) {
            i = '0' + i;
        }
        var str = `<option value="${monthNum}">${i}</option>`;
        $('#month').append(str);
    }
    var dayNum = 0;
    for (let i = 1; i < 31; i++) {
        dayNum++;
        if (dayNum < 10) {
            dayNum = '0' + dayNum;
        }
        if (i < 10) {
            i = '0' + i;
        }
        var str = `<option value="${dayNum}">${i}</option>`;
        $('#day').append(str);
    }
    //点击超链接刷新页面
    $('#reset a').on('click', function () {
        location.reload(true);
    });
}
function checkbtnClick() {
    //查询按钮点击事件
    $('#checkbtn').one('click', function () {
        //第一次点击限制
        $(this).html('次数已限制');
        //清除计时器
        clearInterval(timer);
        //获取下拉菜单
        var year = $('#year').val(),//年
            month = $('#month').val(),//月
            day = $('#day').val();//日
        //获取当前时间值
        var time = new Date();
        //获取当前年月日时分秒
        var yearNow = time.getFullYear(),//年
            monthNow = time.getMonth() + 1,//月取0~11
            dayNow = time.getDate(),//日
            hourNow = time.getHours(),//时
            minuteNow = time.getMinutes(),//分
            secondNow = time.getSeconds();//秒
        //设置死亡年龄为100岁
        var remindYear = 100 - (yearNow - year),//还剩多少年可以活
            remindMonth = monthNow - month,//还剩几个月可以活
            remindDay = dayNow - day;//还剩多少天可以活
        //对剩余的日月做处理,当剩余值得出为小于等于0,就往前推一年,即剩余年减一年,剩余月则加12个月,同样当天数得出小于等于0时,剩余天数加30天,往前推一月,即剩余月减一个月
        if (remindMonth <= 0) {
            remindMonth += 12;
            remindYear -= 1;
        }
        if (remindDay <= 0) {
            remindMonth -= 1;
            remindDay += 30;
        }
        var remindHour = 24 - hourNow,//还剩几个小时可以活
            remindMinute = 60 - minuteNow,//还剩多少分钟可以活
            remindSecond = 1;//还剩几秒钟可以活
        //设置定时器,将剩余时间显示出来
        var timer = setInterval(function () {
            //剩余秒钟自减
            remindSecond--;
            //判断如果剩余秒钟小于等于0,则分减少一分,同样分小于等于0,则小时减少一个小时,依次类推减到年少一年.
            if (remindSecond <= 0) {
                remindMinute--;
                remindSecond += 59;
            }
            if (remindMinute <= 0) {
                remindHour--;
                remindMinute += 59;
            }
            if (remindHour <= 0) {
                remindDay--;
                remindHour += 24;
            }
            if (remindDay <= 0) {
                remindMonth--;
                remindDay += 31;
            }
            if (remindMonth <= 0) {
                remindYear--;
                remindMonth += 12;
            }
            //判断如果剩余年小于等于0就表示你已经死了
            if (remindYear <= 0) {
                $('#remainTime').html(`<div id='dead'>客官你该入土为安了,不要变成鬼出来吓人了!</div>`);
                $('.deathFont').html('');
            }
            //判断如果没有输入年月日就表示你不想知道你的死亡时间
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                $('#remainTime').html(`<div id='dead'>你不填数据咋知道你的死亡时间呢?</div>`);
                $('.deathFont').html('');
            }
            //如果是其它情况就将剩余年月日时分秒添加到信息框中
            $('.remainYear').html(remindYear);
            $('.remainMonth').html(remindMonth);
            $('.remainDay').html(remindDay);
            $('.remainHour').html(remindHour);
            $('.remainMinute').html(remindMinute);
            $('.remainSecond').html(remindSecond);
        }, 1000);
    });
}