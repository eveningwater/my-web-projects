/****************************************/
/*全局变量定义部分*/
/*******************************************/
var GLOBAL = {
	data: "",
	XHR: "",
	checkbox: document.getElementById("checkbox"),
	choose: document.getElementsByName("choose"),
	delBtn: document.getElementsByClassName("playDel"),
	deleteBtn: document.getElementById("delete"),
	sortBtn: document.getElementsByClassName("sort"),
	tbody: document.getElementsByTagName("tbody")[0],
	thead: document.getElementsByTagName("thead")[0],
	playLook: document.getElementsByClassName('playLook'),
	//获取加载数据按钮
	loadBtn:document.getElementById("load"),
	isFunction:function(fn){
		return typeof fn === 'function';
	}
}
/****************************************/
/* 页面加载完成后执行 */
/****************************************/
window.onload = function(){
	// 点击按钮加载数据
	GLOBAL.loadBtn.onclick = function (){
		loadData();
	}
}
/****************************************/
/* 函数定义 */
/****************************************/
/**
* 功能：通过Ajax获取JSON数据
* 参数：1、JSON的URL地址；2、需要执行的回调函数
**/
function loadJson(url, callback) {
	// 实例化一个Ajax的XMLHttpRequest对象
	GLOBAL.XHR = new XMLHttpRequest();
	// 监听页面状态
	GLOBAL.XHR.onreadystatechange = function () {
		// 如果XMLHttpRequest的状态为“请求已完成，且响应已就绪，并且状态为成功后执行回调函数
		if (GLOBAL.XHR.readyState == 4 && GLOBAL.XHR.status == 200) {
			callback();
		}
	}
	// 用GET方式去异步请求URL
	GLOBAL.XHR.open("GET", url, true);
	// 发送请求
	GLOBAL.XHR.send();
}
/**
 * 功能:加载数据
 */
function loadData(){
	// 调用通过JSON获取的数据并拼装的函数
	return loadJson("json/localJson.json", function () {
		// 调用通过JSON获取的数据并拼装的函数
		GLOBAL.data = JSON.parse(GLOBAL.XHR.responseText);
		// 将获取到的JSON数据进行HTML数据拼装
		dataParse(GLOBAL.data);
	});
}
/**
* 功能：生成DOM节点并载入JSON数据并显示于页面内
**/
function dataParse(data) {
	renderHTML(data);
	sortABC();
}
/**
 * 查看
 * @param {*} data 
 */
function playLookInfo(data) {
	var dataKeyArr = [];
	for (var j = 0; j < GLOBAL.thead.children[0].children.length; j++) {
		if (GLOBAL.thead.children[0].children[j].hasAttribute('data-key')) {
			dataKeyArr.push({
				key: GLOBAL.thead.children[0].children[j].getAttribute('data-key'),
				text: GLOBAL.thead.children[0].children[j].textContent.replace(/&gt;|>/g, '')
			});
		}
	}
	for (var i = 0, len = GLOBAL.playLook.length; i < len; i++) {
		GLOBAL.playLook[i].index = i;
		// 点击查看
		GLOBAL.playLook[i].onclick = function (e) {
			e.preventDefault();
			var dataId = Number(this.getAttribute('data-id')), contentHTML = '',count = 0;
			data.forEach(function(item,index){
				if(item.id === dataId){
					count = index;
				}
			})
			dataKeyArr.map(function (key) {
				contentHTML += '<div class="information">' +
					'<span class="property">' + key.text + ':</span>' +
					'<span class="property-value">' + data[count][key.key] + '</span>' +
					'</div>';
			});
			// 构造函数构造弹出框
			new PopBox('货物信息', contentHTML);
		}
	}
}
/**
 * 创建弹出框
 * @param {*} data 
 */
function PopBox(title, content, isCancel, callback) {
	var popBoxContainer = document.getElementById('popBoxContainer');
	var cancelHTML = isCancel ? '<button type="button" class="cancelBtn">取消</button>' : '';
	var boxHTML =
		'<div class="popBox-maskLayer">' +
		'<div class="popBox-content">' +
		'<div class="popBox-header">' + title + '</div>' +
		'<div class="information-container">' +
		content +
		'</div>' +
		'<div class="footerButtonGroup">' +
		'<button type="button" class="sureBtn">确认</button>' +
		cancelHTML +
		'</div>' +
		'</div>' +
		'</div>';
	popBoxContainer.innerHTML = boxHTML;
	var sureBtn = document.getElementsByClassName('sureBtn')[0];
	var popBox = document.getElementsByClassName('popBox-maskLayer')[0];
	// 关闭弹框
	popBox.onclick = function (e) {
		let className = e.target.getAttribute('class');
		if (className === 'popBox-maskLayer') {
			// 如果回调函数是一个函数，则回调
			if(GLOBAL.isFunction(callback)){
				callback(false);
			}
			closePopBox();
		}
	}
	// 点击确认
	sureBtn.onclick = function () {
		setTimeout(function () {
			// 如果回调函数是一个函数，则回调
			if(GLOBAL.isFunction(callback)){
				callback(true);
			}
			closePopBox();
		}, 100)
	}
	if (isCancel) {
		document.getElementsByClassName('cancelBtn')[0].onclick = function () {
			closePopBox();
			// 如果回调函数是一个函数，则回调
			if(GLOBAL.isFunction(callback)){
				callback(false);
			}
		}
	}
	// 关闭弹窗
	function closePopBox() {
		return popBoxContainer.innerHTML = '';
	}
	this.closePopBox = closePopBox;
	// return this;
}
/**
 * 渲染内容
 * @param {*} data 
 */
