
/**
 * 图表操作函数
 * @param {*} options 
 */
function ewCharts(options) {
    if (!Array.isArray(options.color) || options.color.length !== options.data.Y.length) {
        let len = options.data.Y.length - options.color.length;
        for (let i = 0; i < len; i++) {
            options.color.push('#ffffff');
        }
    }
    options.type = options.type === "bar" ? options.type : "bar";
    this.options = options;
    this.init(options);
}
/**
 * 初始化
 */
ewCharts.prototype.init = function (options) {
    // 设置样式规则
    let setStyle = this.setStyle();
    switch (options.type) {
        case "bar":
            this.resetAllCharts(this.$(options.el));
            this.resetChartsX(options.data.X, setStyle);
            this.resetChartsY(options.data.Y, setStyle);
            this.resetChartsLegend(options.data, setStyle);
            break;
    }
}
/**
 * 初始化图表结构
 */
ewCharts.prototype.resetAllCharts = function (el) {
    el.innerHTML = "<ew-charts-body>" +
        "<ew-charts-legend></ew-charts-legend>" +
        "<ew-charts-x></ew-charts-x>" +
        "<ew-charts-y></ew-charts-y>" +
        "<ew-charts-zone></ew-charts-zone>" +
        "</ew-charts-body>";
    el.classList.add('ew-charts');
    return el;
}
/**
 * 设置X轴
 */
ewCharts.prototype.resetChartsX = function (dataX, setStyle) {
    let chartsX = this.$('ew-charts-x'), chartsXHTML = '';
    let dataXLen = dataX.length;
    // 设置x轴的文本
    for (let i = 0; i < dataXLen; i++) {
        chartsXHTML += "<div class=x-" + (i + 1) + " style='letter-spacing:2px;'>" + dataX[i] + "</div>";
    }
    chartsX.innerHTML = chartsXHTML;
    let chartsXContent = this.$('ew-charts-x > div', false), chartsXContentWidthArr = [];
    // 获取元素的宽度数组，并找到最大宽度，从而设置每个元素的宽度为最大宽度
    for (let j = 0; j < dataXLen; j++) {
        chartsXContentWidthArr.push(chartsXContent[j].offsetWidth);
    }
    let maxWidth = Math.max.apply(null, chartsXContentWidthArr), unitWidth = parseInt(100 / dataXLen), half = unitWidth / 2;
    for (let k = 0; k < dataXLen; k++) {
        setStyle('ew-charts-x > div.x-' + (k + 1) + '{width:' + maxWidth + 'px;' + 'left:calc(' + (unitWidth * (k + 1) - half) + '% - ' + half + 'px)}', k);
    }
}
/**
 * 设置Y轴
 */
