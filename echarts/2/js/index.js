/*
**功能：每周消费统计表
**作者：eveningwater
**日期：2017/4/8
*/
/*******************************/
/*全局变量定义部分*/
/*******************************/
/*******************************/
/*页面加载时运行*/
/*******************************/
$(function () {
	/*调用加载json函数*/
	loadJson();
});
/*******************************/
/*函数定义部分*/
/*******************************/
/*
**功能:加载json数据
*/
function loadJson() {
	$.getJSON("json/weekCost.json", function (json) {
		//定义两个空字符串，一个接收遍历表格标题内容，另一个接收遍历表格数据的内容
		var thCon = "", tdCon = "";
		//遍历json
		$.each(json, function (index, json) {
			//如果是标题类型
			if (index === 'type') {
				//遍历类型数组
				$.each(json, function (type) {
					//添加到字符串中
					thCon += `<th>${json[type]}</th>`;
				});
			}
			//如果是日期
			if (index === 'date') {
				//遍历week存储到空字符串中
				$.each(json, function (i) {
					tdCon += `
						<tr>
							<td>${json[i].week}</td>
						</tr>
					`;
				});
			}
		});
		//将字符串的标题内容添加的表格中
		$(".titleType").after(thCon);
		//将字符串的内容添加到表格中
		$('.tbody').html(tdCon);
		$('.tbody tr').each(function (j) {
			//定义存储数据的空字符串
			var tdTem = '';
			//遍历json数据
			$.each(json.date[j].data, function (k) {
				tdTem += `
					<td>
						<input type="text" value="${json.date[j].data[k]}">
					</td>
				`;
			});
			//将数据添加到表格中
			$('.tbody tr').eq(j).append(tdTem);
		});
	}).done(function (json) {
		//调用计算总计值函数
		calcTotal(json);
		//调用值改变总计值函数
		changeTotal(json);
	});
}
/*
**功能:总计
**参数:json数据
*/
function calcTotal(json) {
	//定义一个对象
	var dataObj = {};
	//根据表格头部来遍历数据
	$(".titleType").siblings().each(function (idx) {
		//定义一个空数组用于接收json数据
		var dataArr = [];
		//定义一个计数器用于计算总计值
		var count = 0;
		//遍历表格内容数据
		$(".tbody tr").each(function (itemIdx) {
			//定义一个变量找到表格内容
			var data = $(".tbody tr").eq(itemIdx).children("td").eq(idx + 1).children().val();
			//将遍历到的表格数据添加到数组中
			dataArr.push(data);
			//计算总值
			count += Number(data);
			//将计算出的总值添加到表格中
			$(".total td").eq(idx + 1).text(count);
			//判断如果下标值等于表格主体数据长度减一，将数组添加到对象中
			if (itemIdx === $(".tbody tr").length - 1) {
				dataObj[idx] = dataArr;
			}
		});
	});
	//调用柱状图饼状图生成函数
	columnarChart(json, dataObj);
	//调用饼状图生成函数
	cakeChart(json);
}
/*
**功能:值改变时总计
**参数:json数据
*/
function changeTotal(json) {
	$("input").on('input', function () {
		//调用计算总计函数
		calcTotal(json);
	});
}
/*
**功能:柱状图
**参数1：json数据
**参数2：对象
*/
function columnarChart(json, dataObj) {
	//定义一个空数组接收日期
	var weekArr = [];
	//遍历json数据,将遍历到的日期添加到空数组中
	$.each(json.date, function (i) {
		weekArr.push(json.date[i].week);
	});
	//调用生成柱状图函数
	setOption("chartBar", {
		backgroundColor: "rgba(170, 241, 247, 0.72)",
		//样式
		grid: {
			width: "auto",
			height: "70%"
		},
		//标题
		title: {
			text: "每周生活消费数据图表"
		},
		//x轴
		xAxis: {
			data: weekArr
		},
		yAxis:{
			data:""
		},
		//系列
		series: json.type.map((item, index) => ({
			name: item,
			type: "bar",
			data: dataObj[index].map(Number)
		}))
	});
}
/*
**功能:饼状图
**参数1：json数据
*/
function cakeChart(json) {
	//获取总计
	const totalCode = $(".total").children();
	//调用生成饼状图函数
	setOption("chartPie", {
		//背景色
		backgroundColor: "rgba(170, 194, 247, 0.72)",
		//系列
		series: [
			{
				type: 'pie',
				radius: "50%",
				data: json.type.map((item, index) => ({
					value: totalCode.eq((index + 1)).text() - 0,
					name: item
				}))
			}
		]
	});
}
/*
**功能:柱状图，饼状图生成函数
**参数1：json数据
**参数2：元素ID
*/
function setOption(ident, opt) {
	//基于准备好的dom,初始化echarts实例
	let myChart = echarts.init($('#' + ident)[0]);
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(opt);
}