/**
* 功能：动态多级菜单
**/
/****************************************/
/*全局变量定义部分*/
/*******************************************/
var GLOBAL ={
	data:"",
	XHR:""
}
/****************************************/
/* 页面加载完成后执行 */
/****************************************/
// 调用通过JSON获取的数据并拼装的函数
loadJson("json/localJson.json", function() {
	// 将获取的JSON对象转换为JS对象
	GLOBAL.data = JSON.parse(GLOBAL.XHR.responseText);
	// 将获取到的JSON数据进行HTML数据拼装
	dataParse(GLOBAL.data);
	// 调用动态多级菜单的点击显隐函数
	displayMenu();

});
/****************************************/
/* 函数定义 */
/****************************************/

/**
* 功能：通过Ajax获取JSON数据
* 参数：1、JSON的URL地址；2、需要执行的回调函数
**/
function loadJson(url,callBack){
	// 实例化一个Ajax的XMLHttpRequest对象
	GLOBAL.XHR = new XMLHttpRequest();
	// 监听页面状态
	GLOBAL.XHR.onreadystatechange = function(){
		// 如果XMLHttpRequest的状态为“请求已完成，且响应已就绪，并且状态为成功后执行回调函数
		if(GLOBAL.XHR.readyState == 4 && GLOBAL.XHR.status == 200){
			callBack();
		}
	}
	// 用GET方式去异步请求URL
	GLOBAL.XHR.open("GET",url,true);
	// 发送请求
	GLOBAL.XHR.send();
}
/**
* 功能：生成DOM节点并载入JSON数据并显示于页面内
**/
function dataParse(data) {
	// 获取作为显示容器的<ul>
	var datacontent = document.getElementsByClassName("box")[0];
	// 生成一级菜单
	for(var i=0,schoolName_len = data.length;i<schoolName_len;i++){
		datacontent.innerHTML += '<li><a class="ul1">'+data[i].schoolName+'</a><ul></ul></li>';
	}
	// 获取所有一级菜单
	var ul1 = document.getElementsByClassName("ul1");
	var ul2_parentNode;
	// 根据数据模型添加出对应的DOM结构
	for(var j=0,ul1_data_len = ul1.length;j<ul1_data_len;j++ ){
		ul2_parentNode = ul1[j].nextElementSibling;
		// 获取二级菜单数据模型长度
		var ul2_data_len = data[j].infohead.length;
		// 根据数据模型添加出对应的DOM结构
		for(var k=0;k < ul2_data_len;k++){
			ul2_parentNode.innerHTML +='<li><a class="ul2"></a><ul class="ul3"></ul></li>';
			// 获取当前最新的二级节点内的最新的二级菜单按钮父节点<a>
			var ul2_A = ul2_parentNode.lastElementChild.getElementsByClassName("ul2")[0];
			// 为当前的标签写入数据
			ul2_A.innerHTML +='<div>'+data[j].infohead[k].studyId+'</div>'+
				'<div>'+data[j].infohead[k].name+'</div>'+
				'<div>'+data[j].infohead[k].sex+'</div>'+
				'<div>'+data[j].infohead[k].class+'</div>'+
				'<div>'+data[j].infohead[k].hobby+'</div>';
			// 获取当前二级菜单下三级菜单的长度
			var ul3_data_len = data[j].infohead[k].infocontent.length;
			// 往所有的二级菜单后三级菜单添加内容
			for(var l = 0;l<ul3_data_len;l++){
				// 获取当前二级菜单后的三级菜单
				var ul3 =ul2_A.nextElementSibling;
				// 为当前的标签写入数据
				ul3.innerHTML += '<li>'+
					'<div>'+data[j].infohead[k].infocontent[l].studyId + '</div>'+
					'<div>'+data[j].infohead[k].infocontent[l].name + '</div>'+
					'<div>'+data[j].infohead[k].infocontent[l].sex + '</div>'+
					'<div>'+data[j].infohead[k].infocontent[l].class +'</div>'+
					'<div>'+data[j].infohead[k].infocontent[l].hobby +'</div>'+
					'</li>';
			}
		}
	}
}
/**
* 功能：动态多级菜单的显隐
**/
function displayMenu(){
	// 获取一级菜单
	var ul1_menu = document.getElementsByClassName("ul1"),
		ul1_len = ul1_menu.length;
	// 为所有一级菜单绑定点击事件
	for(var m = 0;m < ul1_len; m++){
		// 为每个一级菜单创建自定义索引值
		ul1_menu[m].index= m;
		ul1_menu[m].onclick = function(){
			// 下级节点样式
			var nextul = this.nextElementSibling,
				nextuldisplay = nextul.style.display;
			// 显示或隐藏当前二级级菜单
			if(nextuldisplay == 'block'){
				// 隐藏该元素
				nextul.style.display ='none';
			}else{
				// 显示该元素
				nextul.style.display ='block';            
			}
			// 隐藏其他一级菜单下的二级菜单
			for(var n = 0;n < ul1_len;n++){
				if(this.index != n){
					ul1_menu[n].nextElementSibling.style.display='none';
				}
			}     
		}
	}
	// 获取二级菜单
	// 为所有的二级菜单绑定点击事件
	var ul2_menu =document.getElementsByClassName("ul2"),
		ul2_len = ul2_menu.length;
	for(var p=0;p<ul2_len;p++){
		ul2_menu[p].index = p;
		ul2_menu[p].onclick = function(){
			// 下级节点样式
			var nextul = this.nextElementSibling,
				nextuldisplay = nextul.style.display;
			// 显示或隐藏当前三级级菜单
			if(nextuldisplay == 'block'){
				// 隐藏该元素
				nextul.style.display ='none';
			}else{
				// 显示该元素
				nextul.style.display ='block';
			}   
			// 隐藏其他二级菜单下的三级菜单
			for(var q = 0;q < ul2_len;q++){
				if(this.index != q){
					ul2_menu[q].nextElementSibling.style.display='none';
				}
			}
		}
	}

}