ewCharts.prototype.resetChartsY = function (dataY, setStyle) {
    let newDataValue = [], chartsY = this.$('ew-charts-y'), chartsYHTML = '';
    let keyNameArr = this.options.data.keyName;
    let keyValue = Array.isArray(keyNameArr) && keyNameArr.length === 2 ? keyNameArr[1] : 'value';
    for (let i = 0, len = dataY.length; i < len; i++) {
        // 将多个value值数组合并成一个数组
        newDataValue = newDataValue.concat(dataY[i][keyValue]);
    }
    // 求value数组的最大值
    let maxValue = Math.max.apply(null, newDataValue);
    if (/\./.test(String(maxValue))) {
        // 如果最大值有小数，则向上取整
        maxValue = Math.ceil(maxValue);
    }
    // 定义分段数与当前Y轴的最大值
    let subSections = null, currentMaxValue = null;
    // 按照每段为1,5,50,500,5000,50000基准值来分段的
    // 当前作为基准值判断的依据数组
    let judgeMaxArr = [1000000, 100000, 10000, 1000, 100, 10];
    let currentJudgeValue = null;
    for (let l = 0, length = judgeMaxArr.length; l < length; l++) {
        // 如果满足条件就跳出循环
        if (maxValue >= judgeMaxArr[l]) {
            currentJudgeValue = judgeMaxArr[l];
            break;
        }
    }
    // 如果currentValue的值为null，则默认分段值设为1
    if (!currentJudgeValue) currentJudgeValue = 1;
    // 计算分段数
    subSections = currentJudgeValue > 1 ? Math.ceil(maxValue / (currentJudgeValue / 2)) : Math.ceil(maxValue / currentJudgeValue);
    // 计算当前Y轴最大值
    currentMaxValue = currentJudgeValue > 1 ? subSections * (currentJudgeValue / 2) : subSections * currentJudgeValue;
    // 根据分段数来生成Y轴元素
    for (let j = 0; j < subSections; j++) {
        chartsYHTML += "<div class='y-" + (j + 1) + "'>" + (currentMaxValue / subSections) * (j + 1) + "</div>";
    }
    chartsY.innerHTML = chartsYHTML;
    // 设置CSS规则
    for (let k = 0; k < subSections; k++) {
        setStyle('ew-charts-y > div.y-' + (k + 1) + '{ bottom:calc(' + parseInt((100 / subSections) * (k + 1)) + '% - 16px);}');
    }
    // 设置区域
    this.resetChartsZone(subSections, keyValue, currentMaxValue, setStyle);
}
/**
 * 设置区域
 */
ewCharts.prototype.resetChartsZone = function (subSections, keyValue, currentMaxValue, setStyle) {
    // 区域整体背景
    setStyle("ew-charts-zone { background:repeating-linear-gradient(180deg,#535456 0%,#724109 " + 100 / subSections + "%,#334455 calc(" + 100 / subSections + "% + 1px),#e0e1e5 " + 100 / subSections * 2 + "%)}", subSections + 1);
    let zoneLen = this.options.data.X.length;
    let chartsZone = this.$('ew-charts-zone'), chartsZoneHTML = '';
    // 因为设置了margin-left与margin-right各1%,所以要减去2
    let series_unit = parseInt(100 / zoneLen) - 2;
    // 设置剩余空间
    let freeSpace = 0;
    // 系列数
    let series_count = this.options.data.Y.length;
    // 每一条数据的宽度
    let series_width = 0;
    // 每一条数据的left值
    let series_left = null;
    // 根据系列数来调整样式
    if (series_count < 3) {
        series_width = 28;
        freeSpace = (100 - (series_count * 30)) / 2;
        series_left = 30;
    } else if (series_count >= 3 && series_count < 6) {
        series_width = 18;
        freeSpace = (100 - (series_count * 20)) / 2;
        series_left = 20;
    } else {
        series_width = 100 / (series_count - 1);
        freeSpace = 100 / series_count;
        series_left = 0;
    }
    let seriesHTML = '';
    for (let j = 0; j < series_count; j++) {
        // 边框颜色高亮
        let borderColor = this.lightColor(this.options.color[j]);
        let left = null;
        if (series_left > 0) {
            left = series_left * j + freeSpace;
        } else {
            left = freeSpace * j;
        }
        // 设置初始样式
        setStyle('ew-charts-zone > div bar.bar-' + (j + 1) + "{width:" + series_width + '%;background-color:' + this.options.color[j] + ';border-color:' + borderColor + ';left:' + left + '%;box-shadow:0 0 5px ' + this.options.color[j] + ';}', j);
        // 设置悬浮样式
        setStyle('ew-charts-zone > div bar.bar-' + (j + 1) + ':hover{box-shadow:0 0 15px ' + this.options.color[j] + ';}');
        seriesHTML += '<bar class="bar-' + (j + 1) + '"></bar>'
    }
    setStyle("ew-charts-zone > div[class*='zone-']{ width:" + series_unit + "%;margin-left:1%;margin-right:1%;}");
    for (let i = 0; i < zoneLen; i++) {
        chartsZoneHTML += "<div class='zone-" + (i + 1) + "'>" + seriesHTML + "</div>";
    }
    chartsZone.innerHTML = chartsZoneHTML;
    let dataY = this.options.data.Y;
    // 延迟设置高度
    setTimeout(() => {
        for (let k = 0; k < zoneLen; k++) {
            for (let l = 0; l < series_count; l++) {
                // 获取bar元素
                const bar = chartsZone.children[k].children[l];
                // 设置class类名，方便设置样式规则
                bar.classList.add('dataId-' + (k + 1) + '-' + (l + 1));
                // 设置值，方便后续的悬浮操作显示值
                bar.setAttribute('data-value', dataY[l][keyValue][k]);
                // 设置高度
                setStyle('ew-charts-zone > div bar.dataId-' + (k + 1) + '-' + (l + 1) + '{height:' + (dataY[l][keyValue][k]) / currentMaxValue * 100 + '%;}', l);
            }
        }
        // 绑定悬浮事件
        let bar = this.$('ew-charts-zone div bar', false);
        [].slice.call(bar).forEach((item) => {
            item.onmouseenter = function () {
                let value = this.getAttribute('data-value');
                this.innerHTML = "<span class='animation'>" + value + '</span>';
            }
            item.onmouseleave = function () {
                this.innerHTML = '';
            }
        })
    }, 0);

}
/**
 * 设置图注
 */
