var XHR = null;
var JSONData = null;
var AJAXCtrl = {
	XHR: null,
	JSONDate: null,
	HTMLDate: "",
	TEXTDate: ""
}
window.onload = function () {
	const agent = navigator.userAgent;
	if(!agent.match(/(iPhone|iPod|Android|ios)/i)){
		ewConfirm({
			title:"温馨提示",
			content:"最好请在移动设备下查看效果"
		})
	}
	let fieldset = document.getElementsByTagName("fieldset")[0];
		let anchor = fieldset.getElementsByTagName("a"),
			anchor_len = anchor.length;
		let panel = document.getElementsByClassName("infoPanel")[0];
		for(let i = 0; i < anchor_len; i++) {
			anchor[i].onclick = function () {
				// 下拉显示信息面板
				panel.classList.add("show");
				getJSON("./json/clothingData.json", function (JSONData) {
					switch (i) {
						case 0:
							outputInfo(JSONData.clothes);
							break;
						case 1:
							outputInfo(JSONData.skirt);
							break;
						case 2:
							outputInfo(JSONData.shoe);
							break;
						default:
							outputInfo(JSONData.clothes);
							 }
				}, function () {
					console.error("请求失败");
				});
			}
		}
		/* 收回信息面板 */
		panel.onclick = function () {
			this.classList.remove("show");
		}
}

/**
 * 功能：向信息面板输入内容
 * 参数：1、对象属性名
 **/
function outputInfo(jsonData) {
	var infoPanel = document.getElementsByClassName("infoPanel")[0];
	var showInfo = infoPanel.getElementsByTagName("span");
	var i = 0;
	for(let x in jsonData) {
		if(x == "brand") {
			showInfo[i].classList.add("brand");
		}
		if(x == "price") {
			showInfo[i++].textContent = "$" + jsonData[x];
		}
		else {
			showInfo[i++].textContent = jsonData[x];
		}
	}
}
/**
 * 功能：AJAX获取JSON文件
 * 参数：1、URL； 2、成功回调函数； 3、错误处理函数
**/
function getJSON(url, callback, error) {
	error = (error === undefined) ? function () {} : error;
	XHR = new XMLHttpRequest();
	XHR.open("GET", url, true);
	XHR.send();
	XHR.onreadystatechange = function () {
		if(XHR.readyState == 4) {
			if(XHR.status == 200) {
				var data = XHR.responseText;
				JSONData = JSON.parse(data);
				callback(JSONData);
			}
			else {
				error();
			}
		}

	}
}