function renderHTML(data) {
	//获取数据长度
	var data_len = data.length;
	//清空内容
	var str = "";
	for (var i = 0; i < data_len; i++) {
		str += '<tr><td class="checkbox"><input type="checkbox" name="choose">' + '</td>' +
			'<td>' + data[i].goodsId + '</td>' +
			'<td>' + data[i].Name + '</td>' +
			'<td>' + data[i].productDate + '</td>' +
			'<td>' + data[i].buyDate + '</td>' +
			'<td>' + data[i].expDate + '</td>' +
			'<td>￥' + parseFloat(data[i].Price).toFixed(2) + '</td>' +
			'<td>' + data[i].Play + '</td></tr>';
	}
	GLOBAL.tbody.innerHTML = str;
	boxGrey();
	everyCheckBox();
	boxCheck();
	boxChoose();
	delClick();
	playLookInfo(data);
}
/*全选按钮事件*/
function boxGrey() {
	//获取复选按钮
	var a_len = document.getElementsByName('choose').length;
	if (a_len > 0) {
		GLOBAL.checkbox.removeAttribute("disabled");
		GLOBAL.checkbox.style.cursor = 'pointer';
	} else {
		GLOBAL.checkbox.setAttribute("disabled", "disabled");
		GLOBAL.checkbox.style.cursor = "not-allowed";
		// indeterminate为半选状态
		GLOBAL.checkbox.indeterminate = false;
		GLOBAL.checkbox.checked = false;
	}
}
/**
 * 功能:全选
 */
function boxCheck() {
	//复选框点击事件
	GLOBAL.checkbox.onclick = function () {
		//循环
		for (var i = 0, inp_len = GLOBAL.choose.length; i < inp_len; i++) {
			//判断复选框是否被选中
			if (GLOBAL.checkbox.checked) {
				GLOBAL.choose[i].checked = true;
			} else {
				GLOBAL.choose[i].checked = false;
			}
		}

	}

}
/**
 * 功能:多选
 */
function boxChoose() {
	for (var i = 0, inp_len = GLOBAL.choose.length; i < inp_len; i++) {
		GLOBAL.choose[i].onclick = function () {
			everyCheckBox();
		}
	}
}
/**
 * 功能:每一个多选
 */
function everyCheckBox() {
	var count = 0,
		checkbox = GLOBAL.checkbox,
		inp = GLOBAL.choose,
		inp_len = inp.length;
	for (var i = 0; i < inp_len; i++) {
		if (inp[i].checked) {
			count++;
		}
	}
	if (count === 0) {
		checkbox.indeterminate = false;
		checkbox.checked = false;
	} else if (count < inp_len) {
		checkbox.indeterminate = true;
	} else {
		checkbox.indeterminate = false;
		checkbox.checked = true;
	}
}
/**
 * 功能:点击删除
 */
function delClick() {
	//获取删除
	var del = GLOBAL.delBtn;
	//循环
	for (var i = 0, del_len = del.length; i < del_len; i++) {
		del[i].index = i;
		del[i].onclick = function () {
			var el = this.parentElement.parentElement;
			// 确认要删除?
			new PopBox('友情提示', '确认要删除吗?', true, function (bool) {
				if (bool) {
					GLOBAL.data.splice(this.index, 1);
					GLOBAL.tbody.removeChild(el);
					boxGrey();
					everyCheckBox();
					// 延迟创建提示框
					setTimeout(function () {
						var successOnePopBox = new PopBox('友情提示', '删除成功,1s后关闭弹窗!');
						setTimeout(function(){
							successOnePopBox.closePopBox();
						},1000)
					}, 0)
				}
			});
		}
	}
	//点击删除选中
	GLOBAL.deleteBtn.onclick = function () {
		var removeDomArr = [];
		for (var k = 0, ch_len = GLOBAL.choose.length; k < ch_len; k++) {
			if (GLOBAL.choose[k].checked) {
				removeDomArr.push({
					key: k,
					el: GLOBAL.choose[k].parentElement.parentElement
				});
			}
		}
		if (!removeDomArr.length) return new PopBox('友情提示', '请选择要删除的货物!');
		// 弹框提示
		new PopBox('友情提示', '确认要删除吗?', true, function (bool) {
			if (bool) {
				removeDomArr.map(function (rd) {
					GLOBAL.data.splice(rd.key, 1);
					GLOBAL.tbody.removeChild(rd.el);
				});
				boxGrey();
				everyCheckBox();
				// 延迟创建提示框
				setTimeout(function () {
					var successOnePopBox = new PopBox('友情提示', '删除成功,1s后关闭弹窗!');
					setTimeout(function(){
						successOnePopBox.closePopBox();
					},1000)
				}, 0)
			}
		});
	}

}
/**
 * 排序
 */
function sortABC() {
	for (var i = 0, len = GLOBAL.sortBtn.length; i < len; i++) {
		GLOBAL.sortBtn[i].index = i;
		// 判断排序还是恢复非排序前
		GLOBAL.sortBtn[i].iconFlag = false;
		GLOBAL.sortBtn[i].onclick = function () {
			// 克隆原数据，因为sort方法会改变原数组
			var originData = JSON.parse(JSON.stringify(GLOBAL.data));
			// 改变图标
			this.iconFlag = !this.iconFlag;
			if (this.iconFlag) {
				this.classList.add("sortSort");
				var key = this.getAttribute('data-sort');
				renderHTML(originData.sort(function (dt1, dt2) {
					return (dt1[key]).replace(/\D/g, "") - (dt2[key]).replace(/\D/g, "");
				}));
			} else {
				this.classList.remove('sortSort');
				renderHTML(GLOBAL.data);
			}
		}
	}
}

