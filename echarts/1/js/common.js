/*
 **功能:图表
 **作者:eveningwater
 **日期:2017-04-07
 */
$(function () {
	const chartDataFirst = {
		//标题
		title: {
			text: 'ECharts基础'
		},
		//工具栏
		tooltip: {},
		//图表图注
		legend: {
			data: ['价格']
		},
		//x轴
		xAxis: {
			data: ["电脑", "手机", "服务器", "平板电脑", "电视机", "MP3"]
		},
		//y轴
		yAxis: {},
		//系列
		series: [{
			name: '价格',
			//图表类型设置
			type: 'bar',
			data: [5000, 2000, 36000, 2000, 1000, 200]
		}]
	}, chartDataSecond = {
		backgroundColor: '#0f12ef',
		visualMap: {
			show: true,
			min: 80,
			max: 600,
			inRange: {
				colorLightness: [2, 5.5]
			}
		},
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			data: [{
				value: 235,
				name: '视频广告'
			}, {
				value: 274,
				name: '联盟广告'
			}, {
				value: 310,
				name: '邮件营销'
			}, {
				value: 335,
				name: '直接访问'
			}, {
				value: 400,
				name: '搜索引擎'
			}],
			roseType: 'angle',
			label: {
				normal: {
					textStyle: {
						color: 'rgba(255, 255, 255, 0.3)'
					}
				}
			},
			labelLine: {
				normal: {
					lineStyle: {
						color: 'rgba(255, 255, 255, 0.3)'
					}
				}
			},
			itemStyle: {
				normal: {
					color: '#c23531',
					shadowBlur: 200,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	}, chartThird = {
		title: {
			text: '折线图堆叠'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['上网', 'QQ', '游戏', '音乐', '看电影']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name: '上网',
				type: 'line',
				stack: '花费',
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: 'QQ',
				type: 'line',
				stack: '花费',
				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: '游戏',
				type: 'line',
				stack: '花费',
				data: [150, 232, 201, 154, 190, 330, 410]
			},
			{
				name: '音乐',
				type: 'line',
				stack: '花费',
				data: [320, 332, 301, 334, 390, 330, 320]
			},
			{
				name: '看电影',
				type: 'line',
				stack: '花费',
				data: [820, 932, 901, 934, 1290, 1330, 1320]
			}
		]
	};
	[chartDataFirst, chartDataSecond, chartThird].forEach((item, index) => createChart("echarts-" + (index + 1), item));
});
/*
 **功能:柱状、折线图
 **参数1：元素ID
 **参数2：配置项设置
 */
function createChart(ident, opt) {
	//基于准备好的dom,初始化echarts实例
	let myChart = echarts.init($('#' + ident)[0]);
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(opt);
}