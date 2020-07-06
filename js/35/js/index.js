/*
*功能:读取本地文件
*作者:evening water
*日期:2017/8/10
*/
class FilePage {
	constructor(){
		this.file = this.getById('file');
		this.resultElement = this.getById('showInput');
		this.readImageButton = this.getById('readImage');
		this.readDataButton = this.getById('readData');
		this.seeFileTextElement = this.getByClassName('.seeFileText');
		this.seeFileElement = this.getByClassName('.seeFile');
		this.readTxtButton = this.getById('readTxt');
		this.FileReader = new FileReader();
		this.init();
	}
	getById(id){
		return document.getElementById(id);
	}
	getByClassName(className){
		return document.querySelector(className);
	}
	/**
	 * 初始化功能
	 */
	init(){
		if(typeof FileReader === 'undefined'){
			this.resultElement.innerHTML += `<p>对不起,你的浏览器不支持FileReader接口!</p>`;
			this.file.setAttribute('disabled',true);
		}
		this.seeFileTextElement.onclick = this.seeFileElement.onclick = () => {
			return this.file.click();
		}
		this.readImageFunction(this.readImageButton,this.file);
		this.readDataFunction(this.readDataButton,this.file);
		this.readTxtFunction(this.readTxtButton,this.file);
	}
	/**
	 * 判断如果没有选择文件，提示选择文件
	 * @param {*} file 
	 */
	judgeFile(file){
		if(typeof file.files[0] !== 'object'){
			alert('请选择本地文件!');
			return false;
		}
		return true;
	}
	/**
	 * 读取图片
	 * @param {*} btn 
	 * @param {*} file 
	 */
	readImageFunction(btn,file){
		btn.onclick = () => {
			if(this.judgeFile(file)){
				const image = file.files[0];
				if(!/image\/\w+/.test(image.type)){
					alert('这个只能读取图片文件,不能读取其它类型文件!');
					return false;
				}else{
					this.FileReader.readAsDataURL(image);
					this.fileOnload(1,image);
				}
			}
		}
	}
	/**
	 * 读取二进制文件数据
	 * @param {*} btn 
	 * @param {*} file 
	 */
	readDataFunction(btn,file){
		btn.onclick = () => {
			if(this.judgeFile(file)){
				const data = file.files[0];
				this.FileReader.readAsBinaryString(data);
				this.fileOnload(2,data);
			}
		}
	}
	/**
	 * 读取文本文件
	 * @param {*} btn 
	 * @param {*} file 
	 */
	readTxtFunction(btn,file){
		btn.onclick = () => {
			if(this.judgeFile(file)){
				const txt = file.files[0];
				this.FileReader.readAsText(txt);
				this.fileOnload(3,txt);
			}
		}
	}
	/**
	 * 文件加载处理
	 * @param {*} type 
	 * @param {*} fileObj 
	 */
	fileOnload(type,fileObj){
		const _this = this;
		this.seeFileTextElement.textContent = fileObj.name;
		this.FileReader.onload = function ()  {
			let resultElementHTML = '';
			switch(type){
				case 1:
					resultElementHTML = `<img src=${this.result} alt='图片加载中' style='width:100%;height:350px;'/>`
					break;
				case 2:
					resultElementHTML = `<p>${this.result}</p>`;
					break;
				case 3:
					resultElementHTML = this.result;
					break;
			}
			_this.resultElement.innerHTML = resultElementHTML;
		}
	}
}
new FilePage();



