/*
 * 功能:原生js实现alert弹出框
 * author:eveningwater
 * 日期:2017/12/7
 */
(function () {
	function addAlertBoxStyle() {
		var cssText =
			".alert-container,.alert,.alert p,.alert span,.alert button {margin: 0;padding: 0;box-sizing: border-box;}.alert-container {position: fixed;" +
			"			width: 100%;" +
			"			height: 100%;" +
			"			left: 0;" +
			"			top: 0;" +
			"			z-index: 10000;" +
			"		}" +
			"		.alert-container>.alert {" +
			"			width: 442px;" +
			"			height: 167px;" +
			"			border: 1px solid rgba(149, 149, 146, 0.8);" +
			"			border-radius: 3px;" +
			"			background-color: rgb(255, 254, 254);" +
			"			box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 2px;" +
			"			margin: 0px auto;" +
			"			position: fixed;" +
			"			top: 0;" +
			"			left: 50%;" +
			"			margin-left: -200px;" +
			"		}" +
			"		.alert-container>.alert .showPage {" +
			"			margin-left: 25px;" +
			"			letter-spacing: 2px;" +
			"			margin-top: 15px;" +
			"		}" +
			"		.alert-container>.alert .closeBtn {" +
			"			position: absolute;" +
			"			right: 5px;" +
			"			top: 5px;" +
			"			width: 15px;" +
			"			height: 15px;" +
			"			border-radius: 50%;" +
			"			font: 12px/15px \"微软雅黑\";" +
			"			text-align: center;" +
			"			cursor: pointer;" +
			"		}" +
			"		.alert-container>.alert .closeBtn.closeBtn:hover," +
			"		.alert-container>.alert .closeBtn.closeBtn:active {" +
			"			background-color: #999;" +
			"		}" +
			"		.alert-container>.alert .content {" +
			"			padding: 10px 0;" +
			"			margin-left: 25px;" +
			"			font-size: 14px;" +
			"			font-weight: 300;" +
			"		}" +
			"		.alert-container>.alert .sureBtn {" +
			"			width: 73px;" +
			"			height: 31px;" +
			"			position: absolute;" +
			"			right: 23px;" +
			"			bottom: 21px;" +
			"			text-align: center;" +
			"			border: 1px solid #2444f2;" +
			"			cursor: pointer;" +
			"			background-color: #f2f2f2;" +
			"			outline: none;" +
			"		}";

		function styleInject(css, ref) {
			if (ref === void 0) ref = {};
			var insertAt = ref.insertAt;
			if (!css || typeof document === 'undefined') return;
			var head = document.head || document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			style.type = "text/css";
			if (insertAt === 'top') {
				if (head.firstChild) {
					head.insertBefore(style, head.firstChild)
				} else {
					head.appendChild(style);
				}
			} else {
				head.appendChild(style);
			}
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
		}
		styleInject(cssText);
	}
	// 自定义弹出框
	function alertBox(str) {
		//创建一个div元素
		var div = document.createElement("div"),
			_div = div.cloneNode(true);
		// 添加一个class方便操作
		div.classList.add("alert");
		// 获取href
		var url = window.location.href;
		var showPage = url.match("file") ? "此网页" : location.host;
		div.innerHTML =
			'<p class="showPage">' +
			showPage +
			'显示:</p><span class="closeBtn">X</span><p class="content">' +
			str +
			"</p>" +
			'<button type="button" class="sureBtn">确定</button>';
		_div.className = 'alert-container';
		_div.appendChild(div);
		document.body.appendChild(_div);
		window.addEventListener("click", function (e) {
			let className = e.target.className;
			if (className.indexOf("sureBtn") > -1 || className.indexOf("closeBtn") > -1) {
				closeBox();
			}
		}, false);

		function closeBox() {
			if (_div && _div.parentElement) {
				_div.parentElement.removeChild(_div);
			}
		}
		var alertElement = document.getElementsByClassName('alert-container');
		if (alertElement.length > 0) {
			for (var i = 0, len = alertElement.length; i < len; i++) {
				if (i > 0) {
					closeBox();
				}
			}
		}
	}
	window.ewAlert = function (value) {
		return new alertBox(value);
	}
	addAlertBoxStyle();
})();
var message = "不许偷看我女朋友，否则我要翻脸了！";
document.oncontextmenu = function () {
	ewAlert(message);
	return false;
};
// 键盘事件
document.onkeydown = function (e) {
	e = window.events || arguments[0];
	var expression = e.keyCode == 123 || e.ctrlKey && e.altKey && e.keyCode == 74 || e.ctrlKey && e.shiftKey && e
		.keyCode == 73 || e.ctrlKey && e.shiftKey && e.keyCode == 74 || e.ctrlKey && e.altKey && e.keyCode ==
		73 || e.ctrlKey && e.keyCode == 85 || e.ctrlKey && e.shiftKey && e.keyCode == 67;
	if (expression) {
		ewAlert(message);
		return false;
	}
	if (e.keyCode === 18) {
		let timer = null;
		let _keyDown = () => {
			if (e.keyCode === 123) {
				if (timer) clearTimeout(timer);
				ewAlert(message);
			} else {
				timer = setTimeout(_keyDown, 3000);
			}
		}
		_keyDown();
		return false;
	}
};