ewCharts.prototype.resetChartsLegend = function (dataLegend, setStyle) {
    let legendHTML = "";
    let keyName = Array.isArray(dataLegend.keyName) && dataLegend.keyName.length === 2 ? dataLegend.keyName[0] : 'label';
    for (let i = 0, len = dataLegend.Y.length; i < len; i++) {
        let borderColor = this.lightColor(this.options.color[i]);
        setStyle("ew-charts-legend > i.leg-" + (i + 1) + "{ background:" + this.options.color[i] + ";border-color:" + borderColor + ";}", i);
        legendHTML += "<i class='leg-" + (i + 1) + "'></i><span>" + dataLegend.Y[i][keyName] + "</span>";
    }
    this.$('ew-charts-legend').innerHTML = legendHTML;
}
/**,
 * 获取DOM元素
 */
ewCharts.prototype.$ = function (selector, isSingle) {
    // 如果传入的包含#，则是唯一的元素执行querySelector方法，否则根据传入的布尔值来判断执行哪个方法查询DOM
    isSingle = selector.indexOf('#') > -1 ? true : typeof isSingle === 'boolean' ? isSingle : true;
    return isSingle ? document.querySelector(selector) : document.querySelectorAll(selector);
}
/**
 * 样式规则设置
 */
ewCharts.prototype.setStyle = function () {
    let link = this.$('link', false), linkIndex = 0;
    for (let i = 0, len = link.length; i < len; i++) {
        if (/\w+\.css/.test(link[i].getAttribute('href'))) {
            linkIndex = i;
        }
    }
    //api文档https://www.w3school.com.cn/xmldom/met_cssstylesheet_insertrule.asp
    return link[linkIndex].sheet.insertRule.bind(link[linkIndex].sheet);
}
/**
 * 颜色高亮
 */
ewCharts.prototype.lightColor = function (color) {
    // 传入的颜色为16进制颜色模式，如:#ffffff
    let everyColorLight = function (lightColor) {
        // 将传入的颜色转换成16进制数字，然后再乘以1.6相当于将颜色变亮1.6倍
        const value = Math.round(parseInt(lightColor, 16) * 1.6);
        // 值有一个最小值与最大值，当超过255则等于255,最小值不能小于16
        return (value >= 255 ? 255 : value <= 16 ? 16 : value).toString(16);
    }
    // 相当于处理每一区间的颜色代码，除了#之外的，每2位代表一种颜色，如#fef2f3,则f2代表红色区间,f2代表绿色区间,f3代表蓝色区间
    return '#' + everyColorLight(color.slice(1, 3)) + everyColorLight(color.slice(3, 5)) + everyColorLight(color.slice(5, 7));